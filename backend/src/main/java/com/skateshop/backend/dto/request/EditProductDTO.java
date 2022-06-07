package com.skateshop.backend.dto.request;

import lombok.Data;

@Data
public class EditProductDTO extends CreateProductDTO{
    private long id;
}
