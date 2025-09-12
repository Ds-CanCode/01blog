package com.blog_01.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blog_01.model.User;
import com.blog_01.service.UserService;

// import java.util.List;
@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
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
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = userService.loginAndGenerateToken(request.getUsernameOrEmail(), request.getPassword());
            return ResponseEntity.ok(Map.of(
                    "message", "Connexion réussie ✅",
                    "token", token
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(403)
                    .body(Map.of("message", e.getMessage()));
        }
    }
    
    // @GetMapping
    // public List<User> getAllUsers() {
    //     return userService.getAllUsers();
    // }
    // @GetMapping("/{id}")
    // public User getUser(@PathVariable Long id) {
    //     return userService.getUser(id);
    // }
    // @DeleteMapping("/{id}")
    // public void deleteUser(@PathVariable Long id) {
    //     userService.deleteUser(id);
    // }
}

class LoginRequest {

    private String usernameOrEmail;
    private String password;

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

// class RegisterRequest {
//     private String username;
//     private String email;
//     private String password;
//     private String confirmPassword;
//     private String profileImage;
//     private String coverImage;
//     public String getUsername() {
//         return username;
//     }
//     public void setUsername(String username) {
//         this.username = username;
//     }
//     public String getEmail() {
//         return email;
//     }
//     public void setEmail(String email) {
//         this.email = email;
//     }
//     public String getPassword() {
//         return password;
//     }
//     public void setPassword(String password) {
//         this.password = password;
//     }
//     public String getConfirmPassword() {
//         return confirmPassword;
//     }
//     public void setConfirmPassword(String confirmPassword) {
//         this.confirmPassword = confirmPassword;
//     }
//     public String getProfileImage() {
//         return profileImage;
//     }
//     public void setProfileImage(String profileImage) {
//         this.profileImage = profileImage;
//     }
//     public String getCoverImage() {
//         return coverImage;
//     }
//     public void setCoverImage(String coverImage) {
//         this.coverImage = coverImage;
//     }
// }
