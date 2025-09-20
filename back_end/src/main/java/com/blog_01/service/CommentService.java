package com.blog_01.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog_01.dto.CommentDTO;
import com.blog_01.model.Comment;
import com.blog_01.model.Post;
import com.blog_01.model.User;
import com.blog_01.repository.CommentRepository;
import com.blog_01.repository.PostRepository;
import com.blog_01.repository.UserRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public CommentDTO addComment(Long postId, Long userId, String content) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setUser(user);
        comment.setContent(content);
        Comment savedComment = commentRepository.save(comment);
        return new CommentDTO(savedComment);
    }

    @Transactional(readOnly = true)
    public List<CommentDTO> getCommentsByPost(Long postId, int page, int size) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Pageable pageable = PageRequest.of(page, size);
        Page<Comment> commentsPage = commentRepository.findByPost(post, pageable);

        return commentsPage.stream()
            .map(CommentDTO::new)
            .collect(Collectors.toList());
    }

}
