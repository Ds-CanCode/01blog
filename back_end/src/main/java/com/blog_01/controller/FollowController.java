package com.blog_01.controller;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog_01.service.FollowService;
import com.blog_01.service.JwtService;

@RestController
@RequestMapping("/api/follow")
public class FollowController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private FollowService followService;

    @PostMapping("/{userId}")
    public ResponseEntity<?> addFollow(
            @PathVariable Long userId,
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token manquant");
        }
        String token = authHeader.substring(7);
        Long myId = jwtService.extractId(token);
        if (!Objects.equals(myId, userId)) {
            followService.follow(myId, userId);
            return ResponseEntity.ok(200);
        }
        return ResponseEntity.ok(403);
    }
}
