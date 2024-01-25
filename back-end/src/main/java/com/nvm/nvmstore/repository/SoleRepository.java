package com.nvm.nvmstore.repository;


import com.nvm.nvmstore.entity.Sole;
import com.nvm.nvmstore.response.sole.SoleResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SoleRepository extends JpaRepository<Sole,Long> {

    @Query("""
            select new com.nvm.nvmstore.response.sole.SoleResponse(s.id,s.name,s.updated_at,s.Status)
            from Sole s order by s.id desc
            """)
    List<SoleResponse> getAllPaging(Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.response.sole.SoleResponse(s.id,s.name,s.updated_at,s.Status)
            from Sole s order by s.id desc
            """)
    List<SoleResponse> getAll();

    @Query("""
            select new com.nvm.nvmstore.response.sole.SoleResponse(s.id,s.name,s.updated_at,s.Status)
            from Sole s where
            (
            (:input is null or s.name like %:input%) and
            (:status is null or s.Status=:status ))
            order by s.id desc
            """)
    List<SoleResponse> searchSole(String input,Boolean status,Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.response.sole.SoleResponse(s.id,s.name,s.updated_at,s.Status)
            from Sole s where
            (
            (:input is null or s.name like %:input%) and
            (:status is null or s.Status=:status ))
            """)
    List<SoleResponse> getTotalPageSearch(String input, Boolean status);


    @Query(value = """
                select count(*) from sole            
                """,nativeQuery = true)
    Integer getAllTotalPage();

    @Query("""
            select s from Sole s where s.name=:name
            """)
    Sole getSoleByName(String name);

    @Query(value = """
            select * from sole order by sole.id desc limit 1
            """,nativeQuery = true)
    Sole getNewest();
}
