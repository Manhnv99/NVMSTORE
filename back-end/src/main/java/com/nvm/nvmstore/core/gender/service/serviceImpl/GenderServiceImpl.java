package com.nvm.nvmstore.core.gender.service.serviceImpl;

import com.nvm.nvmstore.core.gender.repository.DBGenderRepository;
import com.nvm.nvmstore.infrastructure.exception.ExceptionMessage;
import com.nvm.nvmstore.entity.Gender;
import com.nvm.nvmstore.repository.GenderRepository;
import com.nvm.nvmstore.core.gender.model.request.GenderRequest;
import com.nvm.nvmstore.core.gender.model.response.GenderResponse;
import com.nvm.nvmstore.core.gender.service.GenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GenderServiceImpl implements GenderService {

    @Autowired
    private DBGenderRepository genderRepository;

    @Override
    public List<GenderResponse> getALl() {
        return genderRepository.getALl();
    }

    @Override
    public void addGender(GenderRequest genderRequest) {
        Gender gender=new Gender();
        //check Validate
        Map<String,String> keyvalue=new HashMap<>();
        if(genderRepository.getGenderByName(genderRequest.getName())!=null){
            keyvalue.put("name","Tên Giới Tính Này Đã Tồn Tại!");
            throw new ExceptionMessage(keyvalue);
        }
        //set Code
        if(genderRepository.getNewest()==null){
            gender.setCode("GEN1");
        }else{
            String code=genderRepository.getNewest().getCode();//getNewStaff to get Code
            gender.setCode(code.substring(0,3)+((Integer.parseInt(code.substring(3)))+1));
        }
        gender.setName(genderRequest.getName());
        gender.setStatus(genderRequest.getStatus());
        gender.setCreated_at(new Date());
        gender.setUpdated_at(new Date());
        genderRepository.save(gender);
    }
}
