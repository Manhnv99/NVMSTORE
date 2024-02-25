package com.nvm.nvmstore.repository.location;

import com.nvm.nvmstore.entity.Districts;
import com.nvm.nvmstore.response.location.DistrictsResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictsRepository extends JpaRepository<Districts,String> {

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
