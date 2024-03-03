package com.nvm.nvmstore.core.color.controller;

import com.nvm.nvmstore.core.color.model.request.ColorRequest;
import com.nvm.nvmstore.core.color.service.ColorService;
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

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(colorService.getALl());
    }

    @PostMapping("/post-color")
    public ResponseEntity<?> postColor(@RequestBody @Valid ColorRequest colorRequest){
        colorService.addColor(colorRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
