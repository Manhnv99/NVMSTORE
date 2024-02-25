package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.request.size.SizeRequest;
import com.nvm.nvmstore.service.size.SizeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/size")
public class SizeController {

    @Autowired
    private SizeService sizeService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(sizeService.getALl());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody @Valid SizeRequest sizeRequest){
        sizeService.addSize(sizeRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
