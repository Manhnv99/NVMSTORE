package com.nvm.nvmstore.core.brand.repository;

import com.nvm.nvmstore.core.brand.model.response.BrandResponse;
import com.nvm.nvmstore.entity.Brand;
import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import com.nvm.nvmstore.repository.BrandRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBBrandRepository extends BrandRepository {

    @Query("""
            select new com.nvm.nvmstore.core.brand.model.response.BrandResponse(b.id,b.name,b.updated_at,b.status)
            from Brand b order by b.id desc
            """)
    List<BrandResponse> getAllPaging(Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.core.brand.model.response.BrandResponse(b.id,b.name,b.updated_at,b.status)
            from Brand b order by b.id desc
            """)
    List<BrandResponse> getAll();

    @Query("""
            select new com.nvm.nvmstore.core.brand.model.response.BrandResponse(b.id,b.name,b.updated_at,b.status)
            from Brand b where
            (
            (:input is null or b.name like %:input%) and
            (:status is null or b.status=:status ))
            order by b.id desc
            """)
    List<BrandResponse> searchBrand(String input, Entity_Status status, Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.core.brand.model.response.BrandResponse(b.id,b.name,b.updated_at,b.status)
            from Brand b where
            (
            (:input is null or b.name like %:input%) and
            (:status is null or b.status=:status ))
            """)
    List<BrandResponse> getTotalPageSearch(String input, Entity_Status status);


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
