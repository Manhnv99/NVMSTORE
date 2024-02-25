package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.request.productdetail.PostProductDetailRequest;
import com.nvm.nvmstore.request.productdetail.PutProductDetailRequest;
import com.nvm.nvmstore.service.productdetail.Product_DetailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/product_detail")
public class Product_Detail_Controller {

    @Autowired
    private Product_DetailService product_detailService;

    @PostMapping("/post-product_detail")
    private ResponseEntity<?> postProduct_Detail(@RequestBody PostProductDetailRequest postProductDetailRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(product_detailService.postProduct_Detail(postProductDetailRequest));
    }

    @PutMapping("/put-product_detail")
    private ResponseEntity<?> putProduct_Detail(@RequestBody @Valid PutProductDetailRequest putProductDetailRequest){
        product_detailService.putProduct_Detail(putProductDetailRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    //Product Detail
    @GetMapping("/get-all-product_detail")
    public ResponseEntity<?> getAllProductDetail(@RequestParam("page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(product_detailService.getAllProductDetail(pageRequest));
    }

    @GetMapping("/get-totalPage-product_detail")
    public ResponseEntity<?> getTotalPageProductDetail(){
        return ResponseEntity.status(HttpStatus.OK).body(product_detailService.getTotalPageProductDetail());
    }

    @GetMapping("/search-product_detail")
    public ResponseEntity<?> searchProductDetail(@RequestParam(value = "materialId",required = false,defaultValue = "") Long materialId,
                                                 @RequestParam(value = "brandId" ,required = false,defaultValue = "") Long brandId,
                                                 @RequestParam(value="soleId" , required = false,defaultValue = "") Long soleId,
                                                 @RequestParam(value = "sizeId",required = false ,defaultValue = "") Long sizeId,
                                                 @RequestParam(value = "colorId",required = false,defaultValue = "") Long colorId,
                                                 @RequestParam(value = "categoryId",required = false,defaultValue = "") Long categoryId,
                                                 @RequestParam(value = "spdId",required = false,defaultValue = "") Long spdId,
                                                 @RequestParam(value = "genderId",required = false,defaultValue = "") Long genderId,
                                                 @RequestParam("page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(product_detailService.searchProductDetail(materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId,pageRequest));
    }

    @GetMapping("/search-totalPage-product_detail")
    public ResponseEntity<?> getTotalPageSearchProductDetail(@RequestParam(value = "materialId",required = false,defaultValue = "") Long materialId,
                                                             @RequestParam(value = "brandId" ,required = false,defaultValue = "") Long brandId,
                                                             @RequestParam(value="soleId" , required = false,defaultValue = "") Long soleId,
                                                             @RequestParam(value = "sizeId",required = false ,defaultValue = "") Long sizeId,
                                                             @RequestParam(value = "colorId",required = false,defaultValue = "") Long colorId,
                                                             @RequestParam(value = "categoryId",required = false,defaultValue = "") Long categoryId,
                                                             @RequestParam(value = "spdId",required = false,defaultValue = "") Long spdId,
                                                             @RequestParam(value = "genderId",required = false,defaultValue = "") Long genderId){
        return ResponseEntity.status(HttpStatus.OK).body(product_detailService.getTotalPageSearchProductDetail(materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId));
    }

    //Product Detail By Product_Id
    @GetMapping("/get-all-product_detail-byProductId/{product_id}")
    public ResponseEntity<?> getAllProductDetailByProductId(@PathVariable Long product_id,@RequestParam("page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(product_detailService.getAllProductDetailByProductId(product_id,pageRequest));
    }

    @GetMapping("/get-totalPage-product_detail-byProductId/{product_id}")
    public ResponseEntity<?> getTotalPageProductDetailByProductId(@PathVariable Long product_id){
        return ResponseEntity.status(HttpStatus.OK).body(product_detailService.getTotalPageProductDetailByProductId(product_id));
    }

    @GetMapping("/search-product_detail-byProductId/{product_id}")
    public ResponseEntity<?> searchProductDetailByProductId(@PathVariable Long product_id,
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
        return ResponseEntity.status(HttpStatus.OK).body(product_detailService.searchProductDetailByProductId(product_id,materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId,pageRequest));
    }

    @GetMapping("/search-totalPage-product_detail-byProductId/{product_id}")
    public ResponseEntity<?> getTotalPageSearchProductDetailByProductId(@PathVariable Long product_id,
                                                                     @RequestParam(value = "materialId",required = false,defaultValue = "") Long materialId,
                                                                     @RequestParam(value = "brandId" ,required = false,defaultValue = "") Long brandId,
                                                                     @RequestParam(value="soleId" , required = false,defaultValue = "") Long soleId,
                                                                     @RequestParam(value = "sizeId",required = false ,defaultValue = "") Long sizeId,
                                                                     @RequestParam(value = "colorId",required = false,defaultValue = "") Long colorId,
                                                                     @RequestParam(value = "categoryId",required = false,defaultValue = "") Long categoryId,
                                                                     @RequestParam(value = "spdId",required = false,defaultValue = "") Long spdId,
                                                                     @RequestParam(value = "genderId",required = false,defaultValue = "") Long genderId){
        return ResponseEntity.status(HttpStatus.OK).body(product_detailService.getTotalPageSearchProductDetailByProductId(product_id,materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId));
    }
}
