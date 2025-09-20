package com.blog_01.service;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog_01.dto.MediaDTO;
import com.blog_01.dto.UserInfoDTO;
import com.blog_01.dto.UserPostInfoDTO;
import com.blog_01.model.Post;
import com.blog_01.model.User;
import com.blog_01.repository.PostRepository;
import com.blog_01.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class ProfilService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Transactional
    public UserInfoDTO getUserInfo(Long userInfoId) {
        User user = userRepository.findById(userInfoId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserInfoDTO dto = new UserInfoDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setCreatedAt(user.getCreatedAt());
        if (user.getProfileImage() != null) {
            String base64Avatar = Base64.getEncoder().encodeToString(user.getProfileImage());
            dto.setProfileImage("data:image/png;base64," + base64Avatar);
        } else {
            dto.setProfileImage(null);
        }
        if (user.getCoverImage() != null) {
            String base64Avatar = Base64.getEncoder().encodeToString(user.getCoverImage());
            dto.setCoverImage("data:image/png;base64," + base64Avatar);
        } else {
            dto.setCoverImage(null);
        }
        dto.setFollowersCount(user.getFollowers().size());
        dto.setFollowingCount(user.getFollowing().size());

        return dto;
    }

    @Transactional
    public List<UserPostInfoDTO> getUserPostInfo(Long userInfoId) {
        List<Post> posts = postRepository.findPostsWithMediaByUserId(userInfoId)
                            .orElseThrow(() -> new RuntimeException("Post not found"));

        List<UserPostInfoDTO> dtos = posts.stream().map(post -> {
            UserPostInfoDTO dto = new UserPostInfoDTO();
            dto.setId(post.getId());
            dto.setTitle(post.getTitle());
            dto.setDescription(post.getContent());
            dto.setPublishDate(post.getCreatedAt().toString());

            List<MediaDTO> mediaDTOs = post.getMedias().stream()
                    .map(media -> {
                        MediaDTO m = new MediaDTO();
                        m.setUrl(media.getUrl());
                        m.setType(media.getType());
                        return m;
                    })
                    .toList();

            dto.setMedias(mediaDTOs);

            return dto;
        }).toList();

        return dtos;
    }

    @Transactional
    public boolean deletePost(Long idPost, Long idUser, String role) {
        Post post = postRepository.findById(idPost)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!post.getUser().getId().equals(user.getId()) && !role.equals("ADMIN")) {
            return false;
        }

        postRepository.delete(post);
        return true;
    }
}
