package com.skateshop.backend.dto.response.product;

import lombok.Data;

import java.util.Collection;
import java.util.List;

@Data
public class ProductInfoDTO {
    private long id;
    private String name;
    private String brandLogoUrl;
    private String brandSlug;
    private String description;
    private String slug;
    private boolean live;
    private String categoryName;
    private List<ImageInfoDTO> images;
    private Collection<OptionInfoDTO> options;
    private Collection<VariantInfoDTO> variants;



}
