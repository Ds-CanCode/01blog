package com.blog_01.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", System.getenv("01blog"),
                "api_key", System.getenv("821256124929233"),
                "api_secret", System.getenv("1Vb5EkM8ihHI-D71vB59Od0F4Fg")));
    }
}
