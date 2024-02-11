package com.nvm.nvmstore.service;

import com.nvm.nvmstore.request.ImageProduct.ImageProductRequest;

import java.io.IOException;


public interface Image_ProductService {

    void addImageProduct(ImageProductRequest imageProductRequest) throws IOException;

    void removeImageProduct(Long image_product_id,String image_id) throws IOException;
}
