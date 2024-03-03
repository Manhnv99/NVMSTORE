package com.nvm.nvmstore.core.brand.model.request;

import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
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

    private Entity_Status status;
}
