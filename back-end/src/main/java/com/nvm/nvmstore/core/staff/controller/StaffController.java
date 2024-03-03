package com.nvm.nvmstore.core.staff.controller;


import com.nvm.nvmstore.infrastructure.constant.Staff_Status;
import com.nvm.nvmstore.core.staff.model.request.PostStaffRequest;
import com.nvm.nvmstore.core.staff.model.request.PutStaffRequest;
import com.nvm.nvmstore.core.staff.service.StaffService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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

    @GetMapping("/get-all/{page}")
    public ResponseEntity<?> getAll(@PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(staffService.getAll(pageRequest));
    }

    @GetMapping("/get-byId/{id}")
    public ResponseEntity<?> getStaffById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(staffService.getStaffById(id));
    }

    @GetMapping("/get-totalPage")
    public ResponseEntity<?> getTotalStaff(){
        return ResponseEntity.status(HttpStatus.OK).body(staffService.getTotalPageStaff());
    }

    @PostMapping("/post-staff")
    public ResponseEntity<?> postStaff(@ModelAttribute @Valid PostStaffRequest postStaffRequest) throws IOException {
        return staffService.postStaff(postStaffRequest);
    }

    @PutMapping("/put-staff/{id}")
    public ResponseEntity<?> putStaff(@PathVariable Long id,@ModelAttribute @Valid PutStaffRequest putStaffRequest) throws IOException{

        return staffService.putStaff(id, putStaffRequest);
    }

    @GetMapping("/search/{page}")
    public ResponseEntity<?> searchStaff(@RequestParam(name = "input",required = false) String input, @RequestParam(name = "status",required = false) Staff_Status status, @PathVariable Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,3);
        return ResponseEntity.status(HttpStatus.OK).body(staffService.searchStaff(input,status,pageRequest));
    }

    @GetMapping("/search/get-totalPage")
    public ResponseEntity<?> getTotalPageSearch(@RequestParam(name = "input",required = false) String input,@RequestParam(name = "status",required = false) Staff_Status status){
        return ResponseEntity.status(HttpStatus.OK).body(staffService.getTotalPageSearch(input,status));
    }

}
