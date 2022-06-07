package com.skateshop.backend.service.impl;

import com.skateshop.backend.model.Color;
import com.skateshop.backend.repository.ColorRepository;
import com.skateshop.backend.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ColorServiceImpl implements ColorService {
    @Autowired
    ColorRepository colorRepository;

    @Override
    public Optional<Color> getColorByName(String name){
        return colorRepository.findByName(name);
    }
    @Override
    public Color saveColor (Color color){
        return colorRepository.save(color);
    }
}
