package com.blog_01.dto;

import java.util.List;

public class BlogPostDTO {
    private Long id;
    private String title;
    private String description;
    private List<MediaDTO> medias; 
    private AuthorDTO author;
    private String publishDate;

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public String getTitle() {return title;}
    public void setTitle(String title) {this.title = title;}
    public String getDescription() {return description;}
    public void setDescription(String description) {this.description = description;}
    public List<MediaDTO> getMedias() {return medias;}
    public void setMedias(List<MediaDTO> medias) {this.medias = medias;}
    public AuthorDTO getAuthor() {return author;}
    public void setAuthor(AuthorDTO author) {this.author = author;}
    public String getPublishDate() {return publishDate;}
    public void setPublishDate(String publishDate) {this.publishDate = publishDate;}
}


