package com.nvm.nvmstore.core.brand.model.response;

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
public class BrandResponse {

    private Long id;

    private String name;

    private Date updated_at;

    private Entity_Status status;
}
