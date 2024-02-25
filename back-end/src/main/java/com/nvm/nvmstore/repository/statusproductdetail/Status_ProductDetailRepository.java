package com.nvm.nvmstore.repository.statusproductdetail;

import com.nvm.nvmstore.entity.Status_ProductDetail;
import com.nvm.nvmstore.response.status_productdetail.Status_ProductDetailResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Status_ProductDetailRepository extends JpaRepository<Status_ProductDetail,Long> {

    @Query("""
            select new com.nvm.nvmstore.response.status_productdetail.Status_ProductDetailResponse(s.id,s.name,s.updated_at,s.status)
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
