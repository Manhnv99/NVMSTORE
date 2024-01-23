package com.nvm.nvmstore.controller;


import com.nvm.nvmstore.request.StaffRequest.StaffRequest;
import com.nvm.nvmstore.service.StaffService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @GetMapping("/getAll/{page}")
    public ResponseEntity<?> getAll(@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(staffService.getAll(pageRequest));
    }

    @GetMapping("/getStaffById/{id}")
    public ResponseEntity<?> getStaffById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(staffService.getStaffById(id));
    }

    @GetMapping("/getTotalPage")
    public ResponseEntity<?> getTotalStaff(){
        return ResponseEntity.status(HttpStatus.OK).body(staffService.getTotalPageStaff());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createStaff(@ModelAttribute @Valid StaffRequest staffRequest) throws IOException {
        return staffService.addStaff(staffRequest);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable Long id,@ModelAttribute @Valid StaffRequest staffRequest) throws IOException{
        return staffService.updateStaff(id,staffRequest);
    }

    @GetMapping("/search/{page}")
    public ResponseEntity<?> searchStaff(@RequestParam(name = "input",required = false) String input,@RequestParam(name = "status",required = false) Boolean status,@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(staffService.searchStaff(input,status,pageRequest));
    }

    @GetMapping("/search/getTotalPage")
    public ResponseEntity<?> getTotalPageSearch(@RequestParam(name = "input",required = false) String input,@RequestParam(name = "status",required = false) Boolean status){
        return ResponseEntity.status(HttpStatus.OK).body(staffService.getTotalPageSearch(input,status));
    }

}
