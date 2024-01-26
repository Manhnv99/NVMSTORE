package com.nvm.nvmstore.response.color;

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

    private String name;

    private Date updated_at;

    private Boolean status;
}
