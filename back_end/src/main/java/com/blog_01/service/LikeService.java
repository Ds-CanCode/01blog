package com.blog_01.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog_01.dto.LikeDTO;
import com.blog_01.model.Like;
import com.blog_01.model.Post;
import com.blog_01.model.User;
import com.blog_01.repository.LikeRepository;
import com.blog_01.repository.PostRepository;
import com.blog_01.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void addLike(Long postId, String username) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean existingLike = likeRepository.existsByUserAndPost(user, post);

        if (existingLike) {
            likeRepository.deleteByUserAndPost(user, post);
        } else {
            Like like = new Like();
            like.setPost(post);
            like.setUser(user);
            likeRepository.save(like);
        }
    }

    public LikeDTO getLikeInfo(Long postId, String username) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        LikeDTO dto = new LikeDTO();
        dto.setLikesCount(likeRepository.countByPost(post));
        dto.setUserLiked(likeRepository.existsByUserAndPost(user, post));
        return dto;
    }
}
