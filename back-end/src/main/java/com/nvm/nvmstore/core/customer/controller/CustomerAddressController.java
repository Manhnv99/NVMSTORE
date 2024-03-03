package com.nvm.nvmstore.core.customer.controller;

import com.nvm.nvmstore.core.customer.model.request.customeraddress.PostCustomerAddressRequest;
import com.nvm.nvmstore.core.customer.model.request.customeraddress.PutCustomerAddressRequest;
import com.nvm.nvmstore.core.customer.service.CustomerAddressService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/customer_address")
public class CustomerAddressController {

    @Autowired
    private CustomerAddressService customerAddressService;

    @GetMapping("/get-customer_address-byId")
    public ResponseEntity<?> getCustomer_AddressById(@RequestParam(name = "customer_address_id") Long customer_address_id){
        return ResponseEntity.status(HttpStatus.OK).body(customerAddressService.getCustomer_AddressById(customer_address_id));
    }

    @GetMapping("/list-customer_address")
    public ResponseEntity<?> listCustomerAddress(@RequestParam(name = "customer_id") Long customer_id){
        return ResponseEntity.status(HttpStatus.OK).body(customerAddressService.listCustomerAddressByCustomer_Id(customer_id));
    }

    @PostMapping("/post-customer_address")
    public ResponseEntity<?> postCustomerAddress(@RequestBody @Valid PostCustomerAddressRequest postCustomerAddressRequest){
        customerAddressService.postCustomerAddress(postCustomerAddressRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/put-customer_address")
    public ResponseEntity<?> putCustomerAddress(@RequestBody @Valid PutCustomerAddressRequest putCustomerAddressRequest){
        customerAddressService.putCustomerAddress(putCustomerAddressRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PutMapping("/put-address_default")
    public ResponseEntity<?> putAddressDefault(@RequestBody Map<String, Long> requestBody){
        Long customer_address_id = requestBody.get("customer_address_id");
        Long customer_id = requestBody.get("customer_id");
        customerAddressService.putAddressDefault(customer_address_id,customer_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
