package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Status_ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Status_ProductDetailRepository extends JpaRepository<Status_ProductDetail,Long> {
}
