package com.nvm.nvmstore.core.customer.controller;

import com.nvm.nvmstore.core.customer.model.request.PostCustomerRequest;
import com.nvm.nvmstore.core.customer.model.request.PutCustomerRequest;
import com.nvm.nvmstore.core.customer.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    private final static Integer LIMIT = 3;

    @Autowired
    private CustomerService customerService;


    @PostMapping("/post-customer")
    public ResponseEntity<?> postCustomer(@RequestBody @Valid PostCustomerRequest postCustomerRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(customerService.postCustomer(postCustomerRequest));
    }

    @PutMapping("/put-customer")
    public ResponseEntity<?> putCustomer(@RequestBody @Valid PutCustomerRequest putCustomerRequest){
        return ResponseEntity.status(HttpStatus.OK).body(customerService.putCustomer(putCustomerRequest));
    }

    @GetMapping("/get-customer-byId")
    public ResponseEntity<?> getCustomerById(@RequestParam(name = "id") Long id){
        return ResponseEntity.status(HttpStatus.OK).body(customerService.getCustomerById(id));
    }

    @GetMapping("/list-customer-paging")
    public ResponseEntity<?> listCustomerPaging(@RequestParam(name = "page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,LIMIT);
        return ResponseEntity.status(HttpStatus.OK).body(customerService.listCustomerPaging(pageRequest));
    }

    @GetMapping("/totalPage-list-customer-paging")
    public ResponseEntity<?> totalPageListCustomerPaging(){
        return ResponseEntity.status(HttpStatus.OK).body(customerService.totalPageListCustomerPaging(LIMIT));
    }

    @GetMapping("/list-search-customer-paging")
    public ResponseEntity<?> listSearchCustomerPaging(@RequestParam(name = "input",required = false) String input,
                                                      @RequestParam(name = "page") Integer page){
        PageRequest pageRequest=PageRequest.of(page-1,LIMIT);
        return ResponseEntity.status(HttpStatus.OK).body(customerService.listSearchCustomerPaging(input , pageRequest));
    }

    @GetMapping("/totalPage-list-search-customer-paging")
    public ResponseEntity<?> totalPageSearchListCustomerPaging(@RequestParam(name = "input",required = false) String input){
        return ResponseEntity.status(HttpStatus.OK).body(customerService.totalPageSearchListCustomerPaging(input,LIMIT));
    }
}
