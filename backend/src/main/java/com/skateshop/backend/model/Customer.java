package com.skateshop.backend.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Data
@DiscriminatorValue("C")
public class Customer extends User{
    public Customer() {
        super();
    }

    @ToString.Exclude
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Collection<OrderRecord> orderRecords;

}
