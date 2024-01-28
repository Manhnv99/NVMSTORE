package com.nvm.nvmstore.request.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ProductRequest {

    private String code;
    private String name;
    private String description;
    private Long brand_id;
    private Long material_id;
    private Long category_id;
    private Long gender_id;
    private Long sole_id;
}
