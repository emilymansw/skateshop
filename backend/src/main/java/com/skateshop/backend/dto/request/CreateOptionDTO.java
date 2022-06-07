package com.skateshop.backend.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class CreateOptionDTO {
    private String optionFamily;
    private List<String> optionValues;
}
