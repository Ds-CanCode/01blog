package com.blog_01.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "media")
public class Media {

    public enum MediaType {
        IMAGE,
        VIDEO
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // URL du fichier hébergé (Cloudinary, S3, etc.)
    @Column(nullable = false, length = 1024)
    private String url;  

    // Type de média (IMAGE ou VIDEO)
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MediaType type; 

    // Identifiant Cloudinary (utile pour suppression)
    @Column(name = "public_id", length = 512)
    private String publicId;

    // Relation avec Post
    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public MediaType getType() { return type; }
    public void setType(MediaType type) { this.type = type; }

    public String getPublicId() { return publicId; }
    public void setPublicId(String publicId) { this.publicId = publicId; }

    public Post getPost() { return post; }
    public void setPost(Post post) { this.post = post; }
}
