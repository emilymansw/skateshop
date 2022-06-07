package com.skateshop.backend.service;

import com.skateshop.backend.dto.response.product.VariantInfoDTO;
import com.skateshop.backend.model.Variant;

public interface VariantService {
    VariantInfoDTO getVariantDTO(long id);
    Variant save(Variant variant);
    Variant getVariant(long id);
    Variant getVariantEntity(long id);

}
