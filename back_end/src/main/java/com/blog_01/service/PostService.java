package com.blog_01.service;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog_01.dto.PostDTO;
import com.blog_01.model.Media;
import com.blog_01.model.Post;
import com.blog_01.model.User;
import com.blog_01.repository.PostRepository;
import com.blog_01.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Post create(PostDTO postDTO, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("Utilisateur introuvable");
        }
        Post post = new Post();
        post.setContent(postDTO.getContent());
        post.setUser(user);
        if (postDTO.getMedias() != null) {
            postDTO.getMedias().forEach(mediaDTO -> {
                Media media = new Media();
                media.setType(Media.MediaType.valueOf(mediaDTO.getType()));
                media.setPost(post);
                media.setData(Base64.getDecoder().decode(mediaDTO.getBase64()));
                post.getMedias().add(media);
            });
        }

        return postRepository.save(post);
    }
}
