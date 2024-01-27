package com.nvm.nvmstore.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Order_Detail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantity;

    private BigDecimal grand_total;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private Order order_id;

    @ManyToOne
    @JoinColumn(name = "product_detail_id",referencedColumnName = "id")
    private Product_Detail product_detail_id;

}
