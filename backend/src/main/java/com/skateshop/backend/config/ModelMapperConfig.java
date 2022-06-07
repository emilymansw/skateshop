package com.skateshop.backend.config;

import com.skateshop.backend.dto.response.product.OptionFamilyDTO;
import com.skateshop.backend.dto.response.product.OptionInfoDTO;
import com.skateshop.backend.dto.response.product.ProductInfoDTO;
import com.skateshop.backend.dto.response.product.VariantInfoDTO;
import com.skateshop.backend.dto.request.CreateImageDTO;
import com.skateshop.backend.model.*;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collection;
import java.util.stream.Collectors;

@Configuration
public class ModelMapperConfig {
    private ModelMapper modelMapper = new ModelMapper();

    @Bean
    public ModelMapper modelMapper() {
        final Converter<Collection<OptionValue>, Collection<String>> optionValueToNameConverter = ctx -> ctx.getSource().stream()
                .map(OptionValue::getName).collect(Collectors.toList());

        final Converter<OptionFamily, String> optionFamilyToNameConverter = ctx -> ctx.getSource().getName();

        final Converter<Collection<Variant>, Collection<VariantInfoDTO>> variantInfoDTOFilter = ctx ->
            ctx.getSource().stream().filter(variant -> variant.isDropped() == false)
                    .map(variant -> modelMapper.map(variant, VariantInfoDTO.class))
                    .collect(Collectors.toList());

        modelMapper.typeMap(Product.class, ProductInfoDTO.class)
                .addMappings(m -> {
                    m.using(variantInfoDTOFilter).map(Product::getVariants, ProductInfoDTO::setVariants);
                });


        modelMapper.typeMap(Option.class, OptionInfoDTO.class)
                .addMappings(m -> {
                    m.using(optionValueToNameConverter).map(Option::getOptionValues, OptionInfoDTO::setOptionValues);
                });

        modelMapper.typeMap(OptionFamily.class, OptionFamilyDTO.class)
                .addMappings(m -> {
                    m.using(optionValueToNameConverter).map(OptionFamily::getOptionValues, OptionFamilyDTO::setOptionValues);
                });

        modelMapper.typeMap(Option.class, OptionInfoDTO.class)
                .addMappings(m -> {
                    m.using(optionFamilyToNameConverter).map(Option::getOptionFamily, OptionInfoDTO::setName);
                });

        modelMapper.typeMap(Variant.class, VariantInfoDTO.class)
                .addMappings(m -> {
                    m.using(optionValueToNameConverter).map(Variant::getOptionValues, VariantInfoDTO::setOptionValues);
                });

        modelMapper.typeMap(CreateImageDTO.class, Image.class)
                .addMappings(mapper -> {
                    mapper.skip(Image::setId);
                });

        return modelMapper;

    }
}

