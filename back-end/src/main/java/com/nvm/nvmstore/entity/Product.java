package com.nvm.nvmstore.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Brand brand_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Material material_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Sole sole_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Category category_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Gender gender_id;


    private String description;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;



}
