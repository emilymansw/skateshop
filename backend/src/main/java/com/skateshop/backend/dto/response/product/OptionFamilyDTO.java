package com.skateshop.backend.dto.response.product;

import lombok.Data;

import java.util.List;

@Data
public class OptionFamilyDTO {
    private long id;
    private String name;
    private List<OptionValueDTO> optionValues;
}
