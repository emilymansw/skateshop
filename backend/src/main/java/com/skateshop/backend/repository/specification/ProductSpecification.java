package com.skateshop.backend.repository.specification;

import com.skateshop.backend.model.Product;
import com.skateshop.backend.model.Variant;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class ProductSpecification {
    public static Specification<Product> productBrandEqual(String brandSlug){
        return new Specification<Product>(){
            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.equal(root.get("brand").get("slug"),brandSlug);
            }
        };
    }

    public static Specification<Product> productCategoryEqual(String categorySlug){
        return new Specification<Product>(){
            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.equal(root.get("category").get("slug"),categorySlug);
            }
        };
    }

    public static Specification<Product> productNameLike(String productName){
        return new Specification<Product>(){
            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.like(root.get("name"),"%" + productName + "%");
            }
        };
    }

    public static Specification<Product> brandNameLike(String brandName){
        return new Specification<Product>(){
            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.like(root.get("brand").get("name"),"%" + brandName + "%");
            }
        };
    }

    public static Specification<Product> categoryNameLike(String categoryName){
        return new Specification<Product>(){
            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.like(root.get("category").get("name"),"%" + categoryName + "%");
            }
        };
    }

    public static Specification<Product> isLive(){
        return new Specification<Product>(){
            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.equal(root.get("isLive"), true);
            }
        };
    }


}
