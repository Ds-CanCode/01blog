package com.blog_01.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog_01.dto.LikeDTO;
import com.blog_01.exception.TokenExpiredException;
import com.blog_01.exception.UnauthorizedException;
import com.blog_01.service.JwtService;
import com.blog_01.service.LikeService;

import io.jsonwebtoken.io.IOException;

@RestController
@RequestMapping("/api/likes")

public class LikeController {

    @Autowired
    private LikeService likeService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/{postId}")
    public ResponseEntity<?> addLike(
            @PathVariable Long postId,
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {throw new UnauthorizedException("Token manquant");}
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {throw new TokenExpiredException("Token expired");}

        Long userId = jwtService.extractId(token);

        try {
            likeService.addLike(postId, userId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Like" + postId);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(404).body("Post not Found");
        }
    }

    @GetMapping("/like-info/{postId}")
    public ResponseEntity<?> getLikeInfo(
            @PathVariable Long postId,
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {throw new UnauthorizedException("Token manquant");}
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {throw new TokenExpiredException("Token expired");}
        
        Long userId = jwtService.extractId(token);

        LikeDTO info = likeService.getLikeInfo(postId, userId);
        return ResponseEntity.ok(info);
    }
}
