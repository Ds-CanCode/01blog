package com.blog_01.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blog_01.model.Like;
import com.blog_01.model.Post;
import com.blog_01.model.User;


@Repository
public interface LikeRepository  extends JpaRepository<Like, Long>  {
    boolean existsByUserAndPost(User user, Post post);
    void deleteByUserAndPost(User user, Post post);
    long countByPost(Post post);
}
