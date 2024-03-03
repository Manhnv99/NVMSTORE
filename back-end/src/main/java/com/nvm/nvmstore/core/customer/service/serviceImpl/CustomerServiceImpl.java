package com.nvm.nvmstore.core.customer.service.serviceImpl;

import com.nvm.nvmstore.core.customer.repository.DBCustomerRepository;
import com.nvm.nvmstore.infrastructure.exception.ExceptionMessage;
import com.nvm.nvmstore.entity.Customer;
import com.nvm.nvmstore.repository.CustomerRepository;
import com.nvm.nvmstore.core.customer.model.request.PostCustomerRequest;
import com.nvm.nvmstore.core.customer.model.request.PutCustomerRequest;
import com.nvm.nvmstore.core.customer.model.response.ListCustomerResponse;
import com.nvm.nvmstore.core.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private DBCustomerRepository customerRepository;

    @Override
    public String postCustomer(PostCustomerRequest postCustomerRequest) {
        Map<String,String> error=new HashMap<>();
        if(customerRepository.getByEmail(postCustomerRequest.getEmail())!=null){
            error.put("email","Email này đã tồn tại!");
        }
        if(customerRepository.getByPhone(postCustomerRequest.getPhone())!=null){
            error.put("phone","Số điện thoại này đã tồn tại!");
        }
        if(!error.isEmpty()){
            throw new ExceptionMessage(error);
        }
        Customer postCustomer=new Customer();
        if(customerRepository.getNewest()==null){
            postCustomer.setCode("KH1");
        }else{
            String code=customerRepository.getNewest().getCode();//getNewStaff to get Code
            postCustomer.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
        }
        postCustomer.setName(postCustomerRequest.getName());
        postCustomer.setPhone(postCustomerRequest.getPhone());
        postCustomer.setEmail(postCustomerRequest.getEmail());
        postCustomer.setPoint(0);
        postCustomer.setStatus(postCustomerRequest.getStatus());
        postCustomer.setCreated_at(new Date());
        postCustomer.setUpdated_at(new Date());
        customerRepository.save(postCustomer);
        return "Add Customer Successfully!";
    }

    @Override
    public String putCustomer(PutCustomerRequest putCustomerRequest) {
        Map<String,String> listError=new HashMap<>();
        Optional<Customer> customerOptional=customerRepository.findById(putCustomerRequest.getId());
        if(customerOptional.isPresent()){
            if(!putCustomerRequest.getEmail().equalsIgnoreCase(customerOptional.get().getEmail())){
                listError.put("email","Email này đã tồn tại!");
            }
            if(!putCustomerRequest.getPhone().equalsIgnoreCase(customerOptional.get().getPhone())){
                listError.put("phone","Số điện thoại này đã tồn tại!");
            }
        }
        if(!listError.isEmpty()){
            throw new ExceptionMessage(listError);
        }
        customerOptional.get().setName(putCustomerRequest.getName());
        customerOptional.get().setPhone(putCustomerRequest.getPhone());
        customerOptional.get().setEmail(putCustomerRequest.getEmail());
        customerOptional.get().setStatus(putCustomerRequest.getStatus());
        customerOptional.get().setUpdated_at(new Date());

        customerRepository.save(customerOptional.get());
        return "Update Successfully";
    }


    @Override
    public ListCustomerResponse getCustomerById(Long id) {
        return customerRepository.getCustomerById(id);
    }

    @Override
    public List<ListCustomerResponse> listCustomerPaging(Pageable pageable) {
        return customerRepository.listCustomerPaging(pageable);
    }

    @Override
    public Double totalPageListCustomerPaging(Integer LIMIT) {
        return Math.ceil(customerRepository.totalPageListCustomerPaging() / LIMIT);
    }

    @Override
    public List<ListCustomerResponse> listSearchCustomerPaging(String input , Pageable pageable) {
        return customerRepository.listSearchCustomerPaging(input , pageable);
    }

    @Override
    public Double totalPageSearchListCustomerPaging(String input,Integer LIMIT) {
        return Math.ceil(customerRepository.totalPageSearchListCustomerPaging(input) / LIMIT);
    }
}
