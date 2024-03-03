package com.nvm.nvmstore.repository.location;

import com.nvm.nvmstore.entity.Wards;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WardsRepository extends JpaRepository<Wards,String> {
}
