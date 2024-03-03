package com.nvm.nvmstore.core.material.controller;

import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import com.nvm.nvmstore.core.material.model.request.MaterialRequest;
import com.nvm.nvmstore.core.material.service.MaterialService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/material")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(materialService.getAll());
    }

    @GetMapping("/get-all/{page}")
    public ResponseEntity<?> getAll(@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(materialService.getAllPaging(pageRequest));
    }

    @GetMapping("/get-all-totalPage")
    public ResponseEntity<?> getAllTotalPage(){
        return ResponseEntity.status(HttpStatus.OK).body(materialService.getAllTotalPage());
    }

    @GetMapping("/search/{page}")
    public ResponseEntity<?> searchMaterial(@RequestParam(name = "input",required = false) String input, @RequestParam(name = "status",required = false) Entity_Status status, @PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(materialService.searchMaterial(input,status,pageRequest));
    }

    @GetMapping("/search/get-totalPage")
    public ResponseEntity<?> getTotalPageSearch(@RequestParam(name = "input",required = false) String input,@RequestParam(name = "status",required = false) Entity_Status status){
        return ResponseEntity.status(HttpStatus.OK).body(materialService.getTotalPageSearch(input,status));
    }


    @PostMapping("/post-material")
    public ResponseEntity<?> postMaterial(@RequestBody @Valid MaterialRequest materialRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(materialService.addMaterial(materialRequest));
    }

    @PutMapping("/put-material/{id}")
    public ResponseEntity<?> putMaterial(@PathVariable Long id,@RequestBody MaterialRequest materialRequest){
        materialService.updateMaterial(id,materialRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(materialService.getById(id));
    }
}
