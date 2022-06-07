package com.skateshop.backend.service.impl;

import com.skateshop.backend.dto.response.product.VariantInfoDTO;
import com.skateshop.backend.model.Variant;
import com.skateshop.backend.repository.VariantRepository;
import com.skateshop.backend.service.VariantService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VariantServiceImpl implements VariantService {
    @Autowired
    VariantRepository variantRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public VariantInfoDTO getVariantDTO(long id){
        Variant variant = variantRepository.getById(id);
        return modelMapper.map(variant, VariantInfoDTO.class);
    }

    @Override
    public Variant save(Variant variant){
        return variantRepository.save(variant);
    }

    @Override
    public Variant getVariant(long id){
        return variantRepository.getById(id);
    }

    @Override
    public Variant getVariantEntity(long id){
        return variantRepository.getById(id);
    }

}
