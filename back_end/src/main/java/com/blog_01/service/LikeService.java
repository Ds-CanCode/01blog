package com.blog_01.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog_01.dto.LikeDTO;
import com.blog_01.model.Like;
import com.blog_01.model.Post;
import com.blog_01.model.User;
import com.blog_01.repository.LikeRepository;
import com.blog_01.repository.PostRepository;

import jakarta.transaction.Transactional;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private PostRepository postRepository;

    

    @Transactional
    public void addLike(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        if (likeRepository.existsByUserIdAndPostId(userId, postId)) {
            likeRepository.deleteByUserIdAndPostId(userId, postId);
        } else {
            Like like = new Like();
            User userProxy = new User();
            userProxy.setId(userId);
            like.setUser(userProxy);
            like.setPost(post);
            likeRepository.save(like);
        }

    }

    @Transactional
    public LikeDTO getLikeInfo(Long postId, Long userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));


        LikeDTO dto = new LikeDTO();
        dto.setLikesCount(likeRepository.countByPost(post));
        dto.setUserLiked(likeRepository.existsByUserIdAndPostId(userId, postId));
        return dto;
    }
}
