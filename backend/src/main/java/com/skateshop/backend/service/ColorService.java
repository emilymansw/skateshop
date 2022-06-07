package com.skateshop.backend.service;

import com.skateshop.backend.model.Color;

import java.util.Optional;

public interface ColorService {
    Optional<Color> getColorByName(String name);
    Color saveColor (Color color);
}
