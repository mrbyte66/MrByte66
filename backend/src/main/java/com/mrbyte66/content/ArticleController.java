package com.mrbyte66.content;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

  private final ArticleRepository articles;

  public ArticleController(ArticleRepository articles) {
    this.articles = articles;
  }

  @GetMapping
  public List<ArticleSummary> listPublished() {
    return articles.findByStatusOrderByCreatedAtDesc(ArticleStatus.PUBLISHED)
        .stream()
        .map(ArticleSummary::from)
        .toList();
  }
}
