package com.nvm.nvmstore.entity;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Customer_Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id",referencedColumnName = "id")
    private Customer customer_id;

    private String address_provinces;

    private String address_districts;

    private String address_wards;

    private String address_detail;

    private Boolean address_default;
}
