package com.mrbyte66.content;

import java.time.Instant;
import java.util.List;

public record ProjectSummary(
    Long id,
    String slug,
    String title,
    String summary,
    List<String> technologies,
    ContentStatus status,
    Instant createdAt) {

  static ProjectSummary from(Project project) {
    return new ProjectSummary(
        project.getId(),
        project.getSlug(),
        project.getTitle(),
        project.getSummary(),
        project.getTechnologies(),
        project.getStatus(),
        project.getCreatedAt());
  }
}
