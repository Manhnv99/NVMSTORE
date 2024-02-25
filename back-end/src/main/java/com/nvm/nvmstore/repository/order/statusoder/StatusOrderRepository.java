package com.nvm.nvmstore.repository.order.statusoder;

import com.nvm.nvmstore.entity.Status_Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusOrderRepository extends JpaRepository<Status_Order,Long> {
}
