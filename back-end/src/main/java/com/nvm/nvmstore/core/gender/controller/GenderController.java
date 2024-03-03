package com.nvm.nvmstore.core.gender.controller;

import com.nvm.nvmstore.core.gender.model.request.GenderRequest;
import com.nvm.nvmstore.core.gender.service.GenderService;
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

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(genderService.getALl());
    }

    @PostMapping("/post-gender")
    public ResponseEntity<?> postGender(@RequestBody @Valid GenderRequest genderRequest){
        genderService.addGender(genderRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
