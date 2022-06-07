package com.skateshop.backend.repository;

import com.skateshop.backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findFirstByFirebaseUid(String firebaseUid);

}
