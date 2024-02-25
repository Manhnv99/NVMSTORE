package com.nvm.nvmstore.service.voucher;

import com.nvm.nvmstore.entity.Voucher;
import com.nvm.nvmstore.request.voucher.VoucherPostRequest;
import com.nvm.nvmstore.request.voucher.VoucherPutRequest;
import com.nvm.nvmstore.response.voucher.GetAllVoucherResponse;

import java.math.BigDecimal;
import java.util.List;

public interface VoucherService {

    String PostVoucher(VoucherPostRequest voucherPostRequest);

    String PutVoucher(VoucherPutRequest voucherPutRequest);

    List<GetAllVoucherResponse> getAllVoucherPaging(Integer limit,Integer index);

    Double getToTalPageVoucher(Integer limit);

    List<GetAllVoucherResponse> searchVoucherPaging(String code, Integer quantity, BigDecimal value, Integer status,
                                              String date_start,String date_end,Integer limit,Integer index);

    Double getToTalPageSearchVoucher(String code, Integer quantity, BigDecimal value, Integer status,
                                     String date_start,String date_end,Integer limit);

    Voucher getVoucherById(Long id);

}
