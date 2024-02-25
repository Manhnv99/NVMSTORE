package com.nvm.nvmstore.service.product;

import com.nvm.nvmstore.entity.Product;
import com.nvm.nvmstore.request.product.PostProductRequest;
import com.nvm.nvmstore.response.product.ProductResponse;
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
