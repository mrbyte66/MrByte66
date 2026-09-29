package com.mrbyte66.content;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
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
class ProjectAdminControllerTest {

  @Autowired
  MockMvc mockMvc;

  @Autowired
  ObjectMapper objectMapper;

  @Autowired
  ProjectRepository projects;

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
  void createsAndDeletesProject() throws Exception {
    String token = adminToken();

    String created = mockMvc.perform(post("/api/admin/projects")
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(Map.of(
                "slug", "new-app",
                "title", "New App",
                "summary", "Short.",
                "content", "Long body.",
                "technologies", List.of("Next.js"),
                "status", "PUBLISHED"))))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.technologies[0]").value("Next.js"))
        .andReturn().getResponse().getContentAsString();
    long id = objectMapper.readTree(created).get("id").asLong();

    mockMvc.perform(get("/api/projects/new-app")).andExpect(status().isOk());

    mockMvc.perform(put("/api/admin/projects/" + id)
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(Map.of("status", "DRAFT"))))
        .andExpect(status().isOk());

    mockMvc.perform(get("/api/projects/new-app")).andExpect(status().isNotFound());

    mockMvc.perform(delete("/api/admin/projects/" + id)
            .header("Authorization", "Bearer " + token))
        .andExpect(status().isNoContent());
  }

  @Test
  void rejectsDuplicateSlugAndMissingId() throws Exception {
    String token = adminToken();
    projects.save(new Project("taken", "Taken", null, "B.", List.of(),
        null, null, ContentStatus.PUBLISHED));

    mockMvc.perform(post("/api/admin/projects")
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(Map.of(
                "slug", "taken", "title", "Clash", "content", "B.", "status", "DRAFT"))))
        .andExpect(status().isConflict());

    mockMvc.perform(delete("/api/admin/projects/999999")
            .header("Authorization", "Bearer " + token))
        .andExpect(status().isNotFound());
  }

  @Test
  void writeEndpointsRequireAuthentication() throws Exception {
    mockMvc.perform(get("/api/admin/projects")).andExpect(status().isUnauthorized());
    mockMvc.perform(post("/api/admin/projects")
            .contentType(MediaType.APPLICATION_JSON).content("{}"))
        .andExpect(status().isUnauthorized());
  }
}
