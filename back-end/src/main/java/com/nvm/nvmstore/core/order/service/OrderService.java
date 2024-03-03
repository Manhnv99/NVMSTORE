package com.nvm.nvmstore.core.order.service;

import com.nvm.nvmstore.core.order.model.response.OrderPendingResponse;

import java.util.List;

public interface OrderService {

    String postDefaultOrder();

    List<OrderPendingResponse> getListOrderPending();

    void deleteListOrderPending();
}
