package com.skateshop.backend.controller;

import com.skateshop.backend.dto.BrandDTO;
import com.skateshop.backend.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class BrandController {
    @Autowired
    BrandService brandService;

    @GetMapping("/brands")
    public List<BrandDTO> getAllBrands(){
        return brandService.getAllBrands();
    }

    @GetMapping("/brand/{brandSlug}")
    public BrandDTO getBrand(@PathVariable String brandSlug){
        BrandDTO brandDTO = brandService.getBrandDTOBySlug(brandSlug);
        if( brandDTO != null ){
            return brandDTO;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }


}
