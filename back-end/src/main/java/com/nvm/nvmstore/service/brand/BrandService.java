package com.nvm.nvmstore.service.brand;

import com.nvm.nvmstore.entity.Brand;
import com.nvm.nvmstore.entity.Category;
import com.nvm.nvmstore.request.brand.BrandRequest;
import com.nvm.nvmstore.request.category.CategoryRequest;
import com.nvm.nvmstore.response.brand.BrandResponse;
import com.nvm.nvmstore.response.category.CategoryResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BrandService {
    List<BrandResponse> getAllPaging(Pageable pageable);

    List<BrandResponse> getAll();

    List<BrandResponse> searchBrand(String input,Boolean status, Pageable pageable);

    Double getTotalPageSearch(String input,Boolean status);

    Double getAllTotalPage();

    String addBrand(BrandRequest brandRequest);

    void updateBrand(Long id,BrandRequest brandRequest);

    Brand getById(Long id);
}
