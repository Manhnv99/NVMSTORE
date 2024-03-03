package com.nvm.nvmstore.core.location.repository;

import com.nvm.nvmstore.core.location.model.response.ProvicesResponse;
import com.nvm.nvmstore.repository.location.ProvincesRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBProvincesRepository extends ProvincesRepository {
    @Query(value = """
            SELECT code as code,full_name as full_name FROM provinces
            """,nativeQuery = true)
    List<ProvicesResponse> getAllProvinces();

    @Query(value = """
            SELECT code FROM provinces WHERE BINARY full_name = :full_name
            """,nativeQuery = true)
    String getCodeByFullName(String full_name);

    @Query(value = """
            SELECT full_name FROM provinces where code LIKE CONCAT("%",:code,"%")
            """,nativeQuery = true)
    String getFullNameByCode(String code);
}
