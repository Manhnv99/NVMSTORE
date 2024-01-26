package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Gender;
import com.nvm.nvmstore.response.gender.GenderResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GenderRepository extends JpaRepository<Gender,Long> {

    @Query("""
            select new com.nvm.nvmstore.response.gender.GenderResponse(g.id,g.name,g.updated_at,g.status)
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
