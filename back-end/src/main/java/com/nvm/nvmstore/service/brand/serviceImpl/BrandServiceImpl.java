package com.nvm.nvmstore.service.brand.serviceImpl;

import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import com.nvm.nvmstore.entity.Brand;
import com.nvm.nvmstore.repository.brand.BrandRepository;
import com.nvm.nvmstore.request.brand.BrandRequest;
import com.nvm.nvmstore.response.brand.BrandResponse;
import com.nvm.nvmstore.service.brand.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private BrandRepository brandRepository;

    @Override
    public List<BrandResponse> getAllPaging(Pageable pageable) {
        return brandRepository.getAllPaging(pageable);
    }

    @Override
    public List<BrandResponse> getAll() {
        return brandRepository.getAll();
    }

    @Override
    public List<BrandResponse> searchBrand(String input, Boolean status, Pageable pageable) {
        return brandRepository.searchBrand(input,status,pageable);
    }

    @Override
    public Double getTotalPageSearch(String input, Boolean status) {
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
        switch (brandRequest.getStatus()){
            case "true":
                brand.setStatus(true);
                break;
            case "false":
                brand.setStatus(false);
                break;
            default:
                brand.setStatus(true);
        }
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
        switch (brandRequest.getStatus()){
            case "true":
                optionalBrand.get().setStatus(true);
                break;
            case "false":
                optionalBrand.get().setStatus(false);
                break;
            default:
                optionalBrand.get().setStatus(true);
        }
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
