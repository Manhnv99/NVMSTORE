package com.nvm.nvmstore.service.material.serviceImpl;

import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import com.nvm.nvmstore.entity.Material;
import com.nvm.nvmstore.repository.material.MaterialRepository;
import com.nvm.nvmstore.request.material.MaterialRequest;
import com.nvm.nvmstore.response.material.MaterialResponse;
import com.nvm.nvmstore.service.material.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private MaterialRepository materialRepository;

    @Override
    public List<MaterialResponse> getAllPaging(Pageable pageable) {
        return materialRepository.getAllPaging(pageable);
    }

    @Override
    public List<MaterialResponse> getAll() {
        return materialRepository.getAll();
    }

    @Override
    public List<MaterialResponse> searchMaterial(String input, Boolean status, Pageable pageable) {
        return materialRepository.searchMaterial(input,status,pageable);
    }

    @Override
    public Double getTotalPageSearch(String input, Boolean status) {
        return Math.ceil(materialRepository.getTotalPageSearch(input,status).size()/3.0);
    }

    @Override
    public Double getAllTotalPage() {
        return Math.ceil(materialRepository.getAllTotalPage()/3.0);
    }

    @Override
    public String addMaterial(MaterialRequest materialRequest) {
        Material material=new Material();
        //check Validate
        Map<String,String> keyvalue=new HashMap<>();
        if(materialRepository.getMaterialByName(materialRequest.getName())!=null){
            keyvalue.put("name","Tên Chất Liệu Này Đã Tồn Tại!");
            throw new ExceptionMessage(keyvalue);
        }
        //set Code
        if(materialRepository.getNewest()==null){
            material.setCode("MTR1");
        }else{
            String code=materialRepository.getNewest().getCode();//getNewStaff to get Code
            material.setCode(code.substring(0,3)+((Integer.parseInt(code.substring(3)))+1));
        }
        material.setName(materialRequest.getName());
        switch (materialRequest.getStatus()){
            case "true":
                material.setStatus(true);
                break;
            case "false":
                material.setStatus(false);
                break;
            default:
                material.setStatus(true);
        }
        material.setCreated_at(new Date());
        material.setUpdated_at(new Date());
        materialRepository.save(material);
        return "Add Successfully!";
    }

    @Override
    public void updateMaterial(Long id, MaterialRequest materialRequest) {
        Map<String,String> keyvalue=new HashMap<>();
        Optional<Material> optionalMaterial=materialRepository.findById(id);
        optionalMaterial.ifPresent(material -> {
            if (!materialRequest.getName().equalsIgnoreCase(material.getName())){
                keyvalue.put("name","Tên Chất Liệu Này Đã Tồn Tại!");
                throw new ExceptionMessage(keyvalue);
            }
        });
        optionalMaterial.get().setUpdated_at(new Date());
        switch (materialRequest.getStatus()){
            case "true":
                optionalMaterial.get().setStatus(true);
                break;
            case "false":
                optionalMaterial.get().setStatus(false);
                break;
            default:
                optionalMaterial.get().setStatus(true);
        }
        materialRepository.save(optionalMaterial.get());
    }

    @Override
    public Material getById(Long id) {
        Map<String,String> keyvalue=new HashMap<>();
        Optional<Material> materialOptional=materialRepository.findById(id);
        if(materialOptional.isPresent()){
            return materialOptional.get();
        }else{
            keyvalue.put("name","Không Tìm Thấy Chất Liệu Này!");
            throw new ExceptionMessage(keyvalue);
        }
    }
}
