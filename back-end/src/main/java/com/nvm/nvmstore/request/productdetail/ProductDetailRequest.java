package com.nvm.nvmstore.request.productdetail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProductDetailRequest {

    private Long product_id;

    private String size_name;

    private String color_name;

    private Integer quantity;

    private BigDecimal sell_price;

    private Long status_product_detail_id;
}
