package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Image_Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageProductRepository extends JpaRepository<Image_Product,Long> {
}
