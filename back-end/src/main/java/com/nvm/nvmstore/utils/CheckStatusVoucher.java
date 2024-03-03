package com.nvm.nvmstore.utils;

import com.nvm.nvmstore.infrastructure.constant.Voucher_Status;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class CheckStatusVoucher {
    public Voucher_Status CheckStatus(LocalDate date_start, LocalDate date_end){
        LocalDate today = LocalDate.now();

        // Nếu ngày hôm nay lớn hơn date_end, trả về 3
        if (today.isAfter(date_end)) {
            return Voucher_Status.NGUNG_AP_DUNG;
        }

        // Nếu ngày hôm nay nằm trong khoảng ngày của date_start và date_end, trả về 2
        if (today.isAfter(date_start) || today.equals(date_start)) {
            return Voucher_Status.DANG_AP_DUNG;
        }

        // Nếu ngày hôm nay nhỏ hơn date_start, trả về 1
        return Voucher_Status.SAP_AP_DUNG;
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
