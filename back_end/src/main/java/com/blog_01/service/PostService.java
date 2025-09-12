package com.blog_01.service;

import org.springframework.stereotype.Service;

import com.blog_01.model.Post;
import com.blog_01.repository.PostRepository;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post create(Post post) {
        return postRepository.save(post);
    }
}
