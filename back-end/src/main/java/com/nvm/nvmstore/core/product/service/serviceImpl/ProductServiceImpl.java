package com.nvm.nvmstore.core.product.service.serviceImpl;

import com.nvm.nvmstore.core.product.repository.DBProductRepository;
import com.nvm.nvmstore.entity.*;
import com.nvm.nvmstore.repository.ProductRepository;
import com.nvm.nvmstore.core.product.model.request.PostProductRequest;
import com.nvm.nvmstore.core.product.model.response.ProductResponse;
import com.nvm.nvmstore.core.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private DBProductRepository productRepository;

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public String postProduct(PostProductRequest postProductRequest) {
        return "add";
    }


    //Product
    @Override
    public List<ProductResponse> getAllProductPaging(Pageable pageable) {
        return productRepository.getAllProductPaging(pageable);
    }

    @Override
    public Double getTotalPageProduct() {
        return Math.ceil(productRepository.getTotalPageProduct()/3.0);
    }

    @Override
    public List<ProductResponse> searchProduct(String input, Pageable pageable) {
        return productRepository.searchProduct(input,pageable);
    }

    @Override
    public Double getTotalPageSearchProduct(String input) {
        return Math.ceil(productRepository.getTotalPageSearchProduct(input)/3.0);
    }

}
