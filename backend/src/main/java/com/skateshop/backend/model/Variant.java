package com.skateshop.backend.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Entity
public class Variant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToMany
    @JoinTable(
            name = "Variant_OptionValue",
            joinColumns = @JoinColumn(name = "variant_id", referencedColumnName="id"),
            inverseJoinColumns = @JoinColumn(name= "optionValue_id", referencedColumnName="id")
    )
    private Collection<OptionValue> optionValues;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "variant")
    private List<OrderItem> orderItems = new ArrayList<>();


    private long stock;
    private float weight;
    private float price;
    private float compareAtPrice;

    @Column(columnDefinition = "boolean default false")
    private boolean isDropped;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "color_id")
    private Color color;
}
