package com.skateshop.backend.dto.request;

import com.skateshop.backend.dto.response.product.OptionValueDTO;
import lombok.Data;

import java.util.List;

@Data
public class CreateOptionFamilyDTO {
    private String name;
    private List<String> optionValues;
}
