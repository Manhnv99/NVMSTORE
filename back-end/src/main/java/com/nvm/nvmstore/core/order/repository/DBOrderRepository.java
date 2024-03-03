package com.nvm.nvmstore.core.order.repository;

import com.nvm.nvmstore.core.order.model.response.OrderPendingResponse;
import com.nvm.nvmstore.entity.Order;
import com.nvm.nvmstore.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBOrderRepository extends OrderRepository {

    @Query(value = """
            SELECT o.id AS order_id FROM orders o WHERE o.order_status = 1
            """,nativeQuery = true)
    List<OrderPendingResponse> getListOrderPending();

    @Modifying
    @Transactional
    @Query(value = """
            DELETE FROM orders o WHERE o.order_status = 1
            """,nativeQuery = true)
    void deleteListOrderPending();

    @Query(value = """
            SELECT * FROM orders o ORDER BY o.id DESC LIMIT 1
            """,nativeQuery = true)
    Order getNewestOrder();
}
