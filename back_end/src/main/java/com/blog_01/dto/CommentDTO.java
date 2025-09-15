package com.blog_01.dto;

import java.time.LocalDateTime;
import java.util.Base64;

import com.blog_01.model.Comment;

public class CommentDTO {

    private Long id;
    private String content;
    private Long postId;
    private Long userId;
    private String username;
    private String avatar;
    private final LocalDateTime createDate;

    public CommentDTO(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.postId = comment.getPost().getId();
        this.userId = comment.getUser().getId();
        this.username = comment.getUser().getUsername();
        byte[] avatarBytes = comment.getUser().getProfileImage();
        if (avatarBytes != null) {
            this.avatar = "data:image/png;base64," + Base64.getEncoder().encodeToString(avatarBytes);
        } else {
            this.avatar = null;
        }
        this.createDate = comment.getCreatedAt();
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public LocalDateTime getCreateDate() {
        return createDate;
    }

}
