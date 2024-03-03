package com.nvm.nvmstore.controller;

import com.nvm.nvmstore.service.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/post-default_order")
    public ResponseEntity<?> postDefaultOrder(){
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.postDefaultOrder());
    }

    @GetMapping("/list-order_pending")
    public ResponseEntity<?> getListOrderPending(){
        return ResponseEntity.status(HttpStatus.OK).body(orderService.getListOrderPending());
    }

    @DeleteMapping("/delete-list-order_pending")
    public ResponseEntity<?> clearListOrderPending(){
        orderService.deleteListOrderPending();
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
