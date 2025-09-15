package com.blog_01.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog_01.dto.CommentDTO;
import com.blog_01.model.Comment;
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
    public ResponseEntity<CommentDTO> addComment(
            @PathVariable Long postId,
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> request
    ) {
        String token = authHeader.substring(7);
        Long userId = jwtService.extractId(token);
        String content = request.get("content");
        CommentDTO comment = commentService.addComment(postId, userId, content);
        //CommentDTO dto = new CommentDTO(comment);
        return ResponseEntity.ok(comment);
    }
}
