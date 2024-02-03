package com.nvm.nvmstore.service;

import com.nvm.nvmstore.entity.Product;
import com.nvm.nvmstore.request.product.ProductRequest;
import com.nvm.nvmstore.response.product.ProductResponse;
import com.nvm.nvmstore.response.product.productDetail.ProductDetailResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ImageProductResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ProductDetailImageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface ProductService {

    List<Product> getAllProduct();

    String addProduct(ProductRequest productRequest);

    //Product
    List<ProductResponse> getProductResponse(Pageable pageable);

    Double getTotalPageProductResponse();

    List<ProductResponse> searchProductResponse(String input,Pageable pageable);

    Double getTotalPageSearchProductResponse(String input);

    //ProductDetail;

    List<ProductDetailResponse> getProductDetailResponse(Long product_id,Pageable pageable);

    Double getTotalPageProductDetailResponse(Long product_id);

    List<ProductDetailResponse> searchProductDetailResponse(Long product_id, Long materialId, Long brandId, Long soleId, Long sizeId, Long colorId, Long categoryId, Long spdId, Long genderId, Pageable pageable);

    Double getTotalPageSearchProductDetailResponse(Long product_id,Long materialId, Long brandId, Long soleId, Long sizeId, Long colorId, Long categoryId, Long spdId, Long genderId);


    //Product Image
    ProductDetailImageResponse getProductDetailImageResponse(Long product_detail_id);

    List<ImageProductResponse> getImageProductResponse(Long product_detail_id);
}
