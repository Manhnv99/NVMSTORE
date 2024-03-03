package com.nvm.nvmstore.core.product_detail.repository;

import com.nvm.nvmstore.core.product_detail.model.response.Status_ProductDetailResponse;
import com.nvm.nvmstore.entity.Status_ProductDetail;
import com.nvm.nvmstore.repository.Status_ProductDetailRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBStatus_ProductDetailRepository extends Status_ProductDetailRepository {

    @Query("""
            select new com.nvm.nvmstore.core.product_detail.model.response.Status_ProductDetailResponse(s.id,s.name,s.updated_at,s.status)
            from Status_ProductDetail s order by s.id desc
            """)
    List<Status_ProductDetailResponse> getALl();


    @Query("""
            select s from Status_ProductDetail s where s.name=:name
            """)
    Status_ProductDetail getStatus_ProductDetailByName(String name);

    @Query(value = """
            select * from status_product_detail order by status_product_detail.id desc limit 1
            """,nativeQuery = true)
    Status_ProductDetail getNewest();
}
