package com.nvm.nvmstore.repository.location;

import com.nvm.nvmstore.entity.Wards;
import com.nvm.nvmstore.response.location.WardsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WardsRepository extends JpaRepository<Wards,String> {

    @Query(value = """
            SELECT code as code,full_name as full_name FROM wards WHERE district_code like CONCAT("%",:district_code,"%")
            """,nativeQuery = true)
    List<WardsResponse> getAllByDistrictsCode(String district_code);

    @Query(value = """
            SELECT code FROM wards WHERE BINARY full_name = :full_name
            """,nativeQuery = true)
    String getCodeByFullName(String full_name);

    @Query(value = """
            SELECT full_name FROM wards WHERE code like CONCAT("%",:code,"%")
            """,nativeQuery = true)
    String getFullNameByCode(String code);
}
