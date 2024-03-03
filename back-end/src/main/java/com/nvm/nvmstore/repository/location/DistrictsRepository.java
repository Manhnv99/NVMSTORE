package com.nvm.nvmstore.repository.location;

import com.nvm.nvmstore.entity.Districts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistrictsRepository extends JpaRepository<Districts,String> {
}
