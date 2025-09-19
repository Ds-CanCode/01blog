package com.blog_01.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Token manquant");
        }

        String token = authHeader.substring(7);
        Long id = jwtService.extractId(token);
        return ResponseEntity.ok(adminService.getAllUsers());
    }

     @DeleteMapping("delete/{postId}")
    public ResponseEntity<?> deletePost(
            @PathVariable Long postId,
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        String token = authHeader.substring(7);
        Long id = jwtService.extractId(token);
        boolean isDeleted = adminService.deletePost(postId);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } 
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        
    }
}
