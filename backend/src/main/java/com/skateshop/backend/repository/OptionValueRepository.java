package com.skateshop.backend.repository;

import com.skateshop.backend.model.Option;
import com.skateshop.backend.model.OptionValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OptionValueRepository extends JpaRepository<OptionValue, Long> {
    Optional<OptionValue> findByName(String name);
}
