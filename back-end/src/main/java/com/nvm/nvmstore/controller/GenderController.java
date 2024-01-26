package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.repository.GenderRepository;
import com.nvm.nvmstore.request.gender.GenderRequest;
import com.nvm.nvmstore.request.status_productdetail.Status_ProductDetailRequest;
import com.nvm.nvmstore.service.GenderService;
import com.nvm.nvmstore.service.Status_ProductDetailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api/gender")
public class GenderController {

    @Autowired
    private GenderService genderService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(genderService.getALl());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody @Valid GenderRequest genderRequest){
        genderService.addGender(genderRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
