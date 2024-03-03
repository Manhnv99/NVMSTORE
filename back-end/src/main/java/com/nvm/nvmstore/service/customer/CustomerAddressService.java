package com.nvm.nvmstore.service.customer;

import com.nvm.nvmstore.entity.Customer_Address;
import com.nvm.nvmstore.request.customer.customeraddress.PostCustomerAddressRequest;
import com.nvm.nvmstore.request.customer.customeraddress.PutCustomerAddressRequest;

import java.util.List;

public interface CustomerAddressService {

    Customer_Address getCustomer_AddressById(Long customer_address_id);

    List<Customer_Address> listCustomerAddressByCustomer_Id(Long customer_id);

    void postCustomerAddress(PostCustomerAddressRequest postCustomerAddressRequest);

    void putCustomerAddress(PutCustomerAddressRequest putCustomerAddressRequest);

    void putAddressDefault(Long customer_address_id,Long customer_id);
}
