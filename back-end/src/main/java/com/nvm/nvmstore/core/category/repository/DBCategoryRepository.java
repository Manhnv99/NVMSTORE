package com.nvm.nvmstore.core.category.repository;

import com.nvm.nvmstore.core.category.model.response.CategoryResponse;
import com.nvm.nvmstore.entity.Category;
import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import com.nvm.nvmstore.repository.CategoryRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBCategoryRepository extends CategoryRepository {

    @Query("""
            select new com.nvm.nvmstore.core.category.model.response.CategoryResponse(c.id,c.name,c.updated_at,c.status)
            from Category c order by c.id desc
            """)
    List<CategoryResponse> getAllPaging(Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.core.category.model.response.CategoryResponse(c.id,c.name,c.updated_at,c.status)
            from Category c order by c.id desc
            """)
    List<CategoryResponse> getAll();

    @Query("""
            select new com.nvm.nvmstore.core.category.model.response.CategoryResponse(c.id,c.name,c.updated_at,c.status)
            from Category c where
            (
            (:input is null or c.name like %:input%) and
            (:status is null or c.status=:status ))
            order by c.id desc
            """)
    List<CategoryResponse> searchCategory(String input, Entity_Status status, Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.core.category.model.response.CategoryResponse(c.id,c.name,c.updated_at,c.status)
            from Category c where
            (
            (:input is null or c.name like %:input%) and
            (:status is null or c.status=:status ))
            """)
    List<CategoryResponse> getTotalPageSearch(String input, Entity_Status status);


    @Query(value = """
                select count(*) from category            
                """,nativeQuery = true)
    Integer getAllTotalPage();

    @Query("""
            select c from Category c where c.name=:name
            """)
    Category getCategoryByName(String name);

    @Query(value = """
            select * from category order by category.id desc limit 1
            """,nativeQuery = true)
    Category getNewest();
}
