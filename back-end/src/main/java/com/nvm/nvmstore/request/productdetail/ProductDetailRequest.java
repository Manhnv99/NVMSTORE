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

    private String name;

    private String description;

    private Long brand_id;

    private Long material_id;

    private Long gender_id;

    private Long sole_id;

    private Long category_id;

    private Long status_product_detail_id;

    private String size_name;

    private String color_name;

    private Integer quantity;

    private BigDecimal sell_price;

}
