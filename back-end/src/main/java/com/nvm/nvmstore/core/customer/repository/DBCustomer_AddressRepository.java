package com.nvm.nvmstore.core.customer.repository;

import com.nvm.nvmstore.entity.Customer_Address;
import com.nvm.nvmstore.repository.CustomerAddressRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBCustomer_AddressRepository extends CustomerAddressRepository {
    @Query(value = """
            SELECT	*
            FROM customer_address c
            WHERE c.customer_id = :customer_id
            ORDER BY c.address_default = true DESC
            """,nativeQuery = true)
    List<Customer_Address> listCustomerAddressByCustomer_Id(Long customer_id);

    @Query(value = """
            SELECT * FROM customer_address c WHERE c.customer_id = :customer_id
            """,nativeQuery = true)
    List<Customer_Address> listCustomerAddressByCustomerId(Long customer_id);

    @Modifying
    @Transactional
    @Query(value = """
            UPDATE customer_address c SET c.address_default = 1 WHERE c.id = :customer_address_id
            """,nativeQuery = true)
    void putAddressDefault(Long customer_address_id);

    @Modifying
    @Transactional
    @Query(value = """
            UPDATE customer_address c SET c.address_default = 0 WHERE c.id = :customer_address_id
            """,nativeQuery = true)
    void deleteAddressDefault(Long customer_address_id);
}
