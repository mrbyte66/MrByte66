package com.mrbyte66.content;

import java.time.Instant;

public record ArticleDetail(
    Long id,
    String slug,
    String title,
    String content,
    ArticleStatus status,
    Instant createdAt,
    Instant updatedAt) {

  static ArticleDetail from(Article article) {
    return new ArticleDetail(
        article.getId(),
        article.getSlug(),
        article.getTitle(),
        article.getContent(),
        article.getStatus(),
        article.getCreatedAt(),
        article.getUpdatedAt());
  }
}
