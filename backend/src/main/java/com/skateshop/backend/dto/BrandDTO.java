package com.skateshop.backend.dto;

import lombok.Data;

@Data
public class BrandDTO {
    private long id;
    private String name;
    private String description;
    private String logoUrl;
    private String bannerUrl;
    private String slug;
}
