package com.nvm.nvmstore.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Id;

@Entity(name = "districts")
public class Districts {
    @Id
    private String code;

    private String name;

    private String name_en;

    private String full_name;

    private String full_name_en;

    private String code_name;

    @ManyToOne
    @JoinColumn(name = "province_code",referencedColumnName = "code")
    private Provinces provinces;

    private Long administrative_unit_id;
}
