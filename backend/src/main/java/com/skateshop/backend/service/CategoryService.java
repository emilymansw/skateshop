package com.skateshop.backend.service;

import com.skateshop.backend.dto.CategoryDTO;
import com.skateshop.backend.model.Category;
import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getAllCategories();
    Category getCategoryBySlug(String categorySlug);
    Category getCategoryByName(String categoryName);



}
