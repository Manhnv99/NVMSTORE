package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Product_Detail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Product_DetailRepository extends JpaRepository<Product_Detail,Long> {
}
