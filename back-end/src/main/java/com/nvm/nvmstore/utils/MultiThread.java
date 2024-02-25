package com.nvm.nvmstore.utils;

import com.nvm.nvmstore.entity.Voucher;
import com.nvm.nvmstore.repository.voucher.VoucherRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;


@Component
public class MultiThread  {

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private CheckStatusVoucher checkStatusVoucher;

    private static final List<Voucher> listVoucherExpires=new ArrayList<>();

    @PostConstruct
    public void refreshStatus() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                voucherRepository.findAll().forEach(voucher -> {
                    Integer result = checkStatusVoucher.CheckStatus(voucher.getDate_start(),voucher.getDate_end());
                    if(result==3){
                        listVoucherExpires.add(voucher);
                    }
                });
                listVoucherExpires.forEach(voucherExpires -> {
                    voucherExpires.setStatus(3);
                    voucherRepository.save(voucherExpires);
                });
                listVoucherExpires.clear();
                System.out.println("run");
            }
        }, calendar.getTime(), 24 * 60 * 60 * 1000); // Chạy mỗi 24 giờ
    }
}
