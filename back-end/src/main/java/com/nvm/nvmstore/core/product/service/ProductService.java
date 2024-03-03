package com.nvm.nvmstore.core.product.service;

import com.nvm.nvmstore.entity.Product;
import com.nvm.nvmstore.core.product.model.request.PostProductRequest;
import com.nvm.nvmstore.core.product.model.response.ProductResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface ProductService {

    List<Product> getAllProduct();

    String postProduct(PostProductRequest postProductRequest);

    //Product
    List<ProductResponse> getAllProductPaging(Pageable pageable);

    Double getTotalPageProduct();

    List<ProductResponse> searchProduct(String input,Pageable pageable);

    Double getTotalPageSearchProduct(String input);


}
