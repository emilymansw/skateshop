package com.skateshop.backend.dto.response.order;
import com.skateshop.backend.model.ShippingAddress;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderRecordDetailDTO extends OrderRecordDTO {
    private ShippingAddress shippingAddress;
    private List<OrderItemDTO> orderItems;
    private LocalDateTime createDateTime;
}

