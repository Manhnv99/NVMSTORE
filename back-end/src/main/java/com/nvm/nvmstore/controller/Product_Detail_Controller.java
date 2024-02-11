package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.request.productdetail.ProductDetailRequest;
import com.nvm.nvmstore.request.productdetail.UpdateProductDetailRequest;
import com.nvm.nvmstore.service.Product_DetailService;
import jakarta.validation.Valid;
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

    @PutMapping("/update")
    private ResponseEntity<?> updateProductDetail(@RequestBody @Valid UpdateProductDetailRequest updateProductDetailRequest){
        product_detailService.updateProduct_Detail(updateProductDetailRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
