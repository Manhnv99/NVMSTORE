package com.nvm.nvmstore.repository.location;

import com.nvm.nvmstore.entity.Provinces;
import com.nvm.nvmstore.response.location.ProvicesResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProvincesRepository extends JpaRepository<Provinces,String> {

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
