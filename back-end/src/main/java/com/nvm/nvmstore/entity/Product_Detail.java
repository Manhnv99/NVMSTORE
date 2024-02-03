package com.nvm.nvmstore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Product_Detail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal sell_price;

    private Integer quantity;

    private String description;

    @ManyToOne
    @JoinColumn(name = "product_id",referencedColumnName = "id")
    private Product product_id;

    @ManyToOne
    @JoinColumn(name = "brand_id",referencedColumnName = "id")
    private Brand brand_id;

    @ManyToOne
    @JoinColumn(name = "material_id",referencedColumnName = "id")
    private Material material_id;

    @ManyToOne
    @JoinColumn(name = "sole_id",referencedColumnName = "id")
    private Sole sole_id;

    @ManyToOne
    @JoinColumn(name="category_id",referencedColumnName = "id")
    private Category category_id;

    @ManyToOne
    @JoinColumn(name="gender_id",referencedColumnName = "id")
    private Gender gender_id;

    @ManyToOne
    @JoinColumn(name = "size_id",referencedColumnName = "id")
    private Size size_id;

    @ManyToOne
    @JoinColumn(name="color_id",referencedColumnName = "id")
    private Color color_id;

    @ManyToOne
    @JoinColumn(name = "status_product_detail",referencedColumnName = "id")
    private Status_ProductDetail status_productDetail_id;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;

}
