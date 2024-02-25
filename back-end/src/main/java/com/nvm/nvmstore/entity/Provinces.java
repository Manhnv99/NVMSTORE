package com.nvm.nvmstore.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name = "provinces")
public class Provinces {

    @Id
    private String code;

    private String name;

    private String name_en;

    private String full_name;

    private String full_name_en;

    private String code_name;

    private Long administrative_unit_id;

    private Long administrative_region_id;
}
