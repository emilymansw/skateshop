package com.skateshop.backend.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Inheritance(strategy=InheritanceType.JOINED)
@DiscriminatorColumn(name="USER_TYPE")
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String email;
    private String firebaseUid;

}
