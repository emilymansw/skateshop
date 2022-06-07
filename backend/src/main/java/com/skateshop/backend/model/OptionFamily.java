package com.skateshop.backend.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Collection;
@Entity
@Data
public class OptionFamily {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;

    @Column(name = "\"Option\"")
    @OneToMany(mappedBy = "optionFamily", cascade = CascadeType.ALL)
    private Collection<Option> options;

    @OneToMany(mappedBy = "optionFamily", cascade = CascadeType.ALL)
    private Collection<OptionValue> optionValues;
}
