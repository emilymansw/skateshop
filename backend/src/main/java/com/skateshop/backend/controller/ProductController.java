package com.skateshop.backend.controller;

import com.skateshop.backend.dto.response.product.ProductInfoDTO;
import com.skateshop.backend.dto.response.product.VariantInfoDTO;
import com.skateshop.backend.service.CloudinaryService;
import com.skateshop.backend.service.ProductService;
import com.skateshop.backend.service.VariantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class ProductController {
    @Autowired
    VariantService variantService;
    @Autowired
    ProductService productService;
    @Autowired
    CloudinaryService cloudinaryService;

    private final int SIZE = 8;

    @GetMapping("/product/{slug}")
    public ProductInfoDTO getProduct(@PathVariable String slug) {
        ProductInfoDTO productInfoDTO = productService.getProductBySlug(slug);
        if(productInfoDTO == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return productService.getProductBySlug(slug);
    }

    @GetMapping("/products")
    public Page<ProductInfoDTO> getAllProductsPage(@RequestParam(value = "page", defaultValue = "1") Integer page){
        PageRequest request = PageRequest.of(page - 1, SIZE);
        return productService.getAllLive(request);
    }

    @GetMapping("/products/brand/{brandSlug}")
    public Page<ProductInfoDTO> getAllProductsByBrandSlugPage(@PathVariable String brandSlug, @RequestParam(value = "page", defaultValue = "1") Integer page){
        PageRequest request = PageRequest.of(page - 1, SIZE);
        Page<ProductInfoDTO> productInfoDTOS = productService.getAllByBrandSlug(brandSlug, request);
        if(productInfoDTOS != null){
            return productInfoDTOS;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/products/category/{categorySlug}")
    public Page<ProductInfoDTO> getAllByCategorySlugPage(@PathVariable String categorySlug, @RequestParam(value = "page", defaultValue = "1") Integer page){
        PageRequest request = PageRequest.of(page - 1, SIZE);
        Page<ProductInfoDTO> productInfoDTOS = productService.getAllByCategorySlug(categorySlug, request);
        if(productInfoDTOS != null){
            return productInfoDTOS;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/search")
    public Page<ProductInfoDTO> searchProductPage(@RequestParam(name="q") String searchParam,  @RequestParam(value = "page", defaultValue = "1") Integer page){
        PageRequest request = PageRequest.of(page - 1, SIZE);
        return productService.getSearchProductResult(searchParam, request);
    }

    @GetMapping("/variant/{id}")
    public VariantInfoDTO getVariant(@PathVariable long id) {
        VariantInfoDTO variantInfoDTO = variantService.getVariantDTO(id);
        if(variantInfoDTO != null){
            return variantService.getVariantDTO(id);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/renderImg")
    public String getRenderUrl(@RequestParam String gripeTape, @RequestParam String deck, @RequestParam String truckColor, @RequestParam String wheelColor) {
        return cloudinaryService.createURL(gripeTape, deck, truckColor, wheelColor);
    }

}
