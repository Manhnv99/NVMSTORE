package com.nvm.nvmstore.service.order;

import com.nvm.nvmstore.response.oder.OrderPendingResponse;

import java.util.List;

public interface OrderService {

    String postDefaultOrder();

    List<OrderPendingResponse> getListOrderPending();
}
