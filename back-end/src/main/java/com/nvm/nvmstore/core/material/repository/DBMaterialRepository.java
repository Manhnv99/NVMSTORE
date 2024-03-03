package com.nvm.nvmstore.core.material.repository;

import com.nvm.nvmstore.core.material.model.response.MaterialResponse;
import com.nvm.nvmstore.entity.Material;
import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import com.nvm.nvmstore.repository.MaterialRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBMaterialRepository extends MaterialRepository {

    @Query("""
            select new com.nvm.nvmstore.core.material.model.response.MaterialResponse(m.id,m.name,m.updated_at,m.status)
            from Material m order by m.id desc
            """)
    List<MaterialResponse> getAllPaging(Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.core.material.model.response.MaterialResponse(m.id,m.name,m.updated_at,m.status)
            from Material m order by m.id desc
            """)
    List<MaterialResponse> getAll();

    @Query("""
            select new com.nvm.nvmstore.core.material.model.response.MaterialResponse(m.id,m.name,m.updated_at,m.status)
            from Material m where
            (
            (:input is null or m.name like %:input%) and
            (:status is null or m.status=:status ))
            order by m.id desc
            """)
    List<MaterialResponse> searchMaterial(String input, Entity_Status status, Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.core.material.model.response.MaterialResponse(m.id,m.name,m.updated_at,m.status)
            from Material m where
            (
            (:input is null or m.name like %:input%) and
            (:status is null or m.status=:status ))
            """)
    List<MaterialResponse> getTotalPageSearch(String input, Entity_Status status);


    @Query(value = """
                select count(*) from material            
                """,nativeQuery = true)
    Integer getAllTotalPage();

    @Query("""
            select m from Material m where m.name=:name
            """)
    Material getMaterialByName(String name);

    @Query(value = """
            select * from material order by material.id desc limit 1
            """,nativeQuery = true)
    Material getNewest();
}
