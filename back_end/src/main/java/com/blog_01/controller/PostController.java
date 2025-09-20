package com.blog_01.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blog_01.service.JwtService;
import com.blog_01.service.PostService;

import io.jsonwebtoken.io.IOException;

@RestController
@RequestMapping("/api/posts")
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
            @RequestParam(value = "files", required = false) List<MultipartFile> files,
            @RequestParam(value = "types", required = false) List<String> types,
            @RequestHeader("Authorization") String authHeader
    ) throws java.io.IOException {
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {return ResponseEntity.status(401).body("Token manquant");}
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {return ResponseEntity.status(401).body("Token Expired");}

        String username = jwtService.extractUsername(token);

        try {
            postService.create(title, content, username, files, types);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Post créé par " + username);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors de l'upload des fichiers");
        }
    }

    @GetMapping("/getAllPosts")
    public ResponseEntity<?> getAllPosts(@RequestHeader("Authorization") String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {return ResponseEntity.status(401).body("Token manquant");}
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {return ResponseEntity.status(401).body("Token Expired");}

        return postService.getAllPosts();
    }

    @GetMapping("/getPost/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id, @RequestHeader("Authorization") String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {return ResponseEntity.status(401).body("Token manquant");}
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {return ResponseEntity.status(401).body("Token Expired");}

        return postService.getPost(id);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editPost(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "files", required = false) List<MultipartFile> files,
            @RequestParam(value = "types", required = false) List<String> types,
            @RequestParam(required = false, name = "mediasToRemove") String mediasToRemoveJson,
            @RequestHeader("Authorization") String authHeader
    ) throws java.io.IOException {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {return ResponseEntity.status(401).body("Token manquant");}
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {return ResponseEntity.status(401).body("Token Expired");}

        String username = jwtService.extractUsername(token);
        Long idUser = jwtService.extractId(token);
        try {
            postService.edit(idUser, id, title, content, username, files, types, mediasToRemoveJson);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Post créé par " + username);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors de l'upload des fichiers");
        }
    }
}
