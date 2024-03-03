package com.nvm.nvmstore.core.voucher.model.response;

import com.nvm.nvmstore.infrastructure.constant.Voucher_Status;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

public interface GetAllVoucherResponse {

    Long getId();
    String getCode();

    String getName();

    Integer getQuantity();

    BigDecimal getValue();

    BigDecimal getMinimum_Oder();

    LocalDate getDate_Start();

    LocalDate getDate_End();

    Date getUpdated_At();

    Voucher_Status getStatus();

}
