package com.mrbyte66.content;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;

@Entity
@Table(name = "articles")
public class Article {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 200)
  @Column(nullable = false, unique = true, length = 200)
  private String slug;

  @NotBlank
  @Size(max = 300)
  @Column(nullable = false, length = 300)
  private String title;

  @NotBlank
  @Column(nullable = false, columnDefinition = "TEXT")
  private String content;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private ArticleStatus status = ArticleStatus.DRAFT;

  @Column(nullable = false, updatable = false)
  private Instant createdAt;

  private Instant updatedAt;

  protected Article() {
  }

  public Article(String slug, String title, String content, ArticleStatus status) {
    this.slug = slug;
    this.title = title;
    this.content = content;
    this.status = status;
  }

  @PrePersist
  void onCreate() {
    createdAt = Instant.now();
  }

  @PreUpdate
  void onUpdate() {
    updatedAt = Instant.now();
  }

  public Long getId() {
    return id;
  }

  public String getSlug() {
    return slug;
  }

  public String getTitle() {
    return title;
  }

  public String getContent() {
    return content;
  }

  public ArticleStatus getStatus() {
    return status;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public Instant getUpdatedAt() {
    return updatedAt;
  }
}
