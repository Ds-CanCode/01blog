package com.blog_01.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog_01.model.Notification;
import com.blog_01.model.User;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientAndReadFalse(User recipient);
    Optional<Notification> findByRecipientAndPostId(User recipient, Long postId);

}