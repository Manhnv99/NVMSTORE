package com.nvm.nvmstore.service.size.serviceImpl;

import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import com.nvm.nvmstore.entity.Size;
import com.nvm.nvmstore.repository.size.SizeRepository;
import com.nvm.nvmstore.request.size.SizeRequest;
import com.nvm.nvmstore.response.size.SizeResponse;
import com.nvm.nvmstore.service.size.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private SizeRepository sizeRepository;

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
        switch (sizeRequest.getStatus()){
            case "true":
                size.setStatus(true);
                break;
            case "false":
                size.setStatus(false);
                break;
            default:
                size.setStatus(true);
        }
        size.setCreated_at(new Date());
        size.setUpdated_at(new Date());
        sizeRepository.save(size);
    }
}
