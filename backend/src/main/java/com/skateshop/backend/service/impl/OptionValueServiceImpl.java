package com.skateshop.backend.service.impl;

import com.skateshop.backend.model.OptionValue;
import com.skateshop.backend.repository.OptionValueRepository;
import com.skateshop.backend.service.OptionValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OptionValueServiceImpl implements OptionValueService {
    @Autowired
    OptionValueRepository optionValueRepository;

    @Override
    public OptionValue saveOptionValue(OptionValue optionValueToSave){
        return optionValueRepository.save(optionValueToSave);
    }

    @Override
    public Optional<OptionValue> getOptionValueByName(String name){
        return optionValueRepository.findByName(name);
    }

    @Override
    public OptionValue getOptionValueById(long id){
        return optionValueRepository.findById(id).get();
    }



}
