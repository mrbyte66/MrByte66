package com.mrbyte66.authentication;

import com.mrbyte66.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final UserRepository users;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthProperties properties;

  public AuthController(UserRepository users, PasswordEncoder passwordEncoder,
      JwtService jwtService, AuthProperties properties) {
    this.users = users;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.properties = properties;
  }

  @PostMapping("/login")
  public LoginResponse login(@Valid @RequestBody LoginRequest request) {
    return users.findByUsername(request.username())
        .filter(user -> passwordEncoder.matches(request.password(), user.getPasswordHash()))
        .map(user -> LoginResponse.bearer(
            jwtService.createToken(user.getUsername(), user.getRole().name()),
            properties.getJwtExpiryMinutes() * 60))
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
  }
}
