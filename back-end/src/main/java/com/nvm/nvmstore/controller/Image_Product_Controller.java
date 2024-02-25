package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.request.ImageProduct.PostImageProductRequest;
import com.nvm.nvmstore.service.imageproduct.Image_ProductService;
import com.nvm.nvmstore.service.qrcode.QRCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;


@CrossOrigin
@RestController
@RequestMapping("/api/image_product")
public class Image_Product_Controller {

    @Autowired
    private Image_ProductService image_productService;

    @Autowired
    private QRCodeService qrCodeService;

    @PostMapping("/post-image_product")
    public ResponseEntity<?> postImageProduct(@RequestBody PostImageProductRequest postImageProductRequests) throws IOException {
        image_productService.postImageProduct(postImageProductRequests);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/delete-image_product")
    public ResponseEntity<?> deleteImageProduct(@RequestParam(value = "image_product_id") Long image_product_id, @RequestParam(value = "image_id") String image_id) throws IOException {
        image_productService.deleteImageProduct(image_product_id,image_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/get-qrcode_image")
    public ResponseEntity<?> ReadQRCodeToBase64(@RequestParam("qrcode") String data) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(qrCodeService.ReadQRCodeToBase64(data));
    }

    //Product Image Detail
    @GetMapping("/get-data-reference-product_productDetail/{product_detail_id}")
    public ResponseEntity<?> getReferenceProduct_ProductDetail(@PathVariable Long product_detail_id){
        return ResponseEntity.status(HttpStatus.OK).body(image_productService.getReferenceProduct_ProductDetail(product_detail_id));
    }

    @GetMapping("/get-image_product-byId/{product_detail_id}")
    public ResponseEntity<?> getAllImageProductById(@PathVariable Long product_detail_id){
        return ResponseEntity.status(HttpStatus.OK).body(image_productService.getAllImageProductById(product_detail_id));
    }

    @GetMapping("/get-all-image_product")
    public ResponseEntity<?> getAllImageProduct(){
        return ResponseEntity.status(HttpStatus.OK).body(image_productService.getAllImageProduct());
    }
}
