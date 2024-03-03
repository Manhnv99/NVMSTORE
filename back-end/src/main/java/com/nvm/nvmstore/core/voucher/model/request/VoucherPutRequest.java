package com.nvm.nvmstore.core.voucher.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class VoucherPutRequest extends VoucherPostRequest{
    private Long voucher_id;
}
