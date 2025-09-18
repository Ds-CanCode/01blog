package com.blog_01.service;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog_01.dto.FollowingDTO;
import com.blog_01.model.User;
import com.blog_01.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class FollowService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public boolean follow(Long myId, Long userId) {
        User me = userRepository.findById(myId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        User target = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur cible introuvable"));

        boolean isNowFollowed;

        if (me.getFollowing().contains(target)) {
            // Si déjà suivi → unfollow
            me.getFollowing().remove(target);
            target.getFollowers().remove(me);
            isNowFollowed = false;
        } else {
            // Sinon → follow
            me.getFollowing().add(target);
            target.getFollowers().add(me);
            isNowFollowed = true;
        }

        userRepository.save(me);
        userRepository.save(target);

        return isNowFollowed;
    }

    @Transactional
    public boolean isFollow(Long myId, Long userId) {
        User me = userRepository.findById(myId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        User target = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur cible introuvable"));

        return me.getFollowing().contains(target);
    }

    @Transactional
    public List<FollowingDTO> getAllFollowing(Long myId) {
        User me = userRepository.findById(myId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        List<FollowingDTO> followingList = me.getFollowing().stream().map(u -> {
            FollowingDTO dto = new FollowingDTO();
            dto.setId(u.getId());
            dto.setUsername(u.getUsername());
            if (u.getProfileImage() != null) {
                String base64Avatar = Base64.getEncoder().encodeToString(u.getProfileImage());
                dto.setProfileImage("data:image/png;base64," + base64Avatar);
            } else {
                dto.setProfileImage(null);
            }
            return dto;
        }).toList();

        return followingList;
    }
}
