package com.blog_01.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog_01.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}