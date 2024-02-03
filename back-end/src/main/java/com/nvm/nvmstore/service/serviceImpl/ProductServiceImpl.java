package com.nvm.nvmstore.service.serviceImpl;

import com.nvm.nvmstore.entity.*;
import com.nvm.nvmstore.repository.*;
import com.nvm.nvmstore.request.product.ProductRequest;
import com.nvm.nvmstore.response.product.ProductResponse;
import com.nvm.nvmstore.response.product.productDetail.ProductDetailResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ImageProductResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ProductDetailImageResponse;
import com.nvm.nvmstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public String addProduct(ProductRequest productRequest) {
        return "add";
    }


    //Product
    @Override
    public List<ProductResponse> getProductResponse(Pageable pageable) {
        return productRepository.getProductResponse(pageable);
    }

    @Override
    public Double getTotalPageProductResponse() {
        return Math.ceil(productRepository.getTotalPageProductResponse()/3.0);
    }

    @Override
    public List<ProductResponse> searchProductResponse(String input, Pageable pageable) {
        return productRepository.searchProductResponse(input,pageable);
    }

    @Override
    public Double getTotalPageSearchProductResponse(String input) {
        return Math.ceil(productRepository.getTotalPageSearchProductResponse(input)/3.0);
    }

    //Product Detail
    @Override
    public List<ProductDetailResponse> getProductDetailResponse(Long product_id,Pageable pageable) {
        return productRepository.getProductDetailResponse(product_id,pageable);
    }

    @Override
    public Double getTotalPageProductDetailResponse(Long product_id) {
        return Math.ceil(productRepository.getTotalPageProductDetailResponse(product_id)/3.0);
    }

    @Override
    public List<ProductDetailResponse> searchProductDetailResponse(Long product_id, Long materialId, Long brandId, Long soleId, Long sizeId, Long colorId, Long categoryId, Long spdId, Long genderId, Pageable pageable) {
        return productRepository.searchProductDetailResponse(product_id, materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId, pageable);
    }

    @Override
    public Double getTotalPageSearchProductDetailResponse(Long product_id,Long materialId, Long brandId, Long soleId, Long sizeId, Long colorId, Long categoryId, Long spdId, Long genderId) {
        return Math.ceil(productRepository.getTotalPageSearchProductDetailResponse(product_id,materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId)/3.0);
    }

    //Product Image Detail
    @Override
    public ProductDetailImageResponse getProductDetailImageResponse(Long product_detail_id) {
        return productRepository.getProductDetailImageResponse(product_detail_id);
    }

    @Override
    public List<ImageProductResponse> getImageProductResponse(Long product_detail_id) {
        return productRepository.getImageProductResponse(product_detail_id);
    }
}
