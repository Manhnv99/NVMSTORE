package com.nvm.nvmstore.controller;


import com.nvm.nvmstore.request.gender.GenderRequest;
import com.nvm.nvmstore.request.status_productdetail.Status_ProductDetailRequest;
import com.nvm.nvmstore.service.Status_ProductDetailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/status_product_detail")
public class Status_ProductDetailController {


    @Autowired
    private Status_ProductDetailService statusProductDetailService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(statusProductDetailService.getALl());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody @Valid Status_ProductDetailRequest productDetailRequest){
        statusProductDetailService.addStatus_ProductDetail(productDetailRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
