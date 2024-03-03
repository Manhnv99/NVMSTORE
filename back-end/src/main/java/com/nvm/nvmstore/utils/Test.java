package com.nvm.nvmstore.utils;


import com.nvm.nvmstore.infrastructure.constant.Voucher_Status;

import java.time.LocalDate;

public class Test {
    public static void main(String[] args) {
        LocalDate date_start = LocalDate.of(2024, 2, 21);
        LocalDate date_end = LocalDate.of(2024, 2, 23);
        CheckStatusVoucher checkStatusVoucher=new CheckStatusVoucher();
        Voucher_Status result=checkStatusVoucher.CheckStatus(date_start,date_end);
        System.out.println(result);
    }
}
