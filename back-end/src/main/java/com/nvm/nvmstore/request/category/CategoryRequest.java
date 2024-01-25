package com.nvm.nvmstore.request.category;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CategoryRequest {

    @NotEmpty(message = "Tên Thể Loại Không Được Để Trống!")
    private String name;
    
    private String status;

}
