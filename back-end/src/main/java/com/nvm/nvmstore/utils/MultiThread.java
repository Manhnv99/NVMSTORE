package com.nvm.nvmstore.utils;

import com.nvm.nvmstore.entity.Voucher;
import com.nvm.nvmstore.infrastructure.constant.Voucher_Status;
import com.nvm.nvmstore.repository.VoucherRepository;
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
                    Voucher_Status result = checkStatusVoucher.CheckStatus(voucher.getDate_start(),voucher.getDate_end());
                    if(result==Voucher_Status.NGUNG_AP_DUNG){
                        listVoucherExpires.add(voucher);
                    }
                });
                listVoucherExpires.forEach(voucherExpires -> {
                    voucherExpires.setStatus(Voucher_Status.NGUNG_AP_DUNG);
                    voucherRepository.save(voucherExpires);
                });
                listVoucherExpires.clear();
                System.out.println("run");
            }
        }, calendar.getTime(), 24 * 60 * 60 * 1000); // Chạy mỗi 24 giờ
    }
}
