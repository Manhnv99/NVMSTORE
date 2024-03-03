package com.nvm.nvmstore.core.customer.service;

import com.nvm.nvmstore.core.customer.model.request.PostCustomerRequest;
import com.nvm.nvmstore.core.customer.model.request.PutCustomerRequest;
import com.nvm.nvmstore.core.customer.model.response.ListCustomerResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CustomerService {

    String postCustomer(PostCustomerRequest postCustomerRequest);

    String putCustomer(PutCustomerRequest putCustomerRequest);

    ListCustomerResponse getCustomerById(Long id);

    List<ListCustomerResponse> listCustomerPaging(Pageable pageable);

    Double totalPageListCustomerPaging(Integer LIMIT);

    List<ListCustomerResponse> listSearchCustomerPaging(String input,Pageable pageable);

    Double totalPageSearchListCustomerPaging(String input,Integer LIMIT);


}
