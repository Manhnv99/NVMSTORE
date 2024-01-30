package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.request.product.ProductRequest;
import com.nvm.nvmstore.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody @Valid ProductRequest productRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.addProduct(productRequest));
    }

    @GetMapping("/productResponse")
    public ResponseEntity<?> getProductResponse(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductResponse());
    }

    @GetMapping("/productDetailResponse/{product_id}")
    public ResponseEntity<?> getProductDetailResponse(@PathVariable Long product_id){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductDetailResponse(product_id));
    }

    @GetMapping("/productDetailImageResponse/{product_detail_id}")
    public ResponseEntity<?> getProductImageDetailResponse(@PathVariable Long product_detail_id){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductDetailImageResponse(product_detail_id));
    }

    @GetMapping("/imageProductResponse/{product_detail_id}")
    public ResponseEntity<?> getImageProductResponse(@PathVariable Long product_detail_id){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getImageProductResponse(product_detail_id));
    }
}
