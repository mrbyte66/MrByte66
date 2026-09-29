package com.mrbyte66.content;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

  private final ProjectRepository projects;

  public ProjectController(ProjectRepository projects) {
    this.projects = projects;
  }

  @GetMapping
  public List<ProjectSummary> listPublished() {
    return projects.findByStatusOrderByCreatedAtDesc(ContentStatus.PUBLISHED)
        .stream()
        .map(ProjectSummary::from)
        .toList();
  }

  @GetMapping("/{slug}")
  public ProjectDetail getBySlug(@PathVariable String slug) {
    return projects.findBySlug(slug)
        .filter(project -> project.getStatus() == ContentStatus.PUBLISHED)
        .map(ProjectDetail::from)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
  }
}
