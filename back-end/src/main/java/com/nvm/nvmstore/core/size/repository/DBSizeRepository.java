package com.nvm.nvmstore.core.size.repository;

import com.nvm.nvmstore.core.size.model.response.SizeResponse;
import com.nvm.nvmstore.entity.Size;
import com.nvm.nvmstore.repository.SizeRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBSizeRepository extends SizeRepository {

    @Query("""
            select new com.nvm.nvmstore.core.size.model.response.SizeResponse(s.id,s.name,s.updated_at,s.status)
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
