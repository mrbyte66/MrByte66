package com.mrbyte66.content;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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

  @GetMapping("/{slug}")
  public ArticleDetail getBySlug(@PathVariable String slug) {
    return articles.findBySlug(slug)
        .filter(article -> article.getStatus() == ArticleStatus.PUBLISHED)
        .map(ArticleDetail::from)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));
  }
}
