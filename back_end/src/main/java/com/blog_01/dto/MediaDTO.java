package com.blog_01.dto;

import com.blog_01.model.Media.MediaType;

public class MediaDTO {
    private String url;;
    private MediaType type; 

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
    public MediaType getType() { return type; }
    public void setType(MediaType type) { this.type = type; }
}
