package com.nvm.nvmstore.service.statusproductdetail.serviceImpl;


import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import com.nvm.nvmstore.entity.Status_ProductDetail;
import com.nvm.nvmstore.repository.statusproductdetail.Status_ProductDetailRepository;
import com.nvm.nvmstore.request.status_productdetail.Status_ProductDetailRequest;
import com.nvm.nvmstore.response.status_productdetail.Status_ProductDetailResponse;
import com.nvm.nvmstore.service.statusproductdetail.Status_ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class Status_ProductDetailServiceImpl implements Status_ProductDetailService {

    @Autowired
    private Status_ProductDetailRepository statusProductDetailRepository;


    @Override
    public List<Status_ProductDetailResponse> getALl() {
        return statusProductDetailRepository.getALl();
    }

    @Override
    public void addStatus_ProductDetail(Status_ProductDetailRequest statusProductDetailRequest) {
        Status_ProductDetail statusProductDetail=new Status_ProductDetail();
        //check Validate
        Map<String,String> keyvalue=new HashMap<>();
        if(statusProductDetailRepository.getStatus_ProductDetailByName(statusProductDetailRequest.getName())!=null){
            keyvalue.put("name","Tên Trạng Thái Này Đã Tồn Tại!");
            throw new ExceptionMessage(keyvalue);
        }
        //set Code
        if(statusProductDetailRepository.getNewest()==null){
            statusProductDetail.setCode("STATUS1");
        }else{
            String code=statusProductDetailRepository.getNewest().getCode();//getNewStaff to get Code
            statusProductDetail.setCode(code.substring(0,6)+((Integer.parseInt(code.substring(6)))+1));
        }
        statusProductDetail.setName(statusProductDetailRequest.getName());
        switch (statusProductDetailRequest.getStatus()){
            case "true":
                statusProductDetail.setStatus(true);
                break;
            case "false":
                statusProductDetail.setStatus(false);
                break;
            default:
                statusProductDetail.setStatus(true);
        }
        statusProductDetail.setCreated_at(new Date());
        statusProductDetail.setUpdated_at(new Date());
        statusProductDetailRepository.save(statusProductDetail);
    }
}
