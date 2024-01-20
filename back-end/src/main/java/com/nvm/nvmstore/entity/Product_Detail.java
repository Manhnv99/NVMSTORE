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

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Product product_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Size size_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Color color_id;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Status_ProductDetail status_productDetail_id;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at;

    @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated_at;

}
