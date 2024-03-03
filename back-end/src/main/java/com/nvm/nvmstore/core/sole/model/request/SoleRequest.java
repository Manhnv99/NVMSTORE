package com.nvm.nvmstore.core.sole.model.request;

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
public class SoleRequest {
    @NotEmpty(message = "Tên Đế Giày Không Được Để Trống!")
    private String name;

    private Entity_Status status;
}
