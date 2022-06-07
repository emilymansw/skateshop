package com.skateshop.backend.dto.request;

import com.skateshop.backend.dto.response.product.VariantInfoDTO;
import lombok.Data;

import java.util.List;

@Data
public class CreateProductDTO {
    private String name;
    private String description;
    private String brandName;
    private String categoryName;
    private List<CreateImageDTO> images;
    private List<CreateOptionDTO> options;
    private List<VariantInfoDTO> Variants;

}
