package com.mrbyte66.content;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/** Super-admin project management (D-006). All endpoints require SUPER_ADMIN role. */
@RestController
@RequestMapping("/api/admin/projects")
public class ProjectAdminController {

  private final ProjectRepository projects;

  public ProjectAdminController(ProjectRepository projects) {
    this.projects = projects;
  }

  @GetMapping
  public List<ProjectDetail> listAll() {
    return projects.findAllByOrderByCreatedAtDesc()
        .stream()
        .map(ProjectDetail::from)
        .toList();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ProjectDetail create(@Valid @RequestBody ProjectCreateRequest request) {
    projects.findBySlug(request.slug()).ifPresent(existing -> {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Slug already in use");
    });
    Project project = new Project(
        request.slug(), request.title(), request.summary(), request.content(),
        request.technologies(), request.demoUrl(), request.sourceUrl(), request.status());
    return ProjectDetail.from(projects.save(project));
  }

  @PutMapping("/{id}")
  public ProjectDetail update(@PathVariable Long id,
      @Valid @RequestBody ProjectUpdateRequest request) {
    Project project = projects.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
    if (request.slug() != null) {
      projects.findBySlug(request.slug())
          .filter(other -> !other.getId().equals(id))
          .ifPresent(other -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Slug already in use");
          });
    }
    project.update(request.slug(), request.title(), request.summary(), request.content(),
        request.technologies(), request.demoUrl(), request.sourceUrl(), request.status());
    return ProjectDetail.from(projects.save(project));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    if (!projects.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found");
    }
    projects.deleteById(id);
  }
}
