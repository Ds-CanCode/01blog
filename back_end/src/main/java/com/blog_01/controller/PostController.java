package com.blog_01.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blog_01.service.JwtService;
import com.blog_01.service.PostService;

import io.jsonwebtoken.io.IOException;

@RestController
@RequestMapping("/api/post")
public class PostController {

    private final PostService postService;
    private final JwtService jwtService;

    public PostController(PostService postService, JwtService jwtService) {
        this.postService = postService;
        this.jwtService = jwtService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPost(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("tags") String tags,
            @RequestParam(value = "files", required = false) List<MultipartFile> files,
            @RequestParam(value = "types", required = false) List<String> types,
            @RequestHeader("Authorization") String authHeader
    ) throws java.io.IOException {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token manquant");
        }

        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);

        try {
            postService.create(title, content, tags, username, files, types);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Post créé par " + username);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors de l'upload des fichiers");
        }
    }

}
