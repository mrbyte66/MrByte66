package com.mrbyte66.content;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class ArticleRepositoryTest {

  @Autowired
  ArticleRepository articles;

  @Test
  void savesAndFindsBySlug() {
    articles.save(new Article("hello-world", "Hello World", "First content.", ContentStatus.DRAFT));

    assertThat(articles.findBySlug("hello-world"))
        .isPresent()
        .get()
        .extracting(Article::getTitle)
        .isEqualTo("Hello World");
  }

  @Test
  void setsCreatedAtOnPersist() {
    Article saved = articles.save(new Article("timestamps", "Timestamps", "Body.", ContentStatus.PUBLISHED));

    assertThat(saved.getId()).isNotNull();
    assertThat(saved.getCreatedAt()).isNotNull();
  }
}
