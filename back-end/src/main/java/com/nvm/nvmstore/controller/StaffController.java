package com.nvm.nvmstore.controller;


import com.nvm.nvmstore.request.StaffRequest.StaffRequest;
import com.nvm.nvmstore.service.StaffService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(staffService.getAll());
    }


    @PostMapping("/create")
    public ResponseEntity<?> createStaff(@ModelAttribute @Valid StaffRequest staffRequest) throws IOException {
        return staffService.addStaff(staffRequest);
    }
}
