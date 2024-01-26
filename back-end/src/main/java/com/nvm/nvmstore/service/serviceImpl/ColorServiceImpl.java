package com.nvm.nvmstore.service.serviceImpl;

import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import com.nvm.nvmstore.entity.Color;
import com.nvm.nvmstore.entity.Gender;
import com.nvm.nvmstore.repository.ColorRepository;
import com.nvm.nvmstore.request.color.ColorRequest;
import com.nvm.nvmstore.response.color.ColorResponse;
import com.nvm.nvmstore.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private ColorRepository colorRepository;


    @Override
    public List<ColorResponse> getALl() {
        return colorRepository.getALl();
    }

    @Override
    public void addColor(ColorRequest colorRequest) {
        Color color=new Color();
        //check Validate
        Map<String,String> keyvalue=new HashMap<>();
        if(colorRepository.getColorByName(colorRequest.getName())!=null){
            keyvalue.put("name","Tên Màu Sắc Này Đã Tồn Tại!");
            throw new ExceptionMessage(keyvalue);
        }
        //set Code
        if(colorRepository.getNewest()==null){
            color.setCode("COLOR1");
        }else{
            String code=colorRepository.getNewest().getCode();//getNewStaff to get Code
            color.setCode(code.substring(0,5)+((Integer.parseInt(code.substring(5)))+1));
        }
        color.setName(colorRequest.getName());
        switch (colorRequest.getStatus()){
            case "true":
                color.setStatus(true);
                break;
            case "false":
                color.setStatus(false);
                break;
            default:
                color.setStatus(true);
        }
        color.setCreated_at(new Date());
        color.setUpdated_at(new Date());
        colorRepository.save(color);
    }
}
