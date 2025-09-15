package com.blog_01.service;

import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.blog_01.dto.AuthorDTO;
import com.blog_01.dto.BlogPostDTO;
import com.blog_01.model.Media;
import com.blog_01.model.Post;
import com.blog_01.model.User;
import com.blog_01.repository.PostRepository;
import com.blog_01.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;

    public PostService(PostRepository postRepository, UserRepository userRepository, CloudinaryService cloudinaryService) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Transactional
    public Post create(String title, String content, String tags, String username, List<MultipartFile> files, List<String> types) throws java.io.IOException {
        User user = userRepository.findByUsername(username)
                            .orElseThrow(() -> new RuntimeException("User not found"));
        if (user == null) {
            throw new RuntimeException("Utilisateur introuvable");
        }

        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setTags(tags);
        post.setUser(user);

        if (files != null) {
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                String typeStr = types.get(i);
                String resourceType = typeStr.equals("VIDEO") ? "video" : "image";

                byte[] fileBytes = file.getBytes();
                Map uploadResult = cloudinaryService.upload(fileBytes, "posts", resourceType);

                Media media = new Media();
                media.setType(Media.MediaType.valueOf(typeStr));
                media.setUrl(uploadResult.get("secure_url").toString());
                media.setPublicId(uploadResult.get("public_id").toString());
                media.setPost(post);

                post.getMedias().add(media);
            }
        }

        return postRepository.save(post);
    }

    public ResponseEntity<List<BlogPostDTO>> getAllPosts() {
        List<Post> posts = postRepository.findAll();

        List<BlogPostDTO> dtos = posts.stream().map(post -> {
            BlogPostDTO dto = new BlogPostDTO();
            dto.setId(post.getId());
            dto.setTitle(post.getTitle());
            dto.setDescription(post.getContent());

            if (!post.getMedias().isEmpty()) {
                Media firstMedia = post.getMedias().get(0);
                dto.setImage(firstMedia.getUrl());
                // dto.setIsVideo(firstMedia.getType() == Media.MediaType.VIDEO);
            }
            AuthorDTO author = new AuthorDTO();
            User user = post.getUser();
            author.setName(user.getUsername());
            if (user.getProfileImage() != null) {
                String base64Avatar = Base64.getEncoder().encodeToString(user.getProfileImage());
                author.setAvatar("data:image/png;base64," + base64Avatar);
            } else {
                author.setAvatar(null);
            }
            dto.setAuthor(author);
            dto.setPublishDate(post.getCreatedAt().toString()); // ou formatter ISO
            return dto;
        }).toList();

        return ResponseEntity.ok(dtos);
    }

    public ResponseEntity<BlogPostDTO> getPost(Long id) {
        return postRepository.findById(id)
                .map(post -> {
                    BlogPostDTO dto = new BlogPostDTO();
                    dto.setId(post.getId());
                    dto.setTitle(post.getTitle());
                    dto.setDescription(post.getContent());

                    if (!post.getMedias().isEmpty()) {
                        Media firstMedia = post.getMedias().get(0);
                        dto.setImage(firstMedia.getUrl());
                        dto.setVideo(firstMedia.getType() == Media.MediaType.VIDEO);
                    }

                    AuthorDTO author = new AuthorDTO();
                    User user = post.getUser();
                    author.setName(post.getUser().getUsername());
                    if (user.getProfileImage() != null) {
                        String base64Avatar = Base64.getEncoder().encodeToString(user.getProfileImage());
                        author.setAvatar("data:image/png;base64," + base64Avatar);
                    } else {
                        author.setAvatar(null);
                    }
                    dto.setAuthor(author);
                    dto.setPublishDate(post.getCreatedAt().toString());
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    //  return
    //     .map(post -> {
    //         BlogPostDTO dto = new BlogPostDTO();
    //         dto.setId(post.getId());
    //         dto.setTitle(post.getTitle());
    //         dto.setDescription(post.getContent());

    //         if (!post.getMedias().isEmpty()) {
    //             Media firstMedia = post.getMedias().get(0);
    //             dto.setImage(firstMedia.getUrl());
    //         }
    //         AuthorDTO author = new AuthorDTO();
    //         author.setName(post.getUser().getUsername());
    //         dto.setAuthor(author);
    //         dto.setPublishDate(post.getCreatedAt().toString());
    //         return ResponseEntity.ok(dto);
    //     })
    //     .orElse(ResponseEntity.notFound().build());
}
