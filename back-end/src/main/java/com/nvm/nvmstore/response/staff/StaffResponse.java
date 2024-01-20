package com.nvm.nvmstore.response.staff;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StaffResponse {
    private String name;

    private String cccd;

    private String image_url;

    private String phone;

    private Date birthday;

    private Boolean gender;

    private Boolean status;
}
