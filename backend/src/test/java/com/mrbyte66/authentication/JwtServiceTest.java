package com.mrbyte66.authentication;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JwtServiceTest {

  @Autowired
  JwtService jwtService;

  @Test
  void createsParsableToken() {
    String token = jwtService.createToken("admin", "SUPER_ADMIN");

    var claims = jwtService.parseToken(token);

    assertThat(claims.getSubject()).isEqualTo("admin");
    assertThat(claims.get("role", String.class)).isEqualTo("SUPER_ADMIN");
    assertThat(claims.getExpiration()).isAfter(new java.util.Date());
  }

  @Test
  void rejectsTamperedToken() {
    String token = jwtService.createToken("admin", "SUPER_ADMIN");

    assertThatThrownBy(() -> jwtService.parseToken(token + "tampered"))
        .isInstanceOf(JwtException.class);
  }
}
