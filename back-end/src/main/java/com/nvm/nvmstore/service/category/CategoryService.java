package com.nvm.nvmstore.service.category;

import com.nvm.nvmstore.entity.Category;
import com.nvm.nvmstore.request.category.CategoryRequest;
import com.nvm.nvmstore.response.category.CategoryResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {

    List<CategoryResponse> getAllPaging(Pageable pageable);

    List<CategoryResponse> getAll( );

    List<CategoryResponse> searchCategory(String input,Boolean status, Pageable pageable);

    Double getTotalPageSearch(String input,Boolean status);

    Double getAllTotalPage();

    String addCategory(CategoryRequest categoryRequest);

    void updateCategory(Long id,CategoryRequest categoryRequest);

    Category getById(Long id);

}
