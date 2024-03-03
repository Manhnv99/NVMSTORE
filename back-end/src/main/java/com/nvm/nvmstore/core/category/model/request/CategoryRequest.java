package com.nvm.nvmstore.core.category.model.request;

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
public class CategoryRequest {

    @NotEmpty(message = "Tên Thể Loại Không Được Để Trống!")
    private String name;
    
    private Entity_Status status;

}
