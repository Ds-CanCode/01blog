package com.blog_01.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.blog_01.dto.UserInfoDTO;
import com.blog_01.model.User;
import com.blog_01.repository.UserRepository;

@Service
public class ProfilService {

    @Autowired
    private UserRepository userRepository;

    public UserInfoDTO getUserInfo(Long userInfoId) {
        User user = userRepository.findById(userInfoId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserInfoDTO dto = new UserInfoDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setProfileImage(user.getProfileImage());
        dto.setCoverImage(user.getCoverImage());
        dto.setFollowersCount(user.getFollowers().size());
        dto.setFollowingCount(user.getFollowing().size());

        return dto;
    }
}
