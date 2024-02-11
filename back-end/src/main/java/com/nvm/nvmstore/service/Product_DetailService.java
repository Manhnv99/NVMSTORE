package com.nvm.nvmstore.service;

import com.nvm.nvmstore.request.productdetail.ProductDetailRequest;
import com.nvm.nvmstore.request.productdetail.UpdateProductDetailRequest;

public interface Product_DetailService {

    Long addProduct_Detail(ProductDetailRequest productDetailRequest);

    void updateProduct_Detail(UpdateProductDetailRequest updateProductDetailRequest);
}
