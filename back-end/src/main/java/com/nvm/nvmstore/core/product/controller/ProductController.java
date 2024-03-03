package com.nvm.nvmstore.core.product.controller;

import com.nvm.nvmstore.core.product.model.request.PostProductRequest;
import com.nvm.nvmstore.core.product.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAllProduct(){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.getAllProduct());
    }

    @PostMapping("/post-product")
    public ResponseEntity<?> postProduct(@RequestBody @Valid PostProductRequest postProductRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.postProduct(postProductRequest));
    }

    //Product
    @GetMapping("/get-all-product_paging")
    public ResponseEntity<?> getAllProductPaging(@RequestParam("page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(productService.getAllProductPaging(pageRequest));
    }

    @GetMapping("/get-totalPage")
    public ResponseEntity<?> getTotalPageProduct(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getTotalPageProduct());
    }

    @GetMapping("/search-product_paging")
    public ResponseEntity<?> searchProduct(@RequestParam(value = "input",required = false,defaultValue = "") String input,@RequestParam("page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(productService.searchProduct(input,pageRequest));
    }

    @GetMapping("/search-totalPage")
    public ResponseEntity<?> getTotalPageSearchProduct(@RequestParam(value = "input",required = false, defaultValue = "") String input){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getTotalPageSearchProduct(input));
    }
}
