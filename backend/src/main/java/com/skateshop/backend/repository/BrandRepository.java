package com.skateshop.backend.repository;

import com.skateshop.backend.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand,Long> {
    Brand findByName(String name);
    Brand findBySlug(String slug);

}
