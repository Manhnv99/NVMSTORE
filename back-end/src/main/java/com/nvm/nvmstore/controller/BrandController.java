package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.request.brand.BrandRequest;
import com.nvm.nvmstore.service.brand.BrandService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/brand")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(brandService.getAll());
    }

    @GetMapping("/get-all/{page}")
    public ResponseEntity<?> getAll(@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(brandService.getAllPaging(pageRequest));
    }

    @GetMapping("/get-all-totalPage")
    public ResponseEntity<?> getAllTotalPage(){
        return ResponseEntity.status(HttpStatus.OK).body(brandService.getAllTotalPage());
    }

    @GetMapping("/search/{page}")
    public ResponseEntity<?> searchBrand(@RequestParam(name = "input",required = false) String input,@RequestParam(name = "status",required = false) Boolean status,@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(brandService.searchBrand(input,status,pageRequest));
    }

    @GetMapping("/search/get-totalPage")
    public ResponseEntity<?> getTotalPageSearch(@RequestParam(name = "input",required = false) String input,@RequestParam(name = "status",required = false) Boolean status){
        return ResponseEntity.status(HttpStatus.OK).body(brandService.getTotalPageSearch(input,status));
    }

    @PostMapping("/post-brand")
    public ResponseEntity<?> postBrand(@RequestBody @Valid BrandRequest brandRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(brandService.addBrand(brandRequest));
    }

    @PutMapping("/put-brand/{id}")
    public ResponseEntity<?> putBrand(@PathVariable Long id,@RequestBody BrandRequest brandRequest){
        brandService.updateBrand(id,brandRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(brandService.getById(id));
    }
}
