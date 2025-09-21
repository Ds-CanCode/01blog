package com.blog_01.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blog_01.dto.CommentDTO;
import com.blog_01.exception.TokenExpiredException;
import com.blog_01.exception.UnauthorizedException;
import com.blog_01.service.CommentService;
import com.blog_01.service.JwtService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final JwtService jwtService;

    public CommentController(CommentService commentService, JwtService jwtService) {
        this.commentService = commentService;
        this.jwtService = jwtService;
    }

    @PostMapping("/{postId}")
    public ResponseEntity<?> addComment(
            @PathVariable Long postId,
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> request
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {throw new UnauthorizedException("Token manquant");}
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {throw new TokenExpiredException("Token expired");}

        Long userId = jwtService.extractId(token);
        String content = request.get("content");
        CommentDTO comment = commentService.addComment(postId, userId, content);
        return ResponseEntity.ok(comment);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDTO>> getComments(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long postId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {throw new UnauthorizedException("Token manquant");}
        String token = authHeader.substring(7);
        if (!jwtService.isTokenValid(token)) {throw new TokenExpiredException("Token expired");}
        
        List<CommentDTO> comments = commentService.getCommentsByPost(postId, page, size);
        return ResponseEntity.ok(comments);
    }

}
