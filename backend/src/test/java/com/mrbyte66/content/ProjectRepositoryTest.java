package com.mrbyte66.content;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class ProjectRepositoryTest {

  @Autowired
  ProjectRepository projects;

  @Test
  void savesAndFindsBySlugWithTechnologies() {
    projects.save(new Project("demo", "Demo", "Short.", "Long body.",
        List.of("Java", "Spring Boot"), "https://demo.example", "https://src.example",
        ContentStatus.PUBLISHED));

    assertThat(projects.findBySlug("demo"))
        .isPresent()
        .get()
        .extracting(Project::getTechnologies)
        .isEqualTo(List.of("Java", "Spring Boot"));
  }
}
