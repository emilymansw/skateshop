package com.skateshop.backend.controller;

import com.skateshop.backend.dto.BrandDTO;
import com.skateshop.backend.dto.CustomerDTO;
import com.skateshop.backend.dto.request.CreateOptionFamilyDTO;
import com.skateshop.backend.dto.response.order.OrderRecordDTO;
import com.skateshop.backend.dto.response.order.OrderRecordDetailDTO;
import com.skateshop.backend.dto.response.product.OptionFamilyDTO;
import com.skateshop.backend.dto.response.product.ProductInfoDTO;
import com.skateshop.backend.dto.request.CreateProductDTO;
import com.skateshop.backend.dto.request.EditProductDTO;
import com.skateshop.backend.model.Product;
import com.skateshop.backend.model.reporting.DailyRevenueStatistics;
import com.skateshop.backend.model.reporting.HourlyRevenueStatistics;
import com.skateshop.backend.model.reporting.MonthlyRevenueStatistics;
import com.skateshop.backend.model.reporting.TodayOrderHighlight;
import com.skateshop.backend.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@RestController
public class AdminController {
    @Autowired
    ProductService productService;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    OrderService orderService;
    @Autowired
    BrandService brandService;
    @Autowired
    CustomerService customerService;
    @Autowired
    OptionFamilyService optionFamilyService;

    private final int SIZE = 8;

    @PostMapping("/admin/product")
    public ProductInfoDTO createProduct(@RequestBody CreateProductDTO createProductDTO , Principal principal){
        Product productCreated = productService.saveProduct(productService.createProduct(createProductDTO));
        return modelMapper.map(productCreated, ProductInfoDTO.class);
    }

    @GetMapping("/admin/products")
    public Page<ProductInfoDTO> getAllProductsPage(@RequestParam(value = "page", defaultValue = "1") Integer page){
        PageRequest request = PageRequest.of(page - 1, SIZE);
        return productService.getAll(request);
    }

    @PutMapping("/admin/product/{slug}")
    public ProductInfoDTO editProduct(@RequestBody EditProductDTO editProductDTO, Principal principal){
        Product productUpdated = productService.editProduct(editProductDTO);
        if (productUpdated != null){
            return modelMapper.map(productUpdated, ProductInfoDTO.class);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/admin/thisYearRevenue")
    public List<MonthlyRevenueStatistics> getMonthlyRevenue(Principal principal)  {
        return orderService.getMonthlyRevenue();
    }

    @GetMapping("/admin/todayRevenue")
    public List<HourlyRevenueStatistics> getHourlyRevenue(Principal principal)  {
        return orderService.getHourlyRevenue();
    }

    @GetMapping("/admin/thisMonthRevenue")
    public List<DailyRevenueStatistics> getDailyRevenue(Principal principal)  {
        return orderService.getDailyRevenue();
    }


    @GetMapping("/admin/todayHighlight")
    public TodayOrderHighlight getTodayHighlights(Principal principal)  {
        return orderService.getTodayHighlight();
    }

    @PutMapping("/admin/order/{id}")
    public OrderRecordDetailDTO updateOrder(Principal principal, @PathVariable("id") Long id, @RequestBody OrderRecordDetailDTO orderToBeUpdated) {
        OrderRecordDetailDTO orderRecordDetailDTO = orderService.editOrder(orderToBeUpdated, id);
        if(orderRecordDetailDTO != null){
            return orderRecordDetailDTO;
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/admin/brand/{id}")
    public BrandDTO editBrand(@PathVariable long id, @RequestBody BrandDTO brandToUpdate){
        BrandDTO brandDTO = brandService.editBrand(brandToUpdate, id);
        if(brandDTO != null){
            return brandDTO;
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/admin/brand")
    public BrandDTO createBrand(@RequestBody BrandDTO brandToUpdate){
       return brandService.createBrand(brandToUpdate);
    }

    @GetMapping("/admin/customers")
    public Page<CustomerDTO> getAllCustomer(Principal principal, @RequestParam(value = "page", defaultValue = "1") Integer page){
        PageRequest request = PageRequest.of(page - 1, SIZE);
        return customerService.getAllCustomer(request);
    }

    @PostMapping("/admin/optionFamilies")
    public OptionFamilyDTO createNewOption(@RequestBody CreateOptionFamilyDTO optionFamilyToAdd){
        return optionFamilyService.saveOptionFamily(optionFamilyToAdd);
    }

    @GetMapping("/admin/orders")
    public Page<OrderRecordDTO> getAllOrders(Principal principal, @RequestParam(value = "page", defaultValue = "1") Integer page) {
        PageRequest request = PageRequest.of(page - 1, SIZE);
        return orderService.getAllOrders(request);
    }

    @PatchMapping("/admin/product/{id}")
    public ProductInfoDTO updateProductStatus(@PathVariable("id") Long id, Principal principal){
        Product product = productService.updateStatus(id);
        if(product != null){
            return modelMapper.map(product, ProductInfoDTO.class);
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

}
