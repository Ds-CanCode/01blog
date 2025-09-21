package com.blog_01.controller;

import java.io.IOException;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blog_01.dto.LoginDTO;
import com.blog_01.model.User;
import com.blog_01.service.JwtService;
import com.blog_01.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private static final Pattern EMAIL_REGEX
            = Pattern.compile("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$");

    public UserController(UserService userService, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping(value = "/register", consumes = "multipart/form-data")
    public ResponseEntity<?> register(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            @RequestParam(value = "coverImage", required = false) MultipartFile coverImage
    ) {
        try {

            if (!StringUtils.hasText(username)) {
                return ResponseEntity.badRequest().body(Map.of("message", "Le nom d'utilisateur est obligatoire."));
            }

            if (!StringUtils.hasText(email)) {
                return ResponseEntity.badRequest().body(Map.of("message", "L'email est obligatoire."));
            }

            if (!EMAIL_REGEX.matcher(email).matches()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Format d'email invalide."));
            }

            if (!StringUtils.hasText(password) || password.length() < 6) {
                return ResponseEntity.badRequest().body(Map.of("message", "Le mot de passe doit contenir au moins 6 caractères."));
            }

            String hashedPassword = passwordEncoder.encode(password);

            byte[] profileBytes = profileImage != null ? profileImage.getBytes() : null;
            byte[] coverBytes = coverImage != null ? coverImage.getBytes() : null;

            User user = new User(username, email, hashedPassword, profileBytes, coverBytes);

            userService.register(user);

            return ResponseEntity.ok(Map.of("message", "Inscription réussie ! ✅"));

        } catch (IOException e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Erreur lors de l'inscription : " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO request) {
        try {
            String token = userService.loginAndGenerateToken(request.getUsernameOrEmail(), request.getPassword());
            Long userId = jwtService.extractId(token);
            return ResponseEntity.ok(Map.of(
                    "message", "Connexion réussie ✅",
                    "token", token,
                    "id", userId
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401)
                    .body(Map.of("message", e.getMessage()));
        }
    }

}
