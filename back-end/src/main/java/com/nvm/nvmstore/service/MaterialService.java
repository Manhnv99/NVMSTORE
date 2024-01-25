package com.nvm.nvmstore.service;

import com.nvm.nvmstore.entity.Category;
import com.nvm.nvmstore.entity.Material;
import com.nvm.nvmstore.request.category.CategoryRequest;
import com.nvm.nvmstore.request.material.MaterialRequest;
import com.nvm.nvmstore.response.category.CategoryResponse;
import com.nvm.nvmstore.response.material.MaterialResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MaterialService {
    List<MaterialResponse> getAllPaging(Pageable pageable);

    List<MaterialResponse> getAll();

    List<MaterialResponse> searchMaterial(String input,Boolean status, Pageable pageable);

    Double getTotalPageSearch(String input,Boolean status);

    Double getAllTotalPage();

    String addMaterial(MaterialRequest materialRequest);

    void updateMaterial(Long id,MaterialRequest materialRequest);

    Material getById(Long id);
}
