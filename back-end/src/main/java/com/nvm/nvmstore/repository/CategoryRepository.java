package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Category;
import com.nvm.nvmstore.response.category.CategoryResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Long> {

    @Query("""
            select new com.nvm.nvmstore.response.category.CategoryResponse(c.id,c.name,c.updated_at,c.Status)
            from Category c order by c.id desc
            """)
    List<CategoryResponse> getAllPaging(Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.response.category.CategoryResponse(c.id,c.name,c.updated_at,c.Status)
            from Category c order by c.id desc
            """)
    List<CategoryResponse> getAll();

    @Query("""
            select new com.nvm.nvmstore.response.category.CategoryResponse(c.id,c.name,c.updated_at,c.Status)
            from Category c where
            (
            (:input is null or c.name like %:input%) and
            (:status is null or c.Status=:status ))
            order by c.id desc
            """)
    List<CategoryResponse> searchCategory(String input,Boolean status,Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.response.category.CategoryResponse(c.id,c.name,c.updated_at,c.Status)
            from Category c where
            (
            (:input is null or c.name like %:input%) and
            (:status is null or c.Status=:status ))
            """)
    List<CategoryResponse> getTotalPageSearch(String input, Boolean status);


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
