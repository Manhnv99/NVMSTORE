package com.nvm.nvmstore.response.gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GenderResponse {

    private Long id;

    private String name;

    private Date updated_at;

    private Boolean status;
}
