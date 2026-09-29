package com.mrbyte66.content;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ArticleAdminControllerTest {

  @Autowired
  MockMvc mockMvc;

  @Autowired
  ObjectMapper objectMapper;

  @Autowired
  ArticleRepository articles;

  String adminToken() throws Exception {
    String body = mockMvc.perform(post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(
                Map.of("username", "test-admin", "password", "test-password"))))
        .andExpect(status().isOk())
        .andReturn().getResponse().getContentAsString();
    return objectMapper.readTree(body).get("token").asText();
  }

  @Test
  void listsAllArticlesIncludingDrafts() throws Exception {
    String token = adminToken();
    articles.save(new Article("visible", "Visible", "Body.", ContentStatus.PUBLISHED));
    articles.save(new Article("concealed", "Concealed", "Body.", ContentStatus.DRAFT));

    mockMvc.perform(get("/api/admin/articles")
            .header("Authorization", "Bearer " + token))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(2));
  }

  @Test
  void createsPublishedArticleVisibleOnPublicFeed() throws Exception {
    String token = adminToken();

    mockMvc.perform(post("/api/admin/articles")
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(Map.of(
                "slug", "new-post",
                "title", "New Post",
                "content", "Fresh body.",
                "status", "PUBLISHED"))))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.slug").value("new-post"));

    mockMvc.perform(get("/api/articles/new-post"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value("New Post"));
  }

  @Test
  void createsDraftHiddenFromPublicFeed() throws Exception {
    String token = adminToken();

    mockMvc.perform(post("/api/admin/articles")
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(Map.of(
                "slug", "hidden-draft",
                "title", "Hidden Draft",
                "content", "Not yet.",
                "status", "DRAFT"))))
        .andExpect(status().isCreated());

    mockMvc.perform(get("/api/articles/hidden-draft")).andExpect(status().isNotFound());
  }

  @Test
  void rejectsDuplicateSlugWith409() throws Exception {
    String token = adminToken();
    articles.save(new Article("taken", "Taken", "Body.", ContentStatus.PUBLISHED));

    mockMvc.perform(post("/api/admin/articles")
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(Map.of(
                "slug", "taken",
                "title", "Clash",
                "content", "Body.",
                "status", "DRAFT"))))
        .andExpect(status().isConflict());
  }

  @Test
  void rejectsInvalidBodyWith400() throws Exception {
    String token = adminToken();

    mockMvc.perform(post("/api/admin/articles")
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(Map.of(
                "slug", "",
                "title", "",
                "content", "",
                "status", "PUBLISHED"))))
        .andExpect(status().isBadRequest());
  }

  @Test
  void updatesArticleAndPublishesDraft() throws Exception {
    String token = adminToken();
    Long id = articles.save(new Article("wip", "Wip", "Body.", ContentStatus.DRAFT)).getId();

    mockMvc.perform(put("/api/admin/articles/" + id)
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(Map.of(
                "title", "Finished",
                "status", "PUBLISHED"))))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value("Finished"))
        .andExpect(jsonPath("$.status").value("PUBLISHED"));

    mockMvc.perform(get("/api/articles/wip")).andExpect(status().isOk());
  }

  @Test
  void rejectsSlugTakenByAnotherArticle() throws Exception {
    String token = adminToken();
    articles.save(new Article("first", "First", "Body.", ContentStatus.PUBLISHED));
    Long secondId = articles.save(new Article("second", "Second", "Body.", ContentStatus.DRAFT)).getId();

    mockMvc.perform(put("/api/admin/articles/" + secondId)
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(Map.of("slug", "first"))))
        .andExpect(status().isConflict());
  }

  @Test
  void returns404ForMissingArticle() throws Exception {
    String token = adminToken();

    mockMvc.perform(put("/api/admin/articles/999999")
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(Map.of("title", "Ghost"))))
        .andExpect(status().isNotFound());

    mockMvc.perform(delete("/api/admin/articles/999999")
            .header("Authorization", "Bearer " + token))
        .andExpect(status().isNotFound());
  }

  @Test
  void deletesArticleFromPublicFeed() throws Exception {
    String token = adminToken();
    Long id = articles.save(new Article("bye", "Bye", "Body.", ContentStatus.PUBLISHED)).getId();

    mockMvc.perform(delete("/api/admin/articles/" + id)
            .header("Authorization", "Bearer " + token))
        .andExpect(status().isNoContent());

    mockMvc.perform(get("/api/articles/bye")).andExpect(status().isNotFound());
    assertThat(articles.findById(id)).isEmpty();
  }

  @Test
  void writeEndpointsRequireAuthentication() throws Exception {
    String body = objectMapper.writeValueAsString(Map.of(
        "slug", "x", "title", "X", "content", "X", "status", "DRAFT"));

    mockMvc.perform(post("/api/admin/articles")
            .contentType(MediaType.APPLICATION_JSON).content(body))
        .andExpect(status().isUnauthorized());
    mockMvc.perform(put("/api/admin/articles/1")
            .contentType(MediaType.APPLICATION_JSON).content(body))
        .andExpect(status().isUnauthorized());
    mockMvc.perform(delete("/api/admin/articles/1"))
        .andExpect(status().isUnauthorized());
  }
}
