package com.nvm.nvmstore.repository.location;

import com.nvm.nvmstore.entity.Provinces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProvincesRepository extends JpaRepository<Provinces,String> {
}
