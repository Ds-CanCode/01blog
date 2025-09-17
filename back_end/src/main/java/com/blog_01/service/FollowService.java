package com.blog_01.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog_01.model.User;
import com.blog_01.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class FollowService {

    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public void follow(Long myId, Long userId) {
        User me = userRepository.findById(myId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        User target = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur cible introuvable"));

        if (me.getFollowing().contains(target)) {
            me.getFollowing().remove(target);
            target.getFollowers().remove(me);
            userRepository.save(me);
            userRepository.save(target);
        } else {
            me.getFollowing().add(target);
            target.getFollowers().add(me);
            userRepository.save(me);
            userRepository.save(target);
        }
    }
}
