package com.skateshop.backend.service.impl;

import com.skateshop.backend.dto.CategoryDTO;
import com.skateshop.backend.model.Category;
import com.skateshop.backend.repository.CategoryRepository;
import com.skateshop.backend.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<CategoryDTO> getAllCategories(){
        return categoryRepository.findAll().stream().map(
                category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Category getCategoryBySlug(String categorySlug){
        return categoryRepository.findBySlug(categorySlug);
    }

    @Override
    public Category getCategoryByName(String categoryName){
        return categoryRepository.findByName(categoryName);
    }
}
