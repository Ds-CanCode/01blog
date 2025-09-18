package com.blog_01.dto;

import java.time.LocalDateTime;

public class NotifDTO {
     private Long id;
    private String message;
    private LocalDateTime createdAt;
    private Boolean read;
    private Long postId;

    public NotifDTO(Long id, String message, LocalDateTime createdAt, Boolean read, Long postId) {
        this.id = id;
        this.message = message;
        this.createdAt = createdAt;
        this.read = read;
        this.postId = postId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}
