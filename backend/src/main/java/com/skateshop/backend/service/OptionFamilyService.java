package com.skateshop.backend.service;

import com.skateshop.backend.dto.request.CreateOptionFamilyDTO;
import com.skateshop.backend.dto.response.product.OptionFamilyDTO;
import com.skateshop.backend.model.OptionFamily;
import java.util.List;

public interface OptionFamilyService {
    OptionFamily getOptionFamilyByName(String name);
    List<OptionFamilyDTO> getAllOptionFamily();
    OptionFamilyDTO saveOptionFamily (CreateOptionFamilyDTO optionFamilyWithOptionValueDTO);
}
