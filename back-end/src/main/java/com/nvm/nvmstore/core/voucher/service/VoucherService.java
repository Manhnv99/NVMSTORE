package com.nvm.nvmstore.core.voucher.service;

import com.nvm.nvmstore.entity.Voucher;
import com.nvm.nvmstore.infrastructure.constant.Voucher_Status;
import com.nvm.nvmstore.core.voucher.model.request.VoucherPostRequest;
import com.nvm.nvmstore.core.voucher.model.request.VoucherPutRequest;
import com.nvm.nvmstore.core.voucher.model.response.GetAllVoucherResponse;

import java.math.BigDecimal;
import java.util.List;

public interface VoucherService {

    String PostVoucher(VoucherPostRequest voucherPostRequest);

    String PutVoucher(VoucherPutRequest voucherPutRequest);

    List<GetAllVoucherResponse> getAllVoucherPaging(Integer limit,Integer index);

    Double getToTalPageVoucher(Integer limit);

    List<GetAllVoucherResponse> searchVoucherPaging(String code, Integer quantity, BigDecimal value, Voucher_Status status,
                                              String date_start,String date_end,Integer limit,Integer index);

    Double getToTalPageSearchVoucher(String code, Integer quantity, BigDecimal value, Voucher_Status status,
                                     String date_start,String date_end,Integer limit);

    Voucher getVoucherById(Long id);

}
