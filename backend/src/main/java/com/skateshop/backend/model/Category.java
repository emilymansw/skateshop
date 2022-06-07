package com.skateshop.backend.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String slug;

    @OneToMany(mappedBy = "category")
    private Collection<Product> products = new ArrayList<>();
}
