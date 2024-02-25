package com.nvm.nvmstore.utils;

import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Component
public class CheckStatusVoucher {
    public Integer CheckStatus(LocalDate date_start,LocalDate date_end){
        LocalDate today = LocalDate.now();

        // Nếu ngày hôm nay lớn hơn date_end, trả về 3
        if (today.isAfter(date_end)) {
            return 3;
        }

        // Nếu ngày hôm nay nằm trong khoảng ngày của date_start và date_end, trả về 2
        if (today.isAfter(date_start) || today.equals(date_start)) {
            return 2;
        }

        // Nếu ngày hôm nay nhỏ hơn date_start, trả về 1
        return 1;
    }

    public String CheckDate(LocalDate date_start,LocalDate date_end){
        // Kiểm tra date_start và date_end hợp lệ
        if (date_start.isAfter(date_end)) {
            return "INVALID";
        }else{
            return "VALID";
        }
    }
}
