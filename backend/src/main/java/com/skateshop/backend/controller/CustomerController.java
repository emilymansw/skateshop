package com.skateshop.backend.controller;

import com.skateshop.backend.dto.CustomerDTO;
import com.skateshop.backend.dto.response.order.OrderRecordDetailDTO;
import com.skateshop.backend.model.Customer;
import com.skateshop.backend.model.User;
import com.skateshop.backend.service.OrderService;
import com.skateshop.backend.util.CurrentUserUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@RestController
public class CustomerController {
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    OrderService orderService;

    @GetMapping("/customer")
    public CustomerDTO getCustomer(Principal principal){
        User user = CurrentUserUtil.getUser(principal);
        if (user instanceof Customer) {
            return modelMapper.map(user, CustomerDTO.class);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }


    @CrossOrigin
    @GetMapping("/customer/order/{id}")
    public OrderRecordDetailDTO getOrder(@PathVariable long id, Principal principal){
        User user = CurrentUserUtil.getUser(principal);
        if (user instanceof Customer) {
            return modelMapper.map(orderService.getCustomerOrder(id, (Customer) user), OrderRecordDetailDTO.class);
        }
        return null;
    }
}
