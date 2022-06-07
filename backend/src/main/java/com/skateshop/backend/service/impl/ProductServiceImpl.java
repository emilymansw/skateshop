package com.skateshop.backend.service.impl;

import com.skateshop.backend.dto.response.product.ProductInfoDTO;
import com.skateshop.backend.dto.request.CreateProductDTO;
import com.skateshop.backend.dto.request.EditProductDTO;
import com.skateshop.backend.model.*;
import com.skateshop.backend.repository.ProductRepository;
import com.skateshop.backend.repository.specification.ProductSpecification;
import com.skateshop.backend.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

import static org.springframework.data.jpa.domain.Specification.where;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    BrandService brandService;
    @Autowired
    CategoryService categoryService;
    @Autowired
    OptionService optionService;
    @Autowired
    OptionValueService optionValueService;
    @Autowired
    OptionFamilyService optionFamilyService;
    @Autowired
    ColorService colorService;
    @Autowired
    ImageService imageService;
    @Autowired
    VariantService variantService;

    @Override
    public Product saveProduct(Product productToSave){
        return productRepository.save(productToSave);
    }

    @Override
    public ProductInfoDTO getProductBySlug(String slug){
        Product product = productRepository.findBySlug(slug);
        if(product == null){
            return null;
        }
        ProductInfoDTO productInfoDTO = modelMapper.map(productRepository.findBySlug(slug), ProductInfoDTO.class);
        return productInfoDTO;
    }

    @Override
    public Page<ProductInfoDTO> getAllLive(Pageable pageable){
        return productRepository.findAll(ProductSpecification.isLive(), pageable)
                .map(product -> modelMapper.map(product, ProductInfoDTO.class));
    }

    @Override
    public Page<ProductInfoDTO> getAll(Pageable pageable){
        return productRepository.findAll(pageable)
                .map(product -> modelMapper.map(product, ProductInfoDTO.class));
    }

    @Override
    public Page<ProductInfoDTO> getAllByBrandSlug(String brandSlug, Pageable pageable){
        Brand brand = brandService.getBrandBySlug(brandSlug);
        if(brand == null){
            return null;
        }
        return productRepository.findAll(ProductSpecification.productBrandEqual(brandSlug).and(ProductSpecification.isLive()), pageable)
                .map(product -> modelMapper.map(product, ProductInfoDTO.class));
    }

    @Override
    public Page<ProductInfoDTO> getAllByCategorySlug(String categorySlug, Pageable pageable){
        Category category = categoryService.getCategoryBySlug(categorySlug);
        if(category == null){
            return null;
        }
        return productRepository.findAll(ProductSpecification.isLive()
                        .and(ProductSpecification.productCategoryEqual(categorySlug)), pageable)
                .map(product -> modelMapper.map(product, ProductInfoDTO.class));
    }

    @Override
    public Page<ProductInfoDTO> getSearchProductResult(String searchParam, Pageable pageable){
        return productRepository.findAll(where(
                        ProductSpecification.productNameLike(searchParam))
                        .or(ProductSpecification.categoryNameLike(searchParam))
                        .or(ProductSpecification.brandNameLike(searchParam))
                        .and(ProductSpecification.isLive()),pageable)
                .map(product -> modelMapper.map(product, ProductInfoDTO.class));
    }

    @Override
    public Product updateStatus(long id){
        Optional<Product> productOptional = productRepository.findById(id);
        if(productOptional.isEmpty()){
            return null;
        } else {
            Product product = productOptional.get();
            product.setLive(!product.isLive());
            productRepository.save(product);
            return product;
        }
    }

    @Override
    public Product createProduct(CreateProductDTO createProductDTO){
        Product product = modelMapper.map(createProductDTO, Product.class);
        product.setBrand(brandService.getBrandByName(createProductDTO.getBrandName()));
        product.setCategory(categoryService.getCategoryByName(createProductDTO.getCategoryName()));
        List<Image> images = new ArrayList<>();
        createProductDTO.getImages().forEach(imageDTO -> {
            Image image = imageService.getImageByCloudinaryId(imageDTO.getCloudinaryId()).orElseGet(()->{
                Image newImage = new Image();
                newImage.setImageUrl(imageDTO.getImageUrl());
                newImage.setCloudinaryId(imageDTO.getCloudinaryId());
                newImage.setName(product.getName());
                newImage.setProduct(product);
                return newImage;
            });
            images.add(image);
        });
        product.setImages(images);
        product.setSlug(createProductDTO.getName().toLowerCase().replace(' ','-'));

        List<Option> options = new ArrayList<>();
        Boolean hasVariants = false;
        if(createProductDTO.getOptions().get(0).getOptionFamily().equals("default")){
            options.add(optionService.getOptionById(1L)); //set to default
        } else {
            hasVariants = true;
            createProductDTO.getOptions().forEach(
                    optionDTO-> {
                        List<OptionValue> optionValuesInOption = new ArrayList<>();
                        Option option = new Option();
                        option.setOptionFamily(optionFamilyService.getOptionFamilyByName(optionDTO.getOptionFamily()));
                        optionDTO.getOptionValues().forEach(value->{
                            OptionValue optionValue = optionValueService.getOptionValueByName(value).orElseGet(()->{
                                OptionValue newOptionValue = new OptionValue();
                                newOptionValue.setName(value);
                                newOptionValue.setOptionFamily(optionFamilyService.getOptionFamilyByName(optionDTO.getOptionFamily()));
                                return optionValueService.saveOptionValue(newOptionValue);
                            });
                            optionValuesInOption.add(optionValue);
                        });
                        option.setOptionValues(optionValuesInOption);
                        options.add(option);
                    });
        }
        product.setOptions(options);
        List<Variant> variants = new ArrayList<>();
        Boolean finalHasVariants = hasVariants;
        Product oldProduct = productRepository.findBySlug(createProductDTO.getName().toLowerCase().replace(' ','-'));
        if(oldProduct != null){
            oldProduct.getVariants().forEach(variant -> variant.setProduct(null));
        }
        createProductDTO.getVariants().forEach(variantInfoDTO -> {
            Variant variant;
            if(variantInfoDTO.getId()!=0){
                variant = variantService.getVariantEntity(variantInfoDTO.getId());
            } else {
                variant = new Variant();
            }
            variant.setProduct(product);
            variant.setPrice(variantInfoDTO.getPrice());
            variant.setStock(variantInfoDTO.getStock());
            variant.setCompareAtPrice(variantInfoDTO.getCompareAtPrice());
            variant.setWeight(variantInfoDTO.getWeight());
            Optional<Color> colorOptional = colorService.getColorByName(variantInfoDTO.getColorName());
            if(colorOptional.isPresent()) {
                Color color = colorOptional.get();
                List<Variant> variantsToUpdate = color.getVariants();
                variantsToUpdate.add(variant);
                color.setVariants(variantsToUpdate);
                variant.setColor(color);
            } else {
                Color newColor = new Color();
                newColor.setName(variantInfoDTO.getColorName());
                List<Variant> variantsToUpdate = new ArrayList<>();
                variantsToUpdate.add(variant);
                newColor.setVariants(variantsToUpdate);
                colorService.saveColor(newColor);
                variant.setColor(newColor);
            }
            List<OptionValue> variantOptionValues = new ArrayList<>();
            if(finalHasVariants) {
                variantInfoDTO.getOptionValues().forEach(name -> {
                            variantOptionValues.add(optionValueService.getOptionValueByName(name).get());
                        }
                );
            } else {
                variantOptionValues.add(optionValueService.getOptionValueById(1L)); //set to default
            }
            variant.setOptionValues(variantOptionValues);
            variants.add(variant);
        });
        product.setVariants(variants);
        return product;
    }

    @Override
    public Product editProduct(EditProductDTO editProductDTO){
        Optional<Product> productOptional = productRepository.findById(editProductDTO.getId());
        if(productOptional.isEmpty()){
            return null;
        }
        Product oldProductRecord = productOptional.get();
        Product product = modelMapper.map(editProductDTO, Product.class);
        product.setBrand(brandService.getBrandByName(editProductDTO.getBrandName()));
        product.setCategory(categoryService.getCategoryByName(editProductDTO.getCategoryName()));
        product.setLive(oldProductRecord.isLive());
        List<Image> images = new ArrayList<>();
        oldProductRecord.getImages().forEach(image -> image.setProduct(null));
        editProductDTO.getImages().forEach(imageDTO -> {
            Image image = imageService.getImageByCloudinaryId(imageDTO.getCloudinaryId()).orElseGet(()->{
                Image newImage = new Image();
                newImage.setImageUrl(imageDTO.getImageUrl());
                newImage.setCloudinaryId(imageDTO.getCloudinaryId());
                newImage.setName(product.getName());
                return newImage;
            });
            image.setProduct(product);
            images.add(image);
        });
        product.setImages(images);
        product.setSlug(editProductDTO.getName().toLowerCase().replace(' ','-'));

        List<Option> options = new ArrayList<>();
        Boolean hasVariants = false;
        if(editProductDTO.getOptions().get(0).getOptionFamily().equals("default")){
            options.add(optionService.getOptionById(1L)); //set to default
        } else {
            hasVariants = true;
            editProductDTO.getOptions().forEach(
                    optionDTO-> {
                        List<OptionValue> optionValuesInOption = new ArrayList<>();
                        Option option = new Option();
                        option.setOptionFamily(optionFamilyService.getOptionFamilyByName(optionDTO.getOptionFamily()));
                        optionDTO.getOptionValues().forEach(value->{
                            OptionValue optionValue = optionValueService.getOptionValueByName(value).orElseGet(()->{
                                OptionValue newOptionValue = new OptionValue();
                                newOptionValue.setName(value);
                                newOptionValue.setOptionFamily(optionFamilyService.getOptionFamilyByName(optionDTO.getOptionFamily()));
                                return optionValueService.saveOptionValue(newOptionValue);
                            });
                            optionValuesInOption.add(optionValue);
                        });
                        option.setOptionValues(optionValuesInOption);
                        options.add(option);
                    });
        }
        product.setOptions(options);
        List<Variant> variants = new ArrayList<>();
        Boolean finalHasVariants = hasVariants;
        oldProductRecord.getVariants().forEach(variant -> variant.setDropped(true));
        editProductDTO.getVariants().forEach(variantInfoDTO -> {
            Variant variant;
            if(variantInfoDTO.getId()!=0){
                variant = variantService.getVariantEntity(variantInfoDTO.getId());
            } else {
                variant = new Variant();
            }
            variant.setProduct(product);
            variant.setDropped(false);
            variant.setPrice(variantInfoDTO.getPrice());
            variant.setStock(variantInfoDTO.getStock());
            variant.setCompareAtPrice(variantInfoDTO.getCompareAtPrice());
            variant.setWeight(variantInfoDTO.getWeight());
            Optional<Color> colorOptional = colorService.getColorByName(variantInfoDTO.getColorName());
            if(colorOptional.isPresent()) {
                Color color = colorOptional.get();
                List<Variant> variantsToUpdate = color.getVariants();
                variantsToUpdate.add(variant);
                color.setVariants(variantsToUpdate);
                variant.setColor(color);
            } else {
                Color newColor = new Color();
                newColor.setName(variantInfoDTO.getColorName());
                List<Variant> variantsToUpdate = new ArrayList<>();
                variantsToUpdate.add(variant);
                newColor.setVariants(variantsToUpdate);
                colorService.saveColor(newColor);
                variant.setColor(newColor);
            }
            List<OptionValue> variantOptionValues = new ArrayList<>();
            if(finalHasVariants) {
                variantInfoDTO.getOptionValues().forEach(name -> {
                            variantOptionValues.add(optionValueService.getOptionValueByName(name).get());
                        }
                );
            } else {
                variantOptionValues.add(optionValueService.getOptionValueById(1L)); //set to default
            }
            variant.setOptionValues(variantOptionValues);
            variants.add(variant);
        });
        product.setVariants(variants);
        product.setId(editProductDTO.getId());
        Product productUpdated= saveProduct(product);
        return productUpdated;
    }


}

