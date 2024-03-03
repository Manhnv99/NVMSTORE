package com.nvm.nvmstore.core.order.service.serviceImpl;

import com.nvm.nvmstore.core.order.repository.DBOrderRepository;
import com.nvm.nvmstore.core.staff.repository.DBStaffRepository;
import com.nvm.nvmstore.infrastructure.constant.Order_Status;
import com.nvm.nvmstore.infrastructure.constant.Order_Type;
import com.nvm.nvmstore.infrastructure.exception.ExceptionMessage;
import com.nvm.nvmstore.entity.Order;
import com.nvm.nvmstore.repository.OrderRepository;
import com.nvm.nvmstore.repository.StaffRepository;
import com.nvm.nvmstore.core.order.model.response.OrderPendingResponse;
import com.nvm.nvmstore.core.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private DBOrderRepository orderRepository;

    @Autowired
    private DBStaffRepository staffRepository;


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
        postOrder.setStaff_id(staffRepository.getReferenceById(Long.parseLong("1")));
        postOrder.setOrder_status(Order_Status.CHO_THANH_TOAN);
        postOrder.setOrder_type(Order_Type.OFFLINE);
        orderRepository.save(postOrder);
        return "Post Order Successfully!";
    }

    @Override
    public List<OrderPendingResponse> getListOrderPending() {
        return orderRepository.getListOrderPending();
    }

    @Override
    public void deleteListOrderPending() {
        orderRepository.deleteListOrderPending();
    }
}
