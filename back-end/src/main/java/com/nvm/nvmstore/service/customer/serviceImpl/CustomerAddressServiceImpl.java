package com.nvm.nvmstore.service.customer.serviceImpl;

import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import com.nvm.nvmstore.entity.Customer_Address;
import com.nvm.nvmstore.repository.customer.CustomerRepository;
import com.nvm.nvmstore.repository.customer.customeraddress.CustomerAddressRepository;
import com.nvm.nvmstore.repository.location.DistrictsRepository;
import com.nvm.nvmstore.repository.location.ProvincesRepository;
import com.nvm.nvmstore.repository.location.WardsRepository;
import com.nvm.nvmstore.request.customer.customeraddress.PostCustomerAddressRequest;
import com.nvm.nvmstore.request.customer.customeraddress.PutCustomerAddressRequest;
import com.nvm.nvmstore.response.customer.customeraddress.ListCustomerAddressResponse;
import com.nvm.nvmstore.service.customer.CustomerAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CustomerAddressServiceImpl implements CustomerAddressService {

    @Autowired
    private CustomerAddressRepository customerAddressRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProvincesRepository provincesRepository;

    @Autowired
    private DistrictsRepository districtsRepository;

    @Autowired
    private WardsRepository wardsRepository;


    @Override
    public Customer_Address getCustomer_AddressById(Long customer_address_id) {
        return customerAddressRepository.getReferenceById(customer_address_id);
    }

    @Override
    public List<Customer_Address> listCustomerAddressByCustomer_Id(Long customer_id) {
        List<Customer_Address> listCustomerAddressByCustomer_Id = customerAddressRepository.listCustomerAddressByCustomer_Id(customer_id);
        if(!listCustomerAddressByCustomer_Id.isEmpty()){
            listCustomerAddressByCustomer_Id.forEach(item->{
                item.setAddress_province_code(provincesRepository.getFullNameByCode(item.getAddress_province_code()));
                item.setAddress_district_code(districtsRepository.getFullNameByCode(item.getAddress_district_code()));
                item.setAddress_ward_code(wardsRepository.getFullNameByCode(item.getAddress_ward_code()));
            });
            return listCustomerAddressByCustomer_Id;
        }else{
            return null;
        }
    }

    @Override
    public void postCustomerAddress(PostCustomerAddressRequest postCustomerAddressRequest) {
        Map<String,String> error = new HashMap<>();

        List<Customer_Address> listCustomerAddressByCustomerId = customerAddressRepository.listCustomerAddressByCustomerId(postCustomerAddressRequest.getCustomer_id());

        //isDuplicate
        if(!listCustomerAddressByCustomerId.isEmpty()){
            listCustomerAddressByCustomerId.forEach(item->{
                if(item.getName().equalsIgnoreCase(postCustomerAddressRequest.getName()) &&
                        item.getPhone().equalsIgnoreCase(postCustomerAddressRequest.getPhone()) &&
                        item.getAddress_province_code().equalsIgnoreCase(postCustomerAddressRequest.getAddress_province_code()) &&
                        item.getAddress_district_code().equalsIgnoreCase(postCustomerAddressRequest.getAddress_district_code()) &&
                        item.getAddress_ward_code().equalsIgnoreCase(postCustomerAddressRequest.getAddress_ward_code()) &&
                        item.getAddress_detail().equalsIgnoreCase(postCustomerAddressRequest.getAddress_detail())){
                    error.put("duplicate","Địa Chỉ Này Đã Có Sẵn!");
                }
            });
        }

        if(!error.isEmpty()){
            throw new ExceptionMessage(error);
        }

        Customer_Address postCustomerAddress = new Customer_Address();
        postCustomerAddress.setCustomer_id(customerRepository.getReferenceById(postCustomerAddressRequest.getCustomer_id()));
        postCustomerAddress.setName(postCustomerAddressRequest.getName());
        postCustomerAddress.setPhone(postCustomerAddressRequest.getPhone());
        postCustomerAddress.setAddress_province_code(postCustomerAddressRequest.getAddress_province_code());
        postCustomerAddress.setAddress_district_code(postCustomerAddressRequest.getAddress_district_code());
        postCustomerAddress.setAddress_ward_code(postCustomerAddressRequest.getAddress_ward_code());
        postCustomerAddress.setAddress_detail(postCustomerAddressRequest.getAddress_detail());
        if(!listCustomerAddressByCustomerId.isEmpty()){
            postCustomerAddress.setAddress_default(false);
        }else{
            postCustomerAddress.setAddress_default(true);
        }
        customerAddressRepository.save(postCustomerAddress);
    }

    @Override
    public void putCustomerAddress(PutCustomerAddressRequest putCustomerAddressRequest) {
        Map<String,String> error = new HashMap<>();

        List<Customer_Address> listCustomerAddressByCustomerId = customerAddressRepository.listCustomerAddressByCustomerId(putCustomerAddressRequest.getCustomer_id());

        //isDuplicate
        listCustomerAddressByCustomerId.forEach(item->{
            if(item.getName().equalsIgnoreCase(putCustomerAddressRequest.getName()) &&
                    item.getPhone().equalsIgnoreCase(putCustomerAddressRequest.getPhone()) &&
                    item.getAddress_province_code().equalsIgnoreCase(putCustomerAddressRequest.getAddress_province_code()) &&
                    item.getAddress_district_code().equalsIgnoreCase(putCustomerAddressRequest.getAddress_district_code()) &&
                    item.getAddress_ward_code().equalsIgnoreCase(putCustomerAddressRequest.getAddress_ward_code()) &&
                    item.getAddress_detail().equalsIgnoreCase(putCustomerAddressRequest.getAddress_detail())){
                error.put("duplicate","Địa Chỉ Này Đã Có Sẵn!");
            }
        });

        if(!error.isEmpty()){
            throw new ExceptionMessage(error);
        }

        Customer_Address putCustomerAddress = customerAddressRepository.getReferenceById(putCustomerAddressRequest.getId());
        putCustomerAddress.setName(putCustomerAddressRequest.getName());
        putCustomerAddress.setPhone(putCustomerAddressRequest.getPhone());
        putCustomerAddress.setAddress_province_code(putCustomerAddressRequest.getAddress_province_code());
        putCustomerAddress.setAddress_district_code(putCustomerAddressRequest.getAddress_district_code());
        putCustomerAddress.setAddress_ward_code(putCustomerAddressRequest.getAddress_ward_code());
        putCustomerAddress.setAddress_detail(putCustomerAddressRequest.getAddress_detail());
        customerAddressRepository.save(putCustomerAddress);
    }

    @Override
    public void putAddressDefault(Long customer_address_id,Long customer_id) {
        List<Customer_Address> listCustomerAddressByCustomerId = customerAddressRepository.listCustomerAddressByCustomerId(customer_id);

        if(!listCustomerAddressByCustomerId.isEmpty()){
            listCustomerAddressByCustomerId.forEach(item->{
                if(item.getAddress_default()){
                    //deleteSetDefault -> update lại cái thằng cũ thành địa chỉ bình thường.

                    customerAddressRepository.deleteAddressDefault(item.getId());
                    //setDefault -> update thằng mới thành địa chỉ mặc định.
                    customerAddressRepository.putAddressDefault(customer_address_id);
                }
            });
        }
    }
}
