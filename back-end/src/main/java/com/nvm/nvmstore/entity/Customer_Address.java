package com.nvm.nvmstore.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
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

    private String name;

    private String phone;

    private String address_province_code;

    private String address_district_code;

    private String address_ward_code;

    private String address_detail;

    private Boolean address_default;
}
