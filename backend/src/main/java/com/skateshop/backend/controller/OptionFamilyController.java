package com.skateshop.backend.controller;

import com.skateshop.backend.dto.response.product.OptionFamilyDTO;
import com.skateshop.backend.service.OptionFamilyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OptionFamilyController {
    @Autowired
    OptionFamilyService optionFamilyService;

    @GetMapping("/optionFamilies")
    public List<OptionFamilyDTO> getAllOptions(){
        return optionFamilyService.getAllOptionFamily();
    }

}
