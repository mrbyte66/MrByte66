package com.mrbyte66.content;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/** Super-admin article management (D-006). All endpoints require SUPER_ADMIN role. */
@RestController
@RequestMapping("/api/admin/articles")
public class ArticleAdminController {

  private final ArticleRepository articles;

  public ArticleAdminController(ArticleRepository articles) {
    this.articles = articles;
  }

  @GetMapping
  public List<ArticleDetail> listAll() {
    return articles.findAllByOrderByCreatedAtDesc()
        .stream()
        .map(ArticleDetail::from)
        .toList();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public ArticleDetail create(@Valid @RequestBody ArticleCreateRequest request) {
    articles.findBySlug(request.slug()).ifPresent(existing -> {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Slug already in use");
    });
    Article article = new Article(request.slug(), request.title(), request.content(), request.status());
    return ArticleDetail.from(articles.save(article));
  }

  @PutMapping("/{id}")
  public ArticleDetail update(@PathVariable Long id,
      @Valid @RequestBody ArticleUpdateRequest request) {
    Article article = articles.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found"));
    if (request.slug() != null) {
      articles.findBySlug(request.slug())
          .filter(other -> !other.getId().equals(id))
          .ifPresent(other -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Slug already in use");
          });
    }
    article.update(request.slug(), request.title(), request.content(), request.status());
    return ArticleDetail.from(articles.save(article));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    if (!articles.existsById(id)) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Article not found");
    }
    articles.deleteById(id);
  }
}
