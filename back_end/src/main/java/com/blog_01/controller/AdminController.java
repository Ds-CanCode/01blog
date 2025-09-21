package com.blog_01.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog_01.exception.TokenExpiredException;
import com.blog_01.exception.UnauthorizedException;
import com.blog_01.service.AdminService;
import com.blog_01.service.JwtService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private AdminService adminService;

    @GetMapping("/allusers")
    public ResponseEntity<?> getAllUsers(
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {throw new UnauthorizedException("Token manquant");}
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {throw new TokenExpiredException("Token expired");}
        
        Long id = jwtService.extractId(token);
        String role = jwtService.extractRole(token);
        if (!role.equals("ADMIN")) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(adminService.getAllUsers(id));
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<?> deletePost(
            @PathVariable Long postId,
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {throw new UnauthorizedException("Token manquant");}
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {throw new TokenExpiredException("Token expired");}

        String role = jwtService.extractRole(token);
        if (!role.equals("ADMIN")) {
            return ResponseEntity.status(401).build();
        }
        boolean isDeleted = adminService.deletePost(postId);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } 
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        
    }

    @PostMapping("/ban/{userId}")
    public ResponseEntity<?> banUser(
            @PathVariable Long userId,
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {throw new UnauthorizedException("Token manquant");}
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {throw new TokenExpiredException("Token expired");}
        
        String role = jwtService.extractRole(token);
        if (!role.equals("ADMIN")) {
            return ResponseEntity.status(401).build();
        }
        adminService.banUser(userId);
        return ResponseEntity.ok(Map.of("message", "Utilisateur banni/débanni avec succès"));
        
    }
}
