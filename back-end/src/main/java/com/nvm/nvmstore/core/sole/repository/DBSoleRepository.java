package com.nvm.nvmstore.core.sole.repository;

import com.nvm.nvmstore.core.sole.model.response.SoleResponse;
import com.nvm.nvmstore.entity.Sole;
import com.nvm.nvmstore.infrastructure.constant.Entity_Status;
import com.nvm.nvmstore.repository.SoleRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBSoleRepository extends SoleRepository {

    @Query("""
            select new com.nvm.nvmstore.core.sole.model.response.SoleResponse(s.id,s.name,s.updated_at,s.status)
            from Sole s order by s.id desc
            """)
    List<SoleResponse> getAllPaging(Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.core.sole.model.response.SoleResponse(s.id,s.name,s.updated_at,s.status)
            from Sole s order by s.id desc
            """)
    List<SoleResponse> getAll();

    @Query("""
            select new com.nvm.nvmstore.core.sole.model.response.SoleResponse(s.id,s.name,s.updated_at,s.status)
            from Sole s where
            (
            (:input is null or s.name like %:input%) and
            (:status is null or s.status=:status ))
            order by s.id desc
            """)
    List<SoleResponse> searchSole(String input, Entity_Status status, Pageable pageable);

    @Query("""
            select new com.nvm.nvmstore.core.sole.model.response.SoleResponse(s.id,s.name,s.updated_at,s.status)
            from Sole s where
            (
            (:input is null or s.name like %:input%) and
            (:status is null or s.status=:status ))
            """)
    List<SoleResponse> getTotalPageSearch(String input, Entity_Status status);


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
