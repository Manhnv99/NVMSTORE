package com.nvm.nvmstore.ExceptionHandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class HandleException {

//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(ExceptionMessage.class)
//    public ResponseEntity<?> handleException(ExceptionMessage message){
//        Map<String,String> map= new HashMap<>();
//        map.put("")
//    }
}
