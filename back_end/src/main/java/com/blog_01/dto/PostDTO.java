package com.blog_01.dto;

import java.util.List;

public class PostDTO {
    private String content;
    private List<MediaDTO> medias;

    
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public List<MediaDTO> getMedias() {
        return medias;
    }
    public void setMedias(List<MediaDTO> medias) {
        this.medias = medias;
    }
}
