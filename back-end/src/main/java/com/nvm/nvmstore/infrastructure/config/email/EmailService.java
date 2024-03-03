package com.nvm.nvmstore.infrastructure.config.email;


public interface EmailService {
    void sendEmail(String to,String subject,String text);
}
