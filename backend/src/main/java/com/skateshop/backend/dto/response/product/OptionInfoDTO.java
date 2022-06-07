package com.skateshop.backend.dto.response.product;

import lombok.Data;

import java.util.Collection;

@Data
public class OptionInfoDTO {
    private String name;
    private Collection<String> optionValues;


}
