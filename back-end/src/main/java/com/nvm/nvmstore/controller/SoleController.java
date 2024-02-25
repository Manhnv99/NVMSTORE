package com.nvm.nvmstore.controller;


import com.nvm.nvmstore.request.sole.SoleRequest;
import com.nvm.nvmstore.service.sole.SoleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/sole")
public class SoleController {

    @Autowired
    private SoleService soleService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(soleService.getAll());
    }

    @GetMapping("/getAll/{page}")
    public ResponseEntity<?> getAll(@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(soleService.getAllPaging(pageRequest));
    }

    @GetMapping("/getAllTotalPage")
    public ResponseEntity<?> getAllTotalPage(){
        return ResponseEntity.status(HttpStatus.OK).body(soleService.getAllTotalPage());
    }

    @GetMapping("/search/{page}")
    public ResponseEntity<?> searchSole(@RequestParam(name = "input",required = false) String input,@RequestParam(name = "status",required = false) Boolean status,@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(soleService.searchSole(input,status,pageRequest));
    }

    @GetMapping("/search/getTotalPage")
    public ResponseEntity<?> getTotalPageSearch(@RequestParam(name = "input",required = false) String input,@RequestParam(name = "status",required = false) Boolean status){
        return ResponseEntity.status(HttpStatus.OK).body(soleService.getTotalPageSearch(input,status));
    }


    @PostMapping("/add")
    public ResponseEntity<?> addSole(@RequestBody @Valid SoleRequest soleRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(soleService.addSole(soleRequest));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateSole(@PathVariable Long id,@RequestBody SoleRequest soleRequest){
        soleService.updateSole(id,soleRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(soleService.getById(id));
    }
}
