package com.nvm.nvmstore.service.order.serviceImpl;

import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import com.nvm.nvmstore.entity.Order;
import com.nvm.nvmstore.repository.order.OrderRepository;
import com.nvm.nvmstore.repository.order.statusoder.StatusOrderRepository;
import com.nvm.nvmstore.repository.staff.StaffRepository;
import com.nvm.nvmstore.response.oder.OrderPendingResponse;
import com.nvm.nvmstore.service.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private StatusOrderRepository statusOrderRepository;

    @Override
    public String postDefaultOrder() {
        Map<String,String> error=new HashMap<>();
        if(orderRepository.getListOrderPending().size()==5){
            error.put("overOrder_pending","Đã Tạo Quá Hóa Đơn Chờ Cho Phép!");
            throw new ExceptionMessage(error);
        }
        Order postOrder=new Order();
        //set Code
        if(orderRepository.getNewestOrder()==null){
            postOrder.setCode("HD1");
        }else{
            String code=orderRepository.getNewestOrder().getCode();//getNewStaff to get Code
            postOrder.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
        }
        postOrder.setCreated_at(new Date());
        postOrder.setStaff_id(staffRepository.getReferenceById(Long.parseLong("2")));
        postOrder.setStatus_order_id(statusOrderRepository.getReferenceById(Long.parseLong("1")));
        orderRepository.save(postOrder);
        return "Post Order Successfully!";
    }

    @Override
    public List<OrderPendingResponse> getListOrderPending() {
        return orderRepository.getListOrderPending();
    }
}
