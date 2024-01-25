package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Brand;
import com.nvm.nvmstore.response.brand.BrandResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BrandRepository extends JpaRepository<Brand,Long> {
    @Query("""
            select new com.nvm.nvmstore.response.brand.BrandResponse(b.id,b.name,b.updated_at,b.Status)
            from Brand b order by b.id desc
            """)
    List<BrandResponse> getAllPaging(Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.response.brand.BrandResponse(b.id,b.name,b.updated_at,b.Status)
            from Brand b order by b.id desc
            """)
    List<BrandResponse> getAll();

    @Query("""
            select new com.nvm.nvmstore.response.brand.BrandResponse(b.id,b.name,b.updated_at,b.Status)
            from Brand b where
            (
            (:input is null or b.name like %:input%) and
            (:status is null or b.Status=:status ))
            order by b.id desc
            """)
    List<BrandResponse> searchBrand(String input,Boolean status,Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.response.brand.BrandResponse(b.id,b.name,b.updated_at,b.Status)
            from Brand b where
            (
            (:input is null or b.name like %:input%) and
            (:status is null or b.Status=:status ))
            """)
    List<BrandResponse> getTotalPageSearch(String input, Boolean status);


    @Query(value = """
                select count(*) from brand            
                """,nativeQuery = true)
    Integer getAllTotalPage();

    @Query("""
            select b from Brand b where b.name=:name
            """)
    Brand getBrandByName(String name);

    @Query(value = """
            select * from brand order by brand.id desc limit 1
            """,nativeQuery = true)
    Brand getNewest();
}
