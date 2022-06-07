package com.skateshop.backend.service;

import com.skateshop.backend.dto.BrandDTO;
import com.skateshop.backend.model.Brand;
import java.util.List;

public interface BrandService {
    List<BrandDTO> getAllBrands();
    BrandDTO editBrand(BrandDTO brandToUpdate, long id);
    BrandDTO createBrand(BrandDTO brandToUpdate);
    Brand getBrandByName(String brandName);
    BrandDTO getBrandDTOBySlug(String slug);
    Brand getBrandBySlug(String slug);

}
