package com.skateshop.backend.service.impl;

import com.skateshop.backend.dto.BrandDTO;
import com.skateshop.backend.model.Brand;
import com.skateshop.backend.repository.BrandRepository;
import com.skateshop.backend.service.BrandService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BrandServiceImpl implements BrandService {
    @Autowired
    BrandRepository brandRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<BrandDTO> getAllBrands(){
        return brandRepository.findAll().stream().map(
                brand -> modelMapper.map(brand, BrandDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public BrandDTO editBrand(BrandDTO brandToUpdate, long id) {
        if(brandRepository.findById(id).isEmpty()){
            return null;
        }
        Brand brandUpdated = brandRepository.save(modelMapper.map(brandToUpdate, Brand.class));
        return modelMapper.map(brandUpdated, BrandDTO.class);
    }

    @Override
    public BrandDTO createBrand(BrandDTO brandToUpdate){
        Brand newBrand = modelMapper.map(brandToUpdate, Brand.class);
        newBrand.setSlug(newBrand.getName().toLowerCase().replace(' ','-'));
        return modelMapper.map(brandRepository.save(newBrand), BrandDTO.class);
    }

    @Override
    public Brand getBrandByName(String brandName){
        return brandRepository.findByName(brandName);
    }

    @Override
    public BrandDTO getBrandDTOBySlug(String slug){
        if(brandRepository.findBySlug(slug) == null){
            return null;
        }
        return modelMapper.map(brandRepository.findBySlug(slug), BrandDTO.class);
    }

    @Override
    public Brand getBrandBySlug(String slug){
        return brandRepository.findBySlug(slug);
    }

}
