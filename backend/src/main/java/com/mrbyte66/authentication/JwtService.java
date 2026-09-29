package com.mrbyte66.authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  private final SecretKey key;
  private final long expiryMinutes;

  public JwtService(AuthProperties properties) {
    byte[] secret = properties.getJwtSecret().getBytes(StandardCharsets.UTF_8);
    if (secret.length < 32) {
      throw new IllegalStateException("app.auth.jwt-secret must be at least 32 characters");
    }
    this.key = Keys.hmacShaKeyFor(secret);
    this.expiryMinutes = properties.getJwtExpiryMinutes();
  }

  public String createToken(String username, String role) {
    Instant now = Instant.now();
    return Jwts.builder()
        .subject(username)
        .claim("role", role)
        .issuedAt(Date.from(now))
        .expiration(Date.from(now.plusSeconds(expiryMinutes * 60)))
        .signWith(key)
        .compact();
  }

  public Claims parseToken(String token) throws JwtException {
    return Jwts.parser()
        .verifyWith(key)
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }
}
