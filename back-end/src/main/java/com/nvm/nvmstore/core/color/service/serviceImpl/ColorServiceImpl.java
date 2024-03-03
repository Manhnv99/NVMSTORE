package com.nvm.nvmstore.core.color.service.serviceImpl;

import com.nvm.nvmstore.core.color.repository.DBColorRepository;
import com.nvm.nvmstore.infrastructure.exception.ExceptionMessage;
import com.nvm.nvmstore.entity.Color;
import com.nvm.nvmstore.repository.ColorRepository;
import com.nvm.nvmstore.core.color.model.request.ColorRequest;
import com.nvm.nvmstore.core.color.model.response.ColorResponse;
import com.nvm.nvmstore.core.color.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private DBColorRepository colorRepository;


    @Override
    public List<ColorResponse> getALl() {
        return colorRepository.getALl();
    }

    @Override
    public void addColor(ColorRequest colorRequest) {
        Color color=new Color();
        //check Validate
        Map<String,String> keyvalue=new HashMap<>();

        if(colorRepository.getColorByCode(colorRequest.getCode())!=null){
            keyvalue.put("code","Mã Màu Sắc Này Đã Tồn Tại!");
        }
        if(colorRepository.getColorByName(colorRequest.getName())!=null){
            keyvalue.put("name","Tên Màu Sắc Này Đã Tồn Tại!");
        }
        if(!keyvalue.isEmpty()){
            throw new ExceptionMessage(keyvalue);
        }
        color.setCode(colorRequest.getCode());
        color.setName(colorRequest.getName());
        color.setStatus(colorRequest.getStatus());
        color.setCreated_at(new Date());
        color.setUpdated_at(new Date());
        colorRepository.save(color);
    }
}
