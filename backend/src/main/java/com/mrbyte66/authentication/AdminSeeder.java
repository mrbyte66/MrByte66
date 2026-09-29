package com.mrbyte66.authentication;

import com.mrbyte66.user.User;
import com.mrbyte66.user.UserRepository;
import com.mrbyte66.user.UserRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/** Seeds the single V1 super admin from environment-provided credentials (D-006). */
@Component
public class AdminSeeder implements ApplicationRunner {

  private static final Logger log = LoggerFactory.getLogger(AdminSeeder.class);

  private final UserRepository users;
  private final PasswordEncoder passwordEncoder;
  private final AuthProperties properties;

  public AdminSeeder(UserRepository users, PasswordEncoder passwordEncoder, AuthProperties properties) {
    this.users = users;
    this.passwordEncoder = passwordEncoder;
    this.properties = properties;
  }

  @Override
  @Transactional
  public void run(ApplicationArguments args) {
    String username = properties.getAdminUsername();
    if (users.findByUsername(username).isPresent()) {
      return;
    }
    users.save(new User(username, passwordEncoder.encode(properties.getAdminPassword()), UserRole.SUPER_ADMIN));
    log.info("Seeded super admin '{}'", username);
  }
}
