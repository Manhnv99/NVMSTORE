package com.nvm.nvmstore.core.image_product.service;

import com.nvm.nvmstore.core.image_product.model.request.PostImageProductRequest;
import com.nvm.nvmstore.core.image_product.model.response.ImageProductResponse;
import com.nvm.nvmstore.core.image_product.model.response.ProductDetailImageResponse;

import java.io.IOException;
import java.util.List;


public interface Image_ProductService {

    void postImageProduct(PostImageProductRequest postImageProductRequest) throws IOException;

    void deleteImageProduct(Long image_product_id,String image_id) throws IOException;

    //Product Image
    ProductDetailImageResponse getReferenceProduct_ProductDetail(Long product_detail_id);

    List<ImageProductResponse> getAllImageProductById(Long product_detail_id);

    List<ImageProductResponse> getAllImageProduct();
}
