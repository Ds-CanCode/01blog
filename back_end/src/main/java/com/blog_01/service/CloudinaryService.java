package com.blog_01.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService() {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "db0smfwdd",
                "api_key", "821256124929233",
                "api_secret", "1Vb5EkM8ihHI-D71vB59Od0F4Fg",
                "secure", true
        ));
    }

    public Map upload(byte[] fileBytes, String folder, String resourceType) throws IOException {
        Map params = ObjectUtils.asMap(
                "folder", folder,
                "resource_type", resourceType
        );
        return cloudinary.uploader().upload(fileBytes, params);
    }

}
