package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.request.productdetail.ProductDetailRequest;
import com.nvm.nvmstore.service.Product_DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/product_detail")
public class Product_Detail_Controller {

    @Autowired
    private Product_DetailService product_detailService;

    @PostMapping("/add")
    private ResponseEntity<?> addProductDetail(@RequestBody ProductDetailRequest productDetailRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(product_detailService.addProduct_Detail(productDetailRequest));
    }
}