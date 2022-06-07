package com.skateshop.backend.model;

import lombok.Data;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@Data
@DiscriminatorValue("A")
public class Admin extends User{
    public Admin() {
        super();
    }
}
