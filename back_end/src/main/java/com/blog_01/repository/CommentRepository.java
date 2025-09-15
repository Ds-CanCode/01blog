package com.blog_01.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog_01.model.Comment;
import com.blog_01.model.Post;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
}