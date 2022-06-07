package com.skateshop.backend.dto.response.product;

import lombok.Data;

import java.util.Collection;

@Data
public class VariantInfoDTO {
    private long id;
    private long stock;
    private float weight;
    private float price;
    private float compareAtPrice;
    private Collection<String> optionValues;
    private String colorName;
}
