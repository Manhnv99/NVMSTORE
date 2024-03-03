package com.nvm.nvmstore.service.customer;

import com.nvm.nvmstore.request.customer.PostCustomerRequest;
import com.nvm.nvmstore.request.customer.PutCustomerRequest;
import com.nvm.nvmstore.response.customer.ListCustomerResponse;
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
