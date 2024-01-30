package com.nvm.nvmstore.service;

import com.nvm.nvmstore.request.product.ProductRequest;
import com.nvm.nvmstore.response.product.ProductResponse;
import com.nvm.nvmstore.response.product.productDetail.ProductDetailResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ImageProductResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ProductDetailImageResponse;

import java.util.List;

public interface ProductService {

    Long addProduct(ProductRequest productRequest);

    List<ProductResponse> getProductResponse();

    List<ProductDetailResponse> getProductDetailResponse(Long product_id);

    ProductDetailImageResponse getProductDetailImageResponse(Long product_detail_id);

    List<ImageProductResponse> getImageProductResponse(Long product_detail_id);
}
