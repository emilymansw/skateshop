package com.skateshop.backend.repository;

import com.skateshop.backend.model.Brand;
import com.skateshop.backend.model.Category;
import com.skateshop.backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Product findBySlug(String slug);
    Page<Product> findByIsLiveTrue(Pageable pageable);
}
