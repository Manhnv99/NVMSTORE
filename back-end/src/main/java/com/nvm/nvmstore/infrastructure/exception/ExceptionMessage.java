package com.nvm.nvmstore.infrastructure.exception;


import java.util.Map;

public class ExceptionMessage extends RuntimeException{

    private final Map<String, String> errorDetails;

    public ExceptionMessage(Map<String, String> errorDetails) {
        this.errorDetails = errorDetails;
    }

    public Map<String, String> getErrorDetails() {
        return errorDetails;
    }
}
