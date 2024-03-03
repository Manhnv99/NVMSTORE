package com.nvm.nvmstore.core.category.controller;


import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import com.nvm.nvmstore.core.category.model.request.CategoryRequest;
import com.nvm.nvmstore.core.category.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/get-all")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAll());
    }

    @GetMapping("/get-all/{page}")
    public ResponseEntity<?> getAll(@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllPaging(pageRequest));
    }

    @GetMapping("/get-all-totalPage")
    public ResponseEntity<?> getAllTotalPage(){
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getAllTotalPage());
    }

    @GetMapping("/search/{page}")
    public ResponseEntity<?> searchCategory(@RequestParam(name = "input",required = false) String input, @RequestParam(name = "status",required = false) Entity_Status status, @PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.searchCategory(input,status,pageRequest));
    }

    @GetMapping("/search/get-totalPage")
    public ResponseEntity<?> getTotalPageSearch(@RequestParam(name = "input",required = false) String input,@RequestParam(name = "status",required = false) Entity_Status status){
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getTotalPageSearch(input,status));
    }


    @PostMapping("/post-category")
    public ResponseEntity<?> addCategory(@RequestBody @Valid CategoryRequest categoryRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.addCategory(categoryRequest));
    }

    @PutMapping("/put-category/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id,@RequestBody CategoryRequest categoryRequest){
        categoryService.updateCategory(id,categoryRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(categoryService.getById(id));
    }
}
