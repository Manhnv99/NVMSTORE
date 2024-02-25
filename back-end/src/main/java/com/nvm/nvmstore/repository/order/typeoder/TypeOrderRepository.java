package com.nvm.nvmstore.repository.order.typeoder;

import com.nvm.nvmstore.entity.Type_Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeOrderRepository extends JpaRepository<Type_Order,Long> {
}
