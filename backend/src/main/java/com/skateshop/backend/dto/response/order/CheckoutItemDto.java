package com.skateshop.backend.dto.response.order;

import lombok.Data;

@Data
public class CheckoutItemDto {
    private String productName;
    private String productImage;
    private int  quantity;
    private double price;
    private long variantId;
    private String variantOptionValues;
}
