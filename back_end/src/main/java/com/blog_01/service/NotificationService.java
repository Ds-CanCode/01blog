package com.blog_01.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog_01.model.Notification;
import com.blog_01.model.Post;
import com.blog_01.model.User;
import com.blog_01.repository.NotificationRepository;

@Service
public class NotificationService {


    private final NotificationRepository notificationRepository;


    @Autowired
    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

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
}
