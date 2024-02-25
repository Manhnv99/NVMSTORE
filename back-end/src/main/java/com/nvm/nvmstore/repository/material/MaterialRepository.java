package com.nvm.nvmstore.repository.material;


import com.nvm.nvmstore.entity.Material;
import com.nvm.nvmstore.response.material.MaterialResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material,Long> {
    @Query("""
            select new com.nvm.nvmstore.response.material.MaterialResponse(m.id,m.name,m.updated_at,m.Status)
            from Material m order by m.id desc
            """)
    List<MaterialResponse> getAllPaging(Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.response.material.MaterialResponse(m.id,m.name,m.updated_at,m.Status)
            from Material m order by m.id desc
            """)
    List<MaterialResponse> getAll();

    @Query("""
            select new com.nvm.nvmstore.response.material.MaterialResponse(m.id,m.name,m.updated_at,m.Status)
            from Material m where
            (
            (:input is null or m.name like %:input%) and
            (:status is null or m.Status=:status ))
            order by m.id desc
            """)
    List<MaterialResponse> searchMaterial(String input,Boolean status,Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.response.material.MaterialResponse(m.id,m.name,m.updated_at,m.Status)
            from Material m where
            (
            (:input is null or m.name like %:input%) and
            (:status is null or m.Status=:status ))
            """)
    List<MaterialResponse> getTotalPageSearch(String input, Boolean status);


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
