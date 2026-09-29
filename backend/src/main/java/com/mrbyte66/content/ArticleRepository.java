package com.mrbyte66.content;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

  Optional<Article> findBySlug(String slug);

  List<Article> findAllByOrderByCreatedAtDesc();

  List<Article> findByStatusOrderByCreatedAtDesc(ContentStatus status);
}
