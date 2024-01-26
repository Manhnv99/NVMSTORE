package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.request.color.ColorRequest;
import com.nvm.nvmstore.service.ColorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/color")
public class ColorController {

    @Autowired
    private ColorService colorService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(colorService.getALl());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody @Valid ColorRequest colorRequest){
        colorService.addColor(colorRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}