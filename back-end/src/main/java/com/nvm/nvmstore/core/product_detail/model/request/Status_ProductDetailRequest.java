package com.nvm.nvmstore.core.product_detail.model.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Status_ProductDetailRequest {
    @NotEmpty(message = "Tên Trạng Thái Không Được Để Trống!")
    private String name;

    private String status;
}
