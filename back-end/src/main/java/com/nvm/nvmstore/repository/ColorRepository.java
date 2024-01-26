package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Color;
import com.nvm.nvmstore.response.color.ColorResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color,Long> {
    @Query("""
            select new com.nvm.nvmstore.response.color.ColorResponse(c.id,c.name,c.updated_at,c.Status)
            from Color c order by c.id desc
            """)
    List<ColorResponse> getALl();


    @Query("""
            select c from Color c where c.name=:name
            """)
    Color getColorByName(String name);

    @Query(value = """
            select * from color order by color.id desc limit 1
            """,nativeQuery = true)
    Color getNewest();
}
