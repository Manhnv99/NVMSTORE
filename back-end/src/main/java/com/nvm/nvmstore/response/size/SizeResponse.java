package com.nvm.nvmstore.response.size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SizeResponse {

    private Long id;

    private String name;

    private Date updated_at;

    private Boolean status;
}
