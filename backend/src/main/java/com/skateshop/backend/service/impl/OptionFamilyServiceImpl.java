package com.skateshop.backend.service.impl;

import com.skateshop.backend.dto.request.CreateOptionFamilyDTO;
import com.skateshop.backend.dto.response.product.OptionFamilyDTO;
import com.skateshop.backend.model.OptionFamily;
import com.skateshop.backend.model.OptionValue;
import com.skateshop.backend.repository.OptionFamilyRepository;
import com.skateshop.backend.service.OptionFamilyService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OptionFamilyServiceImpl implements OptionFamilyService {
    @Autowired
    OptionFamilyRepository optionFamilyRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public OptionFamily getOptionFamilyByName(String name){
        return optionFamilyRepository.findByName(name);
    }

    @Override
    public List<OptionFamilyDTO> getAllOptionFamily(){
        return optionFamilyRepository.findAll().stream().map(
                        optionFamily -> modelMapper.map(optionFamily, OptionFamilyDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public OptionFamilyDTO saveOptionFamily (CreateOptionFamilyDTO optionFamilyWithOptionValueDTO) {
        OptionFamily optionFamilyToSave = new OptionFamily();
        optionFamilyToSave.setName(optionFamilyWithOptionValueDTO.getName());
        List<OptionValue> optionValuesList = new ArrayList<>();
        optionFamilyWithOptionValueDTO.getOptionValues().forEach(optionValueName -> {
            OptionValue newOptionValue = new OptionValue();
            newOptionValue.setName(optionValueName);
            newOptionValue.setOptionFamily(optionFamilyToSave);
            optionValuesList.add(newOptionValue);
        });
        optionFamilyToSave.setOptionValues(optionValuesList);
        return modelMapper.map(optionFamilyRepository.save(optionFamilyToSave), OptionFamilyDTO.class);
    }


}
