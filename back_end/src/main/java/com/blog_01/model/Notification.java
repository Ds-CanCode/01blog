package com.blog_01.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 500)
    private String message;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "is_read", nullable = false)
    private Boolean read = false; 

    @ManyToOne
    @JoinColumn(name = "recipient_id", nullable = false)
    private User recipient;

   
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public String getMessage() {return message;}
    public void setMessage(String message) {this.message = message;}
    public LocalDateTime getCreatedAt() {return createdAt;}
    public void setCreatedAt(LocalDateTime createdAt) {this.createdAt = createdAt;}
    public Boolean getRead() {return read;}
    public void setRead(Boolean read) {this.read = read;}
    public User getRecipient() {return recipient;}
    public void setRecipient(User recipient) {this.recipient = recipient;}
    public Post getPost() {return post;}
    public void setPost(Post post) {this.post = post;}
}
