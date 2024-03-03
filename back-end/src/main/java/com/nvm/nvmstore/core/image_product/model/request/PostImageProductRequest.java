package com.nvm.nvmstore.core.image_product.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class PostImageProductRequest {
    private Long product_detail_id;
    private String image_id;
    private String image_url;
}
