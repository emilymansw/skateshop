package com.skateshop.backend.service.impl;

import com.skateshop.backend.dto.CustomerDTO;
import com.skateshop.backend.model.Customer;
import com.skateshop.backend.repository.CustomerRepository;
import com.skateshop.backend.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public Customer saveCustomer(Customer customer){
        return customerRepository.save(customer);
    }
    @Override
    public Page<CustomerDTO> getAllCustomer(Pageable pageable){
        return customerRepository.findAll(pageable).map(customer -> modelMapper.map(customer, CustomerDTO.class));
    }

}
