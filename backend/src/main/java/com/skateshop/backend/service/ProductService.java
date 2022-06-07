package com.skateshop.backend.service;

import com.skateshop.backend.dto.request.CreateProductDTO;
import com.skateshop.backend.dto.request.EditProductDTO;
import com.skateshop.backend.dto.response.product.ProductInfoDTO;
import com.skateshop.backend.model.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ProductService {

    Product saveProduct(Product productToSave);
    ProductInfoDTO getProductBySlug(String slug);
    Page<ProductInfoDTO> getAllLive(Pageable pageable);
    Page<ProductInfoDTO> getAll(Pageable pageable);
    Page<ProductInfoDTO> getAllByBrandSlug(String brandSlug, Pageable pageable);
    Page<ProductInfoDTO> getAllByCategorySlug(String categorySlug, Pageable pageable);
    Page<ProductInfoDTO> getSearchProductResult(String searchParam, Pageable pageable);
    Product updateStatus(long id);
    Product createProduct(CreateProductDTO createProductDTO);
    Product editProduct(EditProductDTO editProductDTO);

}
