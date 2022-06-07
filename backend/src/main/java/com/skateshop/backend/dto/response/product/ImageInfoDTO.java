package com.skateshop.backend.dto.response.product;

import lombok.Data;

@Data
public class ImageInfoDTO {
    private String name;
    private String imageUrl;
    private String cloudinaryId;
}
