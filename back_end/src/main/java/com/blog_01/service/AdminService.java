package com.blog_01.service;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog_01.dto.AdminDTO;
import com.blog_01.model.Post;
import com.blog_01.model.User;
import com.blog_01.repository.PostRepository;
import com.blog_01.repository.UserRepository;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public List<AdminDTO> getAllUsers() {
        List<User> users = userRepository.findAll();

        return users.stream().map(u -> {
        AdminDTO dto = new AdminDTO();
        dto.setId(u.getId());
        dto.setUsername(u.getUsername());
        dto.setEmail(u.getEmail());
        dto.setCreatedAt(u.getCreatedAt());
        dto.setIsBanned(u.getIsBanned());

        if (u.getProfileImage() != null) {
            String base64Avatar = Base64.getEncoder().encodeToString(u.getProfileImage());
            dto.setProfileImage("data:image/png;base64," + base64Avatar);
        } else {
            dto.setProfileImage(null);
        }

        return dto;
    }).collect(Collectors.toList());
    }

    public boolean deletePost(Long idPost) {
        Post post = postRepository.findById(idPost)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        postRepository.delete(post);
        return true;
    }

    public void banUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        user.setIsBanned(!user.getIsBanned());
        userRepository.save(user);
    }
}
