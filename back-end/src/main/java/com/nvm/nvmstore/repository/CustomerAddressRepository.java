package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Customer_Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerAddressRepository extends JpaRepository<Customer_Address,Long> {
}
