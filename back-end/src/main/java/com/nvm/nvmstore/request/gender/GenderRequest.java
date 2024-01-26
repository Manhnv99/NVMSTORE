package com.nvm.nvmstore.request.gender;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GenderRequest {
    @NotEmpty(message = "Tên Giới Tính Không Được Để Trống!")
    private String name;

    private String status;
}