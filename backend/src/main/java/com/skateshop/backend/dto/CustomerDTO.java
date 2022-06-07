package com.skateshop.backend.dto;

import com.skateshop.backend.dto.response.order.OrderRecordDTO;
import lombok.Data;

import java.util.Collection;

@Data
public class CustomerDTO {
    private long id;
    private String name;
    private String email;
    private Collection<OrderRecordDTO> orderRecords;
}
