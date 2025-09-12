package com.blog_01.controller;

import org.springframework.web.bind.annotation.RestController;

import com.blog_01.dto.PostDTO;
import com.blog_01.model.Media;
import com.blog_01.model.Post;
import com.blog_01.model.User;
import com.blog_01.repository.UserRepository;
import com.blog_01.service.JwtService;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.blog_01.service.PostService;

@RestController
@RequestMapping("/api/post")
public class PostController {

    private final PostService postService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public PostController(PostService postService, JwtService jwtService, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.postService = postService;
        this.jwtService = jwtService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody PostDTO postDTO, @RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token manquant");
        }
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);

        Post post = postService.create(postDTO, username);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Post créé par " + username);
        return ResponseEntity.ok(response);
    }

}
