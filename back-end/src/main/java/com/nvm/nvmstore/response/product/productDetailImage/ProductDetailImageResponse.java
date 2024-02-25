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

    String getProduct_detail_brand_name();

    String getProduct_detail_material_name();

    String getProduct_detail_gender_name();

    String getProduct_detail_sole_name();

    String getProduct_detail_category_name();

    BigDecimal getProduct_detail_sell_price();

    String getProduct_detail_size_name();

    String getProduct_detail_color_name();

    String getProduct_detail_color_code();

    String getProduct_detail_status_name();
}
