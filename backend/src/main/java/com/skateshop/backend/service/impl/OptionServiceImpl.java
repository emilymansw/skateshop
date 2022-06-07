package com.skateshop.backend.service.impl;

import com.skateshop.backend.model.Option;
import com.skateshop.backend.repository.OptionRepository;
import com.skateshop.backend.service.OptionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OptionServiceImpl implements OptionService {
    @Autowired
    OptionRepository optionRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public Option getOptionById(Long id){
        return optionRepository.findById(id).get();
    }

}
