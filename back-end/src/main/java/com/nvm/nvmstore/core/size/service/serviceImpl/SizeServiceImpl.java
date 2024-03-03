package com.nvm.nvmstore.core.size.service.serviceImpl;

import com.nvm.nvmstore.core.size.repository.DBSizeRepository;
import com.nvm.nvmstore.infrastructure.exception.ExceptionMessage;
import com.nvm.nvmstore.entity.Size;
import com.nvm.nvmstore.repository.SizeRepository;
import com.nvm.nvmstore.core.size.model.request.SizeRequest;
import com.nvm.nvmstore.core.size.model.response.SizeResponse;
import com.nvm.nvmstore.core.size.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private DBSizeRepository sizeRepository;

    @Override
    public List<SizeResponse> getALl() {
        return sizeRepository.getALl();
    }

    @Override
    public void addSize(SizeRequest sizeRequest) {
        Size size=new Size();
        //check Validate
        Map<String,String> keyvalue=new HashMap<>();
        if(sizeRepository.getSizeByName(sizeRequest.getName())!=null){
            keyvalue.put("name","Tên Kích Cỡ Này Đã Tồn Tại!");
            throw new ExceptionMessage(keyvalue);
        }
        //set Code
        if(sizeRepository.getNewest()==null){
            size.setCode("SIZE1");
        }else{
            String code=sizeRepository.getNewest().getCode();//getNewStaff to get Code
            size.setCode(code.substring(0,4)+((Integer.parseInt(code.substring(4)))+1));
        }
        size.setName(Integer.parseInt(sizeRequest.getName()));
        size.setStatus(sizeRequest.getStatus());
        size.setCreated_at(new Date());
        size.setUpdated_at(new Date());
        sizeRepository.save(size);
    }
}
