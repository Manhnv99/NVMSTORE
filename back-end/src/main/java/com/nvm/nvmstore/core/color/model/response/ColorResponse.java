package com.nvm.nvmstore.core.color.model.response;

import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ColorResponse {

    private Long id;

    private String code;

    private String name;

    private Date updated_at;

    private Entity_Status status;
}
