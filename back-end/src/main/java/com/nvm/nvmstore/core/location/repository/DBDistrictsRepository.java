package com.nvm.nvmstore.core.location.repository;

import com.nvm.nvmstore.core.location.model.response.DistrictsResponse;
import com.nvm.nvmstore.repository.location.DistrictsRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBDistrictsRepository extends DistrictsRepository {
    @Query(value = """
            SELECT code as code,full_name as full_name FROM districts WHERE province_code like CONCAT("%",:province_code,"%")
            """,nativeQuery = true)
    List<DistrictsResponse> getAllByProvincesCode(String province_code);

    @Query(value = """
            SELECT code FROM districts WHERE BINARY full_name = :full_name
            """,nativeQuery = true)
    String getCodeByFullName(String full_name);

    @Query(value = """
            SELECT full_name FROM districts WHERE code like CONCAT("%",:code,"%")
            """,nativeQuery = true)
    String getFullNameByCode(String code);
}
