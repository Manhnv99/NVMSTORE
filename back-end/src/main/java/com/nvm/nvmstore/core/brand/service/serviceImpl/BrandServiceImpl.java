package com.nvm.nvmstore.core.brand.service.serviceImpl;

import com.nvm.nvmstore.core.brand.repository.DBBrandRepository;
import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import com.nvm.nvmstore.infrastructure.exception.ExceptionMessage;
import com.nvm.nvmstore.entity.Brand;
import com.nvm.nvmstore.repository.BrandRepository;
import com.nvm.nvmstore.core.brand.model.request.BrandRequest;
import com.nvm.nvmstore.core.brand.model.response.BrandResponse;
import com.nvm.nvmstore.core.brand.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private DBBrandRepository brandRepository;

    @Override
    public List<BrandResponse> getAllPaging(Pageable pageable) {
        return brandRepository.getAllPaging(pageable);
    }

    @Override
    public List<BrandResponse> getAll() {
        return brandRepository.getAll();
    }

    @Override
    public List<BrandResponse> searchBrand(String input, Entity_Status status, Pageable pageable) {
        return brandRepository.searchBrand(input,status,pageable);
    }

    @Override
    public Double getTotalPageSearch(String input, Entity_Status status) {
        return Math.ceil(brandRepository.getTotalPageSearch(input,status).size()/3.0);
    }

    @Override
    public Double getAllTotalPage() {
        return Math.ceil(brandRepository.getAllTotalPage()/3.0);
    }

    @Override
    public String addBrand(BrandRequest brandRequest) {
        Brand brand=new Brand();
        //check Validate
        Map<String,String> keyvalue=new HashMap<>();
        if(brandRepository.getBrandByName(brandRequest.getName())!=null){
            keyvalue.put("name","Tên Thương Hiệu Này Đã Tồn Tại!");
            throw new ExceptionMessage(keyvalue);
        }
        //set Code
        if(brandRepository.getNewest()==null){
            brand.setCode("BRAND1");
        }else{
            String code=brandRepository.getNewest().getCode();//getNewStaff to get Code
            brand.setCode(code.substring(0,5)+((Integer.parseInt(code.substring(5)))+1));
        }
        brand.setName(brandRequest.getName());
        brand.setStatus(brandRequest.getStatus());
        brand.setCreated_at(new Date());
        brand.setUpdated_at(new Date());
        brandRepository.save(brand);
        return "Add Successfully!";
    }

    @Override
    public void updateBrand(Long id, BrandRequest brandRequest) {
        Map<String,String> keyvalue=new HashMap<>();
        Optional<Brand> optionalBrand=brandRepository.findById(id);
        optionalBrand.ifPresent(brand -> {
            if (!brandRequest.getName().equalsIgnoreCase(brand.getName())){
                keyvalue.put("name","Tên Thương Hiệu Này Đã Tồn Tại!");
                throw new ExceptionMessage(keyvalue);
            }
        });
        optionalBrand.get().setUpdated_at(new Date());
        optionalBrand.get().setStatus(brandRequest.getStatus());
        brandRepository.save(optionalBrand.get());
    }

    @Override
    public Brand getById(Long id) {
        Map<String,String> keyvalue=new HashMap<>();
        Optional<Brand> brandOptional=brandRepository.findById(id);
        if(brandOptional.isPresent()){
            return brandOptional.get();
        }else{
            keyvalue.put("name","Không Tìm Thấy Thương Hiệu Này!");
            throw new ExceptionMessage(keyvalue);
        }
    }
}
