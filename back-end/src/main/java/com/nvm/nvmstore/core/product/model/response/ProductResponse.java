package com.nvm.nvmstore.core.product.model.response;


public interface ProductResponse {

    Long getProduct_id();

    String getProduct_code();

    String getProduct_name();

    Boolean getProduct_status();

    Integer getSum_quantity();
}
