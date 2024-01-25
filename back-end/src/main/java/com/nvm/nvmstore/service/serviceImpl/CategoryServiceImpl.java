package com.nvm.nvmstore.service.serviceImpl;

import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import com.nvm.nvmstore.entity.Category;
import com.nvm.nvmstore.repository.CategoryRepository;
import com.nvm.nvmstore.request.category.CategoryRequest;
import com.nvm.nvmstore.response.category.CategoryResponse;
import com.nvm.nvmstore.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse> getAllPaging(Pageable pageable) {
        return categoryRepository.getAllPaging(pageable);
    }

    @Override
    public List<CategoryResponse> getAll() {
        return categoryRepository.getAll();
    }

    @Override
    public List<CategoryResponse> searchCategory(String input, Boolean status, Pageable pageable) {
        return categoryRepository.searchCategory(input,status,pageable);
    }

    @Override
    public Double getTotalPageSearch(String input, Boolean status) {
        return Math.ceil(categoryRepository.getTotalPageSearch(input,status).size()/3.0);
    }

    @Override
    public Double getAllTotalPage() {
        return Math.ceil(categoryRepository.getAllTotalPage()/3.0);
    }

    @Override
    public String addCategory(CategoryRequest categoryRequest) {
        Category category=new Category();
        //check Validate
        Map<String,String> keyvalue=new HashMap<>();
        if(categoryRepository.getCategoryByName(categoryRequest.getName())!=null){
            keyvalue.put("name","Tên Thể Loại Này Đã Tồn Tại!");
            throw new ExceptionMessage(keyvalue);
        }
        //set Code
        if(categoryRepository.getNewest()==null){
            category.setCode("CATE1");
        }else{
            String code=categoryRepository.getNewest().getCode();//getNewStaff to get Code
            category.setCode(code.substring(0,4)+((Integer.parseInt(code.substring(4)))+1));
        }
        category.setName(categoryRequest.getName());
        switch (categoryRequest.getStatus()){
            case "true":
                category.setStatus(true);
                break;
            case "false":
                category.setStatus(false);
                break;
            default:
                category.setStatus(true);
        }
        category.setCreated_at(new Date());
        category.setUpdated_at(new Date());
        categoryRepository.save(category);
        return "Add Successfully!";
    }

    @Override
    public void updateCategory(Long id, CategoryRequest categoryRequest) {
        Map<String,String> keyvalue=new HashMap<>();
        Optional<Category> optionalCategory=categoryRepository.findById(id);
        optionalCategory.ifPresent(category -> {
            if (!categoryRequest.getName().equalsIgnoreCase(category.getName())){
                keyvalue.put("name","Tên Thể Loại Này Đã Tồn Tại!");
                throw new ExceptionMessage(keyvalue);
            }
        });
        optionalCategory.get().setUpdated_at(new Date());
        switch (categoryRequest.getStatus()){
            case "true":
                optionalCategory.get().setStatus(true);
                break;
            case "false":
                optionalCategory.get().setStatus(false);
                break;
            default:
                optionalCategory.get().setStatus(true);
        }
        categoryRepository.save(optionalCategory.get());
    }

    @Override
    public Category getById(Long id) {
        Map<String,String> keyvalue=new HashMap<>();
        Optional<Category> categoryOptional=categoryRepository.findById(id);
        if(categoryOptional.isPresent()){
            return categoryOptional.get();
        }else{
            keyvalue.put("name","Không Tìm Thấy Thể Loại Này!");
            throw new ExceptionMessage(keyvalue);
        }
    }
}
