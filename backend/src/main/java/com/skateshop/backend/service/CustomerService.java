package com.skateshop.backend.service;

import com.skateshop.backend.dto.CustomerDTO;
import com.skateshop.backend.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomerService {
    Customer saveCustomer(Customer customer);
    Page<CustomerDTO> getAllCustomer(Pageable pageable);
}
