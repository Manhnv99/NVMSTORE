package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Product_Detail;
import com.nvm.nvmstore.core.product_detail.model.response.ProductDetailResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Product_DetailRepository extends JpaRepository<Product_Detail,Long> {
}
