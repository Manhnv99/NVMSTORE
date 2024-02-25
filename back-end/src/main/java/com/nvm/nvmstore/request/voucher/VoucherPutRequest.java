package com.nvm.nvmstore.request.voucher;

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
