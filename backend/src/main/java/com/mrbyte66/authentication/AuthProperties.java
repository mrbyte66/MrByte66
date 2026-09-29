package com.mrbyte66.authentication;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.auth")
public class AuthProperties {

  /** HS256 secret, min 32 chars. Overridden per environment (APP_JWT_SECRET). */
  private String jwtSecret = "mrbyte66-local-dev-secret-change-in-prod-000";

  /** Token lifetime in minutes. */
  private long jwtExpiryMinutes = 720;

  /** Seeded super admin username (APP_ADMIN_USERNAME). */
  private String adminUsername = "admin";

  /** Seeded super admin password, BCrypt-hashed on startup (APP_ADMIN_PASSWORD). */
  private String adminPassword = "admin-dev";

  public String getJwtSecret() {
    return jwtSecret;
  }

  public void setJwtSecret(String jwtSecret) {
    this.jwtSecret = jwtSecret;
  }

  public long getJwtExpiryMinutes() {
    return jwtExpiryMinutes;
  }

  public void setJwtExpiryMinutes(long jwtExpiryMinutes) {
    this.jwtExpiryMinutes = jwtExpiryMinutes;
  }

  public String getAdminUsername() {
    return adminUsername;
  }

  public void setAdminUsername(String adminUsername) {
    this.adminUsername = adminUsername;
  }

  public String getAdminPassword() {
    return adminPassword;
  }

  public void setAdminPassword(String adminPassword) {
    this.adminPassword = adminPassword;
  }
}
