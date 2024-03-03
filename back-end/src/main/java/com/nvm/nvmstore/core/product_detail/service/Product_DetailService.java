package com.nvm.nvmstore.core.product_detail.service;

import com.nvm.nvmstore.core.product_detail.model.request.PostProductDetailRequest;
import com.nvm.nvmstore.core.product_detail.model.request.PutProductDetailRequest;
import com.nvm.nvmstore.core.product_detail.model.response.ProductDetailResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface Product_DetailService {

    Long postProduct_Detail(PostProductDetailRequest postProductDetailRequest);

    void putProduct_Detail(PutProductDetailRequest putProductDetailRequest);

    //ProductDetail

    List<ProductDetailResponse> getAllProductDetail(Pageable pageable);

    Double getTotalPageProductDetail();

    List<ProductDetailResponse> searchProductDetail(Long materialId, Long brandId, Long soleId, Long sizeId, Long colorId, Long categoryId, Long spdId, Long genderId, Pageable pageable);

    Double getTotalPageSearchProductDetail(Long materialId, Long brandId, Long soleId, Long sizeId, Long colorId, Long categoryId, Long spdId, Long genderId);

    //ProductDetail By Product_Id
    List<ProductDetailResponse> getAllProductDetailByProductId(Long product_id, Pageable pageable);

    Double getTotalPageProductDetailByProductId(Long product_id);

    List<ProductDetailResponse> searchProductDetailByProductId(Long product_id, Long materialId, Long brandId, Long soleId, Long sizeId, Long colorId, Long categoryId, Long spdId, Long genderId, Pageable pageable);

    Double getTotalPageSearchProductDetailByProductId(Long product_id,Long materialId, Long brandId, Long soleId, Long sizeId, Long colorId, Long categoryId, Long spdId, Long genderId);
}
