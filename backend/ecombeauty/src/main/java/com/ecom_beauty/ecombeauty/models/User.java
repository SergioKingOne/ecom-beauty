package com.ecom_beauty.ecombeauty.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import lombok.Data;

@Data
@Entity
public class User
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer id;

    @Column
    private String name;

    @Column(name = "last_name")
    private String lastName;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    @Column
    private String password;

    @Column(name = "identification")
    private String identification;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Role role;
    
    public enum Role {
        ROLE_USER,
        ROLE_ADMIN
    }
}