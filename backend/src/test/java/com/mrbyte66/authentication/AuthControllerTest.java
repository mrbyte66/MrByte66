package com.mrbyte66.authentication;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class AuthControllerTest {

  @Autowired
  MockMvc mockMvc;

  @Autowired
  ObjectMapper objectMapper;

  @Test
  void loginWithSeededAdminReturnsBearerToken() throws Exception {
    MvcResult result = mockMvc.perform(post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(
                Map.of("username", "test-admin", "password", "test-password"))))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.tokenType").value("Bearer"))
        .andExpect(jsonPath("$.token").isNotEmpty())
        .andExpect(jsonPath("$.expiresIn").value(3600))
        .andReturn();

    String token = objectMapper.readTree(result.getResponse().getContentAsString())
        .get("token").asText();

    mockMvc.perform(get("/api/articles").header("Authorization", "Bearer " + token))
        .andExpect(status().isOk());
  }

  @Test
  void loginWithWrongPasswordReturns401() throws Exception {
    mockMvc.perform(post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(
                Map.of("username", "test-admin", "password", "wrong"))))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void loginWithUnknownUserReturns401() throws Exception {
    mockMvc.perform(post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(
                Map.of("username", "ghost", "password", "whatever"))))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void loginWithBlankBodyReturns400() throws Exception {
    mockMvc.perform(post("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(Map.of("username", "", "password", ""))))
        .andExpect(status().isBadRequest());
  }

  @Test
  void protectedEndpointRequiresAuthentication() throws Exception {
    mockMvc.perform(get("/api/admin/content"))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.error").value("Unauthorized"));
  }

  @Test
  void publicEndpointsStayOpen() throws Exception {
    mockMvc.perform(get("/api/health")).andExpect(status().isOk());
    mockMvc.perform(get("/api/articles")).andExpect(status().isOk());
  }

  @Test
  void missingPublicResourceReturns404Not401() throws Exception {
    mockMvc.perform(get("/api/articles/no-such-slug")).andExpect(status().isNotFound());
  }
}
