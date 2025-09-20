package com.blog_01.dto;

public class LikeDTO {
    private long likesCount;
    private boolean userLiked;

    public long getLikesCount() { return likesCount; }
    public void setLikesCount(long likesCount) { this.likesCount = likesCount; }
    public boolean isUserLiked() { return userLiked; }
    public void setUserLiked(boolean userLiked) { this.userLiked = userLiked; }
}
