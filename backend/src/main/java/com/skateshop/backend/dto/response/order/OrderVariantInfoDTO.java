package com.skateshop.backend.dto.response.order;

import com.skateshop.backend.dto.response.product.OptionValueDTO;
import lombok.Data;

import java.util.List;

@Data
public class OrderVariantInfoDTO {
    private long id;
    private float price;
    private String productName;
    private String productSlug;
    private List<OptionValueDTO> optionValues;
}
