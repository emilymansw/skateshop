package com.skateshop.backend.repository;

import com.skateshop.backend.model.OptionFamily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionFamilyRepository extends JpaRepository<OptionFamily, Long> {
    OptionFamily findByName(String name);
}
