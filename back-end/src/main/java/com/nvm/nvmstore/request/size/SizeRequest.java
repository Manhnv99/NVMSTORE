package com.nvm.nvmstore.request.size;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SizeRequest {

    @NotEmpty(message = "Tên Kích Cỡ Không Được Để Trống!")
    private String name;

    private String status;
}
