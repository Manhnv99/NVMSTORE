package com.nvm.nvmstore.core.category.service;

import com.nvm.nvmstore.entity.Category;
import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import com.nvm.nvmstore.core.category.model.request.CategoryRequest;
import com.nvm.nvmstore.core.category.model.response.CategoryResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getAllPaging(Pageable pageable);

    List<CategoryResponse> getAll( );

    List<CategoryResponse> searchCategory(String input, Entity_Status status, Pageable pageable);

    Double getTotalPageSearch(String input, Entity_Status status);

    Double getAllTotalPage();

    String addCategory(CategoryRequest categoryRequest);

    void updateCategory(Long id,CategoryRequest categoryRequest);

    Category getById(Long id);

}
