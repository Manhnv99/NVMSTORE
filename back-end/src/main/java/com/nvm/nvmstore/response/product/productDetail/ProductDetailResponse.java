package com.nvm.nvmstore.response.product.productDetail;


import java.math.BigDecimal;


public interface ProductDetailResponse {

    Long getProduct_detail_id();

    String getProduct_name();

    String getProduct_detail_gender();

    Integer getProduct_detail_quantity();

    BigDecimal getProduct_detail_sell_price();

    String getProduct_detail_size_name();

    String getProduct_detail_color_code();

    String getProduct_detail_status();
}
