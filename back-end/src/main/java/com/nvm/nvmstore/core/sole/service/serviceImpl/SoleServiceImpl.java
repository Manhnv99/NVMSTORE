package com.nvm.nvmstore.core.sole.service.serviceImpl;

import com.nvm.nvmstore.core.sole.repository.DBSoleRepository;
import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import com.nvm.nvmstore.infrastructure.exception.ExceptionMessage;
import com.nvm.nvmstore.entity.Sole;
import com.nvm.nvmstore.repository.SoleRepository;
import com.nvm.nvmstore.core.sole.model.request.SoleRequest;
import com.nvm.nvmstore.core.sole.model.response.SoleResponse;
import com.nvm.nvmstore.core.sole.service.SoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SoleServiceImpl implements SoleService {

    @Autowired
    private DBSoleRepository soleRepository;

    @Override
    public List<SoleResponse> getAllPaging(Pageable pageable) {
        return soleRepository.getAllPaging(pageable);
    }

    @Override
    public List<SoleResponse> getAll(){
        return soleRepository.getAll();
    }

    @Override
    public List<SoleResponse> searchSole(String input, Entity_Status status, Pageable pageable) {
        return soleRepository.searchSole(input,status,pageable);
    }

    @Override
    public Double getTotalPageSearch(String input, Entity_Status status) {
        return Math.ceil(soleRepository.getTotalPageSearch(input,status).size()/3.0);
    }

    @Override
    public Double getAllTotalPage() {
        return Math.ceil(soleRepository.getAllTotalPage()/3.0);
    }

    @Override
    public String addSole(SoleRequest soleRequest) {
        Sole sole=new Sole();
        //check Validate
        Map<String,String> keyvalue=new HashMap<>();
        if(soleRepository.getSoleByName(soleRequest.getName())!=null){
            keyvalue.put("name","Tên Đế Giày Này Đã Tồn Tại!");
            throw new ExceptionMessage(keyvalue);
        }
        //set Code
        if(soleRepository.getNewest()==null){
            sole.setCode("SOLE1");
        }else{
            String code=soleRepository.getNewest().getCode();//getNewStaff to get Code
            sole.setCode(code.substring(0,4)+((Integer.parseInt(code.substring(4)))+1));
        }
        sole.setName(soleRequest.getName());
        sole.setStatus(soleRequest.getStatus());
        sole.setCreated_at(new Date());
        sole.setUpdated_at(new Date());
        soleRepository.save(sole);
        return "Add Successfully!";
    }

    @Override
    public void updateSole(Long id, SoleRequest soleRequest) {
        Map<String,String> keyvalue=new HashMap<>();
        Optional<Sole> optionalSole=soleRepository.findById(id);
        optionalSole.ifPresent(sole -> {
            if (!soleRequest.getName().equalsIgnoreCase(sole.getName())){
                keyvalue.put("name","Tên Đế Giày Này Đã Tồn Tại!");
                throw new ExceptionMessage(keyvalue);
            }
        });
        optionalSole.get().setUpdated_at(new Date());
        optionalSole.get().setStatus(soleRequest.getStatus());
        soleRepository.save(optionalSole.get());
    }

    @Override
    public Sole getById(Long id) {
        Map<String,String> keyvalue=new HashMap<>();
        Optional<Sole> soleOptional=soleRepository.findById(id);
        if(soleOptional.isPresent()){
            return soleOptional.get();
        }else{
            keyvalue.put("name","Không Tìm Thấy Đế Giày Này!");
            throw new ExceptionMessage(keyvalue);
        }
    }
}
