package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.request.ImageProduct.ImageProductRequest;
import com.nvm.nvmstore.service.Image_ProductService;
import com.nvm.nvmstore.service.QRCodeService;
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

    @PostMapping("/add")
    public ResponseEntity<?> addImageProduct(@RequestBody ImageProductRequest imageProductRequests) throws IOException {
        image_productService.addImageProduct(imageProductRequests);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/qrcodeimage")
    public ResponseEntity<?> ReadQRCodeToBase64(@RequestParam("qrcode") String data) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(qrCodeService.ReadQRCodeToBase64(data));
    }
}
