package com.nvm.nvmstore.request.color;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ColorRequest {

    @NotEmpty(message = "Mã Màu Sắc Không Được Để Trống!")
    private String code;

    @NotEmpty(message = "Tên Màu Sắc Không Được Để Trống!")
    private String name;

    private String status;
}
