package com.blog_01.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog_01.dto.NotifDTO;
import com.blog_01.service.JwtService;
import com.blog_01.service.NotificationService;

@RestController
@RequestMapping("/api/notif")

public class NotificationController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private NotificationService notificationService;

    @GetMapping("")
    public ResponseEntity<List<NotifDTO>> getNotif(
        @RequestHeader("Authorization") String authHeader
    ){
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }

        String token = authHeader.substring(7);
        Long userId = jwtService.extractId(token);
        List<NotifDTO> notif = notificationService.getUnreadNotifications(userId);
        return ResponseEntity.ok(notif);
    }

    @PostMapping("/read/{postId}")
    public ResponseEntity<?> readNotif(
        @PathVariable Long postId,
        @RequestHeader("Authorization") String authHeader
    ){
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).build();
        }

        String token = authHeader.substring(7);
        Long userId = jwtService.extractId(token);
        notificationService.readNotification(userId, postId);
        return ResponseEntity.ok().build();
    }
}
