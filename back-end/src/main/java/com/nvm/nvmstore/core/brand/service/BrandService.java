package com.nvm.nvmstore.core.brand.service;

import com.nvm.nvmstore.entity.Brand;
import com.nvm.nvmstore.core.brand.model.request.BrandRequest;
import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import com.nvm.nvmstore.core.brand.model.response.BrandResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BrandService {
    List<BrandResponse> getAllPaging(Pageable pageable);

    List<BrandResponse> getAll();

    List<BrandResponse> searchBrand(String input, Entity_Status status, Pageable pageable);

    Double getTotalPageSearch(String input, Entity_Status status);

    Double getAllTotalPage();

    String addBrand(BrandRequest brandRequest);

    void updateBrand(Long id,BrandRequest brandRequest);

    Brand getById(Long id);
}
