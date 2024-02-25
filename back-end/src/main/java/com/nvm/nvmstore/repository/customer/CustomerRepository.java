package com.nvm.nvmstore.repository.customer;

import com.nvm.nvmstore.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
}
