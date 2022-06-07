package com.skateshop.backend.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;

import javax.persistence.*;
import java.util.Collection;

@Data
@Entity
@Table(name = "\"Option\"")
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToMany
    @JoinTable(
            name = "Option_OptionValue",
            joinColumns = @JoinColumn(name = "option_id", referencedColumnName="id"),
            inverseJoinColumns = @JoinColumn(name= "optionValue_id", referencedColumnName="id")
    )
    private Collection<OptionValue> optionValues;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToMany(mappedBy = "options")
    private Collection<Product> products;

    @ManyToOne
    @JoinColumn(name="optionFamily_id")
    private OptionFamily optionFamily;
}
