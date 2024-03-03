package com.nvm.nvmstore.core.customer.model.response.customeraddress;

public interface ListCustomerAddressResponse {

    Long getId();

    String getName();

    String getPhone();

    String getAddress_Province();

    String getAddress_District();

    String getAddress_Ward();

    String getAddress_Detail();

    Boolean getAddress_Default();

}
