package com.skateshop.backend.service;

import com.skateshop.backend.model.OptionValue;

import java.util.Optional;

public interface OptionValueService {
    OptionValue saveOptionValue(OptionValue optionValueToSave);
    Optional<OptionValue> getOptionValueByName(String name);
    OptionValue getOptionValueById(long id);

}
