package com.nvm.nvmstore.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailCongfig {

    @Bean
    public JavaMailSender javaMailSender(){
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587); // Điều chỉnh cổng theo cấu hình của bạn
        mailSender.setUsername("nguyenvimanhnqt@gmail.com");
        mailSender.setPassword("mwvy dmpm pppo kskc");
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", true);
        properties.put("mail.smtp.starttls.enable", true);
        mailSender.setJavaMailProperties(properties);
        // Cấu hình các thuộc tính khác (nếu cần)
        return mailSender;
    }
}
