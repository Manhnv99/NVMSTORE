package com.nvm.nvmstore.response.product.productDetailImage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

public interface ProductDetailImageResponse {

    Long getProduct_id();

    Long getProduct_detail_id();

    String getProduct_name();

    String getProduct_description();

    Integer getProduct_detail_quantity();

    Long getProduct_detail_brand_id();

    Long getProduct_detail_material_id();

    Long getProduct_detail_gender_id();

    Long getProduct_detail_sole_id();

    Long getProduct_detail_category_id();

    BigDecimal getProduct_detail_sell_price();

    Long getProduct_detail_size_id();

    Long getProduct_detail_color_id();

    Long getProduct_detail_status_id();
}
