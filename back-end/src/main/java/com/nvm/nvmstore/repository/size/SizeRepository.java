package com.nvm.nvmstore.repository.size;

import com.nvm.nvmstore.entity.Color;
import com.nvm.nvmstore.entity.Size;
import com.nvm.nvmstore.response.color.ColorResponse;
import com.nvm.nvmstore.response.size.SizeResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeRepository extends JpaRepository<Size,Long> {

    @Query("""
            select new com.nvm.nvmstore.response.size.SizeResponse(s.id,s.name,s.updated_at,s.Status)
            from Size s order by s.name asc
            """)
    List<SizeResponse> getALl();


    @Query("""
            select s from Size s where s.name=:name
            """)
    Size getSizeByName(String name);

    @Query(value = """
            select * from size order by size.id desc limit 1
            """,nativeQuery = true)
    Size getNewest();
}
