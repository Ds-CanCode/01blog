package com.blog_01.dto;

import java.time.LocalDateTime;

public class AdminDTO {


    private Long id;
    private String username;
    private String email;
    private LocalDateTime createdAt;
    private Boolean isBanned;
    private String profileImageUrl;


    public AdminDTO() {}

    public AdminDTO(Long id, String username, String email,
                   LocalDateTime createdAt, Boolean isBanned,
                   String profileImageUrl) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
        this.isBanned = isBanned;
        this.profileImageUrl = profileImageUrl;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getIsBanned() {
        return isBanned;
    }

    public void setIsBanned(Boolean isBanned) {
        this.isBanned = isBanned;
    }

    public String getProfileImage() {
        return profileImageUrl;
    }

    public void setProfileImage(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }


}
