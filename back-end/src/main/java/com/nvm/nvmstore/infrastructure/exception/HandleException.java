package com.nvm.nvmstore.infrastructure.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@RestControllerAdvice
public class HandleException {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> exceptionHandler(MethodArgumentNotValidException ex){
        Map<String,String> valuesMap=new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error)->{
            String key=((FieldError) error).getField();
            String value=error.getDefaultMessage();
            valuesMap.put(key,value);
        });
        return new ResponseEntity<>(valuesMap,HttpStatus.BAD_REQUEST);
    }


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ExceptionMessage.class)
    public ResponseEntity<?> handleException(ExceptionMessage ex){
        return new ResponseEntity<>(ex.getErrorDetails(),HttpStatus.BAD_REQUEST);
    }
}
