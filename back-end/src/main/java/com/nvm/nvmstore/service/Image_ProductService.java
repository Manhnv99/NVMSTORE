package com.nvm.nvmstore.service;

import com.nvm.nvmstore.request.ImageProduct.ImageProductRequest;

import java.io.IOException;


public interface Image_ProductService {

    void addImageProduct(ImageProductRequest imageProductRequest) throws IOException;
}
