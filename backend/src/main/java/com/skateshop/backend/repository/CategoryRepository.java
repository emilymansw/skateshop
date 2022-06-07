package com.skateshop.backend.repository;
import com.skateshop.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findBySlug(String slug);
    Category findByName(String name);

}
