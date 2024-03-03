package com.nvm.nvmstore.core.location.repository;

import com.nvm.nvmstore.core.location.model.response.WardsResponse;
import com.nvm.nvmstore.repository.location.WardsRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBWardsRepository extends WardsRepository {

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
