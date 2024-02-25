package com.nvm.nvmstore.repository.order.paymentoption;

import com.nvm.nvmstore.entity.PaymentOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentOptionRepository extends JpaRepository<PaymentOption,Long> {
}
