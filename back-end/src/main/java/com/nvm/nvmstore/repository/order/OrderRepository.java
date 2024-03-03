package com.nvm.nvmstore.repository.order;

import com.nvm.nvmstore.entity.Order;
import com.nvm.nvmstore.response.oder.OrderPendingResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

    @Query(value = """
            SELECT o.id AS order_id FROM orders o WHERE o.status_order_id = 1
            """,nativeQuery = true)
    List<OrderPendingResponse> getListOrderPending();

    @Modifying
    @Transactional
    @Query(value = """
            DELETE FROM orders o WHERE o.status_order_id = 1
            """,nativeQuery = true)
    void deleteListOrderPending();

    @Query(value = """
            SELECT * FROM orders o ORDER BY o.id DESC LIMIT 1
            """,nativeQuery = true)
    Order getNewestOrder();
}
