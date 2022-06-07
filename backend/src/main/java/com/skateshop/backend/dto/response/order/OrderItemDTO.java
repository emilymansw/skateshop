package com.skateshop.backend.dto.response.order;

import com.skateshop.backend.dto.response.product.VariantInfoDTO;
import lombok.Data;

@Data
public class OrderItemDTO {
    private OrderVariantInfoDTO variant;
    private long quantity;
}
