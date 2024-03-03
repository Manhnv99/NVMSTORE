package com.nvm.nvmstore.core.customer.model.response;

import com.nvm.nvmstore.infrastructure.constant.Customer_Status;

public interface ListCustomerResponse {

    Long getId();
    String getName();

    String getPhone();

    String getEmail();

    Integer getPoint();

    Customer_Status getStatus();


}
