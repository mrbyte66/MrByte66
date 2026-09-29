package com.mrbyte66.content;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ArticleControllerTest {

  @Autowired
  MockMvc mockMvc;

  @Autowired
  ArticleRepository articles;

  @Test
  void listsOnlyPublishedArticles() throws Exception {
    articles.save(new Article("pub", "Published One", "Body.", ContentStatus.PUBLISHED));
    articles.save(new Article("draft", "Draft One", "Body.", ContentStatus.DRAFT));

    mockMvc.perform(get("/api/articles"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1))
        .andExpect(jsonPath("$[0].slug").value("pub"))
        .andExpect(jsonPath("$[0].title").value("Published One"));
  }

  @Test
  void returnsPublishedArticleBySlug() throws Exception {
    articles.save(new Article("detail", "Detail Title", "Full body.", ContentStatus.PUBLISHED));

    mockMvc.perform(get("/api/articles/detail"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.slug").value("detail"))
        .andExpect(jsonPath("$.content").value("Full body."));
  }

  @Test
  void returns404ForMissingOrDraftSlug() throws Exception {
    articles.save(new Article("hidden", "Hidden", "Body.", ContentStatus.DRAFT));

    mockMvc.perform(get("/api/articles/nope")).andExpect(status().isNotFound());
    mockMvc.perform(get("/api/articles/hidden")).andExpect(status().isNotFound());
  }
}
