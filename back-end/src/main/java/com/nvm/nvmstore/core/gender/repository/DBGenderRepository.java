package com.nvm.nvmstore.core.gender.repository;

import com.nvm.nvmstore.core.gender.model.response.GenderResponse;
import com.nvm.nvmstore.entity.Gender;
import com.nvm.nvmstore.repository.GenderRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBGenderRepository extends GenderRepository {

    @Query("""
            select new com.nvm.nvmstore.core.gender.model.response.GenderResponse(g.id,g.name,g.updated_at,g.status)
            from Gender g order by g.id desc
            """)
    List<GenderResponse> getALl();


    @Query("""
            select g from Gender g where g.name=:name
            """)
    Gender getGenderByName(String name);

    @Query(value = """
            select * from gender order by gender.id desc limit 1
            """,nativeQuery = true)
    Gender getNewest();
}
