package com.skateshop.backend.dto.request;

import lombok.Data;

@Data
public class CreateImageDTO {
    private String imageUrl;
    private String cloudinaryId;
}
