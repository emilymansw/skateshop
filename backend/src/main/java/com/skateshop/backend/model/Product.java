package com.skateshop.backend.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;
    @ManyToOne
    @JoinColumn(name ="category_id")
    private Category category;

    @OneToMany(mappedBy = "product")
    @Cascade({ org.hibernate.annotations.CascadeType.SAVE_UPDATE, org.hibernate.annotations.CascadeType.MERGE, org.hibernate.annotations.CascadeType.PERSIST})
    private List<Variant> variants = new ArrayList<>();

    @ManyToMany
    @Cascade({ org.hibernate.annotations.CascadeType.SAVE_UPDATE, org.hibernate.annotations.CascadeType.MERGE, org.hibernate.annotations.CascadeType.PERSIST})
    @JoinTable(
           name="Product_Option",
           joinColumns = @JoinColumn(name= "product_id"),
           inverseJoinColumns = @JoinColumn(name = "option_id")
    )

    @Column(name = "\"Option\"")
    private Collection<Option> options;
    private String description;
    private boolean isLive;
    private String slug;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    private List<Image> images;

}
