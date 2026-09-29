package com.mrbyte66.content;

import java.time.Instant;

public record ArticleSummary(
    Long id,
    String slug,
    String title,
    ArticleStatus status,
    Instant createdAt) {

  static ArticleSummary from(Article article) {
    return new ArticleSummary(
        article.getId(),
        article.getSlug(),
        article.getTitle(),
        article.getStatus(),
        article.getCreatedAt());
  }
}
