package com.blog_01.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog_01.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}