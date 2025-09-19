package com.blog_01.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog_01.dto.UserInfoDTO;
import com.blog_01.dto.UserPostInfoDTO;
import com.blog_01.service.JwtService;
import com.blog_01.service.ProfilService;

@RestController
@RequestMapping("/api/profile")
public class ProfilController {

    @Autowired
    private ProfilService profilservice;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/{userInfoId}")
    public ResponseEntity<UserInfoDTO> getUserInfo(
            @PathVariable Long userInfoId,
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }

        String token = authHeader.substring(7);
        Long userId = jwtService.extractId(token);
        UserInfoDTO userInfo = profilservice.getUserInfo(userInfoId);
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/post/{userInfoId}")
    public ResponseEntity<List<UserPostInfoDTO>> getUserPostInfo(
            @PathVariable Long userInfoId,
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        String token = authHeader.substring(7);
        Long userId = jwtService.extractId(token);
        List<UserPostInfoDTO> userPostInfo = profilservice.getUserPostInfo(userInfoId);
        return ResponseEntity.ok(userPostInfo);
    }

    @GetMapping("/me")
    public ResponseEntity<UserInfoDTO> getUserInfoMe(
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }

        String token = authHeader.substring(7);
        Long userId = jwtService.extractId(token);
        UserInfoDTO userInfo = profilservice.getUserInfo(userId);
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/post/me")
    public ResponseEntity<List<UserPostInfoDTO>> getUserPostInfoMe(
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        String token = authHeader.substring(7);
        Long userId = jwtService.extractId(token);
        List<UserPostInfoDTO> userPostInfo = profilservice.getUserPostInfo(userId);
        return ResponseEntity.ok(userPostInfo);
    }



    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deletePost(
            @PathVariable Long id,
            @RequestHeader("Authorization") String authHeader
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }
        String token = authHeader.substring(7);
        Long userId = jwtService.extractId(token);
        String role = jwtService.extractRole(token);
        boolean isDeleted = profilservice.deletePost(id, userId, role);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        } 
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        
    }
}
