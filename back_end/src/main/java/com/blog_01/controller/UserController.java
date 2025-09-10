package com.blog_01.controller;

import com.blog_01.model.User;
import com.blog_01.service.UserService;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

// import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
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

    public String getUsernameOrEmail() { return usernameOrEmail; }
    public void setUsernameOrEmail(String usernameOrEmail) { this.usernameOrEmail = usernameOrEmail; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
}
