package com.blog_01.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    public Post create(String title, String content, String tags ,String username, List<MultipartFile> files, List<String> types) throws java.io.IOException {
        User user = userRepository.findByUsername(username);
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

}
