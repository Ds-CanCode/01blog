package com.blog_01.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
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

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/register", consumes = "multipart/form-data")
    public ResponseEntity<?> register(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            @RequestParam(value = "coverImage", required = false) MultipartFile coverImage
    ) throws java.io.IOException {

        byte[] profileBytes = profileImage != null ? profileImage.getBytes() : null;
        byte[] coverBytes = coverImage != null ? coverImage.getBytes() : null;

        User user = new User(username, email, password, profileBytes, coverBytes);
        userService.register(user);

        return ResponseEntity.ok("Inscription réussie !");
    }

    
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        String token = userService.loginAndGenerateToken(request.getUsernameOrEmail(), request.getPasswordHash());
        return Map.of("token", token);
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
    private String passwordHash;

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
}

class RegisterRequest {

    private String username;
    private String email;
    private String password;
    private String confirmPassword;
    private String profileImage;
    private String coverImage;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public String getCoverImage() {
        return coverImage;
    }

    public void setCoverImage(String coverImage) {
        this.coverImage = coverImage;
    }
}
