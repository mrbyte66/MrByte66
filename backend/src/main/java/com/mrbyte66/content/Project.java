package com.mrbyte66.content;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

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

  @Size(max = 500)
  @Column(length = 500)
  private String summary;

  @NotBlank
  @Column(nullable = false, columnDefinition = "TEXT")
  private String content;

  @ElementCollection
  @CollectionTable(name = "project_technologies", joinColumns = @JoinColumn(name = "project_id"))
  @Column(name = "technology", nullable = false, length = 100)
  private List<String> technologies = new ArrayList<>();

  @Size(max = 500)
  @Column(length = 500)
  private String demoUrl;

  @Size(max = 500)
  @Column(length = 500)
  private String sourceUrl;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private ContentStatus status = ContentStatus.DRAFT;

  @Column(nullable = false, updatable = false)
  private Instant createdAt;

  private Instant updatedAt;

  protected Project() {
  }

  public Project(String slug, String title, String summary, String content,
      List<String> technologies, String demoUrl, String sourceUrl, ContentStatus status) {
    this.slug = slug;
    this.title = title;
    this.summary = summary;
    this.content = content;
    this.technologies = technologies == null ? new ArrayList<>() : new ArrayList<>(technologies);
    this.demoUrl = demoUrl;
    this.sourceUrl = sourceUrl;
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

  /** Applies non-null fields from an admin update. */
  public void update(String slug, String title, String summary, String content,
      List<String> technologies, String demoUrl, String sourceUrl, ContentStatus status) {
    if (slug != null) {
      this.slug = slug;
    }
    if (title != null) {
      this.title = title;
    }
    if (summary != null) {
      this.summary = summary;
    }
    if (content != null) {
      this.content = content;
    }
    if (technologies != null) {
      this.technologies = new ArrayList<>(technologies);
    }
    if (demoUrl != null) {
      this.demoUrl = demoUrl;
    }
    if (sourceUrl != null) {
      this.sourceUrl = sourceUrl;
    }
    if (status != null) {
      this.status = status;
    }
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

  public String getSummary() {
    return summary;
  }

  public String getContent() {
    return content;
  }

  public List<String> getTechnologies() {
    return List.copyOf(technologies);
  }

  public String getDemoUrl() {
    return demoUrl;
  }

  public String getSourceUrl() {
    return sourceUrl;
  }

  public ContentStatus getStatus() {
    return status;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public Instant getUpdatedAt() {
    return updatedAt;
  }
}
