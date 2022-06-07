package com.skateshop.backend.service.impl;

import com.skateshop.backend.model.Image;
import com.skateshop.backend.repository.ImageRepository;
import com.skateshop.backend.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    ImageRepository imageRepository;

    @Override
    public Optional<Image> getImageByCloudinaryId(String cloudinaryId){
        return imageRepository.findByCloudinaryId(cloudinaryId);
    }

}
