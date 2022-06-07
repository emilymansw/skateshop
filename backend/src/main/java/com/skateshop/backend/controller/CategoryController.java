package com.skateshop.backend.controller;

import com.skateshop.backend.dto.CategoryDTO;
import com.skateshop.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {
    @Autowired
    CategoryService categoryServiceImpl;

    @GetMapping("/categories")
    public List<CategoryDTO> getAllCategories(){
        return categoryServiceImpl.getAllCategories();
    }
}
