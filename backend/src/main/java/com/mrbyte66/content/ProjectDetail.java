package com.mrbyte66.content;

import java.time.Instant;
import java.util.List;

public record ProjectDetail(
    Long id,
    String slug,
    String title,
    String summary,
    String content,
    List<String> technologies,
    String demoUrl,
    String sourceUrl,
    ContentStatus status,
    Instant createdAt,
    Instant updatedAt) {

  static ProjectDetail from(Project project) {
    return new ProjectDetail(
        project.getId(),
        project.getSlug(),
        project.getTitle(),
        project.getSummary(),
        project.getContent(),
        project.getTechnologies(),
        project.getDemoUrl(),
        project.getSourceUrl(),
        project.getStatus(),
        project.getCreatedAt(),
        project.getUpdatedAt());
  }
}
