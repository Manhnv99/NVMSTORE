package com.nvm.nvmstore.request.brand;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BrandRequest {
    @NotEmpty(message = "Tên Thương Hiệu Không Được Để Trống!")
    private String name;

    private String status;
}
