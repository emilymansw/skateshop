package com.skateshop.backend.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class CloudinaryConfig {
    @Autowired
    Environment env;

    @Bean
    public Cloudinary createCloudinary() {

        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", env.getProperty("CLOUDINARY_CLOUD_NAME"),
                "api_key", env.getProperty("CLOUDINARY_API_KEY"),
                "api_secret", env.getProperty("CLOUDINARY_API_SECRET"),
                "secure", true)
        );

        return cloudinary;
    }

}
