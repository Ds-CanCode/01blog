package com.blog_01.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog_01.dto.NotifDTO;
import com.blog_01.model.Notification;
import com.blog_01.model.Post;
import com.blog_01.model.User;
import com.blog_01.repository.NotificationRepository;
import com.blog_01.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private UserRepository userRepository;
    
    @Transactional
    public Notification createNotification(User recipient, String message, Post post) {
        Notification notif = new Notification();
        notif.setRecipient(recipient);
        notif.setMessage(message);
        notif.setCreatedAt(LocalDateTime.now());
        notif.setRead(false);
        notif.setPost(post);

        Notification saved = notificationRepository.save(notif);

        return saved;
    }

    @Transactional
    public List<NotifDTO> getUnreadNotifications(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return notificationRepository.findByRecipientAndReadFalse(user)
                .stream()
                .map(n -> new NotifDTO(
                n.getId(),
                n.getMessage(),
                n.getCreatedAt(),
                n.getRead(),
                n.getPost() != null ? n.getPost().getId() : null
        )).toList();
    }

    @Transactional
    public void readNotification(Long userId, Long postId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notif = notificationRepository.findByRecipientAndPostId(user, postId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        if (!notif.getRead()) {
            notif.setRead(true);
            notificationRepository.save(notif);
        }
    }

     @Transactional
    public void readAllNotification(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        List<Notification> notifications = notificationRepository.findByRecipientAndReadFalse(user);
        for (Notification notif : notifications) {
            notif.setRead(true);
        }
        notificationRepository.saveAll(notifications);
    }
}
