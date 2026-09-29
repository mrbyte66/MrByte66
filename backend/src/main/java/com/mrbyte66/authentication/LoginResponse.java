package com.mrbyte66.authentication;

public record LoginResponse(String token, String tokenType, long expiresIn) {

  public static LoginResponse bearer(String token, long expiresInSeconds) {
    return new LoginResponse(token, "Bearer", expiresInSeconds);
  }
}
