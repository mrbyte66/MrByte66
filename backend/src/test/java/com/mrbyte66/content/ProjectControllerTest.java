package com.mrbyte66.content;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ProjectControllerTest {

  @Autowired
  MockMvc mockMvc;

  @Autowired
  ProjectRepository projects;

  @Test
  void listsOnlyPublishedProjects() throws Exception {
    projects.save(new Project("live", "Live", "S.", "B.", List.of("Java"),
        null, null, ContentStatus.PUBLISHED));
    projects.save(new Project("wip", "Wip", "S.", "B.", List.of(),
        null, null, ContentStatus.DRAFT));

    mockMvc.perform(get("/api/projects"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1))
        .andExpect(jsonPath("$[0].slug").value("live"))
        .andExpect(jsonPath("$[0].technologies[0]").value("Java"));
  }

  @Test
  void returnsPublishedProjectBySlug() throws Exception {
    projects.save(new Project("detail", "Detail", "S.", "Full body.", List.of(),
        "https://demo.example", null, ContentStatus.PUBLISHED));

    mockMvc.perform(get("/api/projects/detail"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value("Full body."))
        .andExpect(jsonPath("$.demoUrl").value("https://demo.example"));
  }

  @Test
  void returns404ForMissingOrDraftSlug() throws Exception {
    projects.save(new Project("hidden", "Hidden", "S.", "B.", List.of(),
        null, null, ContentStatus.DRAFT));

    mockMvc.perform(get("/api/projects/nope")).andExpect(status().isNotFound());
    mockMvc.perform(get("/api/projects/hidden")).andExpect(status().isNotFound());
  }
}
