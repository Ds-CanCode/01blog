package com.blog_01.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    // public enum Role {
    //     USER, ADMIN
    // }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    // @Enumerated(EnumType.STRING)
    // private Role role;

    private LocalDateTime createdAt;

    // private Boolean isBanned;

    // @Lob
    // private byte[] image;

  
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return passwordHash; }
    public void setPassword(String passwordHash) { this.passwordHash = passwordHash; }

    // public Role getRole() { return role; }
    // public void setRole(Role role) { this.role = role; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // public Boolean getIsBanned() { return isBanned; }
    // public void setIsBanned(Boolean isBanned) { this.isBanned = isBanned; }

    // public byte[] getImage() { return image; }
    // public void setImage(byte[] image) { this.image = image; }
}
