package com.skateshop.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne
    @JoinColumn(name = "orderRecord_id")
    private OrderRecord orderRecord;

    @ManyToOne
    @JoinColumn(name = "variant_id")
    private Variant variant;
    private long quantity;
    private float price;



}
