package com.skateshop.backend.service;

import com.skateshop.backend.model.Image;

import java.util.Optional;

public interface ImageService {
    Optional<Image> getImageByCloudinaryId(String cloudinaryId);
}
