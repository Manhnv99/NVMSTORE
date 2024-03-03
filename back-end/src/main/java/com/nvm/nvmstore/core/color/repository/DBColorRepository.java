package com.nvm.nvmstore.core.color.repository;

import com.nvm.nvmstore.core.color.model.response.ColorResponse;
import com.nvm.nvmstore.entity.Color;
import com.nvm.nvmstore.repository.ColorRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBColorRepository extends ColorRepository {

    @Query("""
            select new com.nvm.nvmstore.core.color.model.response.ColorResponse(c.id,c.code,c.name,c.updated_at,c.status)
            from Color c order by c.id desc
            """)
    List<ColorResponse> getALl();

    @Query("""
            select c from Color c where c.code=:code
            """)
    Color getColorByCode(String code);

    @Query("""
            select c from Color c where c.name=:name
            """)
    Color getColorByName(String name);

    @Query(value = """
            select * from color order by color.id desc limit 1
            """,nativeQuery = true)
    Color getNewest();
}
