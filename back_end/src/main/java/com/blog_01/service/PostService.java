package com.blog_01.service;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Iterator;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.blog_01.dto.AuthorDTO;
import com.blog_01.dto.BlogPostDTO;
import com.blog_01.dto.MediaDTO;
import com.blog_01.model.Media;
import com.blog_01.model.Post;
import com.blog_01.model.User;
import com.blog_01.repository.MediaRepository;
import com.blog_01.repository.PostRepository;
import com.blog_01.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.io.IOException;
import jakarta.transaction.Transactional;

@Service
public class PostService {

     private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;
    private final MediaRepository mediaRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository, CloudinaryService cloudinaryService, MediaRepository mediaRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.cloudinaryService = cloudinaryService;
        this.mediaRepository = mediaRepository;
    }

    @Transactional
    public Post create(String title, String content, String username, List<MultipartFile> files, List<String> types) throws java.io.IOException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (user == null) {
            throw new RuntimeException("Utilisateur introuvable");
        }

        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
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
                List<MediaDTO> mediaDTOs = post.getMedias().stream().map(media -> {
                    MediaDTO mediaDTO = new MediaDTO();
                    mediaDTO.setUrl(media.getUrl());
                    mediaDTO.setType(media.getType());
                    return mediaDTO;
                }).toList();

                dto.setMedias(mediaDTOs);
            }
            AuthorDTO author = new AuthorDTO();
            User user = post.getUser();
            author.setId(user.getId());
            author.setName(user.getUsername());
            if (user.getProfileImage() != null) {
                String base64Avatar = Base64.getEncoder().encodeToString(user.getProfileImage());
                author.setAvatar("data:image/png;base64," + base64Avatar);
            } else {
                author.setAvatar(null);
            }
            dto.setAuthor(author);
            dto.setPublishDate(post.getCreatedAt().toString());
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
                        List<MediaDTO> mediaDTOs = post.getMedias().stream().map(media -> {
                            MediaDTO mediaDTO = new MediaDTO();
                            mediaDTO.setUrl(media.getUrl());
                            mediaDTO.setType(media.getType());
                            return mediaDTO;
                        }).toList();

                        dto.setMedias(mediaDTOs);
                    }

                    AuthorDTO author = new AuthorDTO();
                    User user = post.getUser();
                    author.setId(user.getId());
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
                }
                )
                .orElse(ResponseEntity.notFound().build());
    }

    @Transactional
    public Post edit(Long idUser, Long idPost, String title, String content, String username, List<MultipartFile> files, List<String> types, String mediasToRemoveJson) throws java.io.IOException {
        Post post = postRepository.findById(idPost)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!post.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Permistion");
        }
        
        post.setTitle(title);
        post.setContent(content);
        post.setUser(user);
        post.setEditedAt(LocalDateTime.now());


        if (mediasToRemoveJson != null && !mediasToRemoveJson.isEmpty()) {
            ObjectMapper mapper = new ObjectMapper();
            List<String> mediasToRemove = mapper.readValue(mediasToRemoveJson, List.class);

            Iterator<Media> iterator = post.getMedias().iterator();
            while (iterator.hasNext()) {
                Media media = iterator.next();
                if (mediasToRemove.contains(media.getUrl())) {
                    if (media.getPublicId() != null) {
                        try {
                            cloudinaryService.delete(media.getPublicId());
                        } catch (IOException e) {
                            e.printStackTrace(); 
                        }
                    }
                    mediaRepository.delete(media);
                    iterator.remove();
                }
            }
        }

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
    
}
