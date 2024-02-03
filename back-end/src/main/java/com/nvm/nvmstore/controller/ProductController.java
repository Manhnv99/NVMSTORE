package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.request.product.ProductRequest;
import com.nvm.nvmstore.service.ProductService;
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

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllProduct(){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.getAllProduct());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody @Valid ProductRequest productRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.addProduct(productRequest));
    }

    //Product
    @GetMapping("/productResponse")
    public ResponseEntity<?> getProductResponse(@RequestParam("page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductResponse(pageRequest));
    }

    @GetMapping("/totalPageProductResponse")
    public ResponseEntity<?> getTotalPageProductResponse(){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getTotalPageProductResponse());
    }

    @GetMapping("/searchProductResponse")
    public ResponseEntity<?> searchProductResponse(@RequestParam(value = "input",required = false,defaultValue = "") String input,@RequestParam("page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(productService.searchProductResponse(input,pageRequest));
    }

    @GetMapping("/totalPageSearchProductResponse")
    public ResponseEntity<?> getTotalPageSearchProductResponse(@RequestParam(value = "input",required = false, defaultValue = "") String input){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getTotalPageSearchProductResponse(input));
    }


    //Product Detail
    @GetMapping("/productDetailResponse/{product_id}")
    public ResponseEntity<?> getProductDetailResponse(@PathVariable Long product_id,@RequestParam("page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductDetailResponse(product_id,pageRequest));
    }

    @GetMapping("/getTotalPageProductDetailResponse/{product_id}")
    public ResponseEntity<?> getTotalPageProductDetailResponse(@PathVariable Long product_id){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getTotalPageProductDetailResponse(product_id));
    }

    @GetMapping("/searchProductDetailResponse/{product_id}")
    public ResponseEntity<?> searchProductDetailResponse(@PathVariable Long product_id,
                                                         @RequestParam(value = "materialId",required = false,defaultValue = "") Long materialId,
                                                         @RequestParam(value = "brandId" ,required = false,defaultValue = "") Long brandId,
                                                         @RequestParam(value="soleId" , required = false,defaultValue = "") Long soleId,
                                                         @RequestParam(value = "sizeId",required = false ,defaultValue = "") Long sizeId,
                                                         @RequestParam(value = "colorId",required = false,defaultValue = "") Long colorId,
                                                         @RequestParam(value = "categoryId",required = false,defaultValue = "") Long categoryId,
                                                         @RequestParam(value = "spdId",required = false,defaultValue = "") Long spdId,
                                                         @RequestParam(value = "genderId",required = false,defaultValue = "") Long genderId,
                                                         @RequestParam("page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(productService.searchProductDetailResponse(product_id,materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId,pageRequest));
    }

    @GetMapping("/getTotalPageSearchProductDetailResponse/{product_id}")
    public ResponseEntity<?> getTotalPageSearchProductDetailResponse(@PathVariable Long product_id,
                                                                     @RequestParam(value = "materialId",required = false,defaultValue = "") Long materialId,
                                                                     @RequestParam(value = "brandId" ,required = false,defaultValue = "") Long brandId,
                                                                     @RequestParam(value="soleId" , required = false,defaultValue = "") Long soleId,
                                                                     @RequestParam(value = "sizeId",required = false ,defaultValue = "") Long sizeId,
                                                                     @RequestParam(value = "colorId",required = false,defaultValue = "") Long colorId,
                                                                     @RequestParam(value = "categoryId",required = false,defaultValue = "") Long categoryId,
                                                                     @RequestParam(value = "spdId",required = false,defaultValue = "") Long spdId,
                                                                     @RequestParam(value = "genderId",required = false,defaultValue = "") Long genderId){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getTotalPageSearchProductDetailResponse(product_id,materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId));
    }

    //Product Image Detail
    @GetMapping("/productDetailImageResponse/{product_detail_id}")
    public ResponseEntity<?> getProductImageDetailResponse(@PathVariable Long product_detail_id){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductDetailImageResponse(product_detail_id));
    }

    @GetMapping("/imageProductResponse/{product_detail_id}")
    public ResponseEntity<?> getImageProductResponse(@PathVariable Long product_detail_id){
        return ResponseEntity.status(HttpStatus.OK).body(productService.getImageProductResponse(product_detail_id));
    }
}
