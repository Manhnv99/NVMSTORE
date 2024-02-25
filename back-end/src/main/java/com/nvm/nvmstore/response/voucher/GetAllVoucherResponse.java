package com.nvm.nvmstore.response.voucher;

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

    Integer getStatus();

}
