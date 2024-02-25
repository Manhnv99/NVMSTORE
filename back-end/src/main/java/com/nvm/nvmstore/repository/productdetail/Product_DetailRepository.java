package com.nvm.nvmstore.repository.productdetail;

import com.nvm.nvmstore.entity.Product_Detail;
import com.nvm.nvmstore.response.product.productDetail.ProductDetailResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Product_DetailRepository extends JpaRepository<Product_Detail,Long> {

    //Product Detail
    @Query(value = """
            SELECT  p.id AS product_id,
                    pd.id AS product_detail_id,
                    p.name AS product_name,
                    pd.description AS product_description,
                    pd.quantity AS product_detail_quantity,
                    b.name AS product_detail_brand_name,
                    mate.name AS product_detail_material_name,
                    gen.name AS product_detail_gender_name,
                    sole.name AS product_detail_sole_name,
                    cate.name AS product_detail_category_name,
                    pd.sell_price AS product_detail_sell_price,
                    s.name AS product_detail_size_name,
                    c.name AS product_detail_color_name,
                    c.code AS product_detail_color_code,
                    spd.name AS product_detail_status_name
                    FROM product p
                    JOIN product_detail pd ON p.id=pd.product_id
                    JOIN color c ON pd.color_id=c.id
                    JOIN size s ON pd.size_id=s.id
                    JOIN brand b ON b.id=pd.brand_id
                    JOIN category cate ON cate.id=pd.category_id
                    JOIN gender gen ON gen.id=pd.gender_id
                    JOIN material mate ON mate.id=pd.material_id
                    JOIN sole ON sole.id=pd.sole_id
                    JOIN status_product_detail spd ON spd.id=pd.status_product_detail
            """,nativeQuery = true)
    List<ProductDetailResponse> getAllProductDetail(Pageable pageable);


    @Query(value = """
            
            SELECT count(*) FROM (
            SELECT  p.id AS product_id,
                    pd.id AS product_detail_id,
                    p.name AS product_name,
                    pd.description AS product_description,
                    pd.quantity AS product_detail_quantity,
                    b.name AS product_detail_brand_name,
                    mate.name AS product_detail_material_name,
                    gen.name AS product_detail_gender_name,
                    sole.name AS product_detail_sole_name,
                    cate.name AS product_detail_category_name,
                    pd.sell_price AS product_detail_sell_price,
                    s.name AS product_detail_size_name,
                    c.name AS product_detail_color_name,
                    c.code AS product_detail_color_code,
                    spd.name AS product_detail_status_name
                    FROM product p
                    JOIN product_detail pd ON p.id=pd.product_id
                    JOIN color c ON pd.color_id=c.id
                    JOIN size s ON pd.size_id=s.id
                    JOIN brand b ON b.id=pd.brand_id
                    JOIN category cate ON cate.id=pd.category_id
                    JOIN gender gen ON gen.id=pd.gender_id
                    JOIN material mate ON mate.id=pd.material_id
                    JOIN sole ON sole.id=pd.sole_id
                    JOIN status_product_detail spd ON spd.id=pd.status_product_detail
            ) AS subquery;
            """,nativeQuery = true)
    Integer getTotalPageProductDetail();


    @Query(value = """
            SELECT  p.id AS product_id,
                    pd.id AS product_detail_id,
                    p.name AS product_name,
                    pd.description AS product_description,
                    pd.quantity AS product_detail_quantity,
                    b.name AS product_detail_brand_name,
                    mate.name AS product_detail_material_name,
                    gen.name AS product_detail_gender_name,
                    sole.name AS product_detail_sole_name,
                    cate.name AS product_detail_category_name,
                    pd.sell_price AS product_detail_sell_price,
                    s.name AS product_detail_size_name,
                    c.name AS product_detail_color_name,
                    c.code AS product_detail_color_code,
                    spd.name AS product_detail_status_name
                    FROM product p
                    JOIN product_detail pd ON p.id=pd.product_id
                    JOIN color c ON pd.color_id=c.id
                    JOIN size s ON pd.size_id=s.id
                    JOIN brand b ON b.id=pd.brand_id
                    JOIN category cate ON cate.id=pd.category_id
                    JOIN gender gen ON gen.id=pd.gender_id
                    JOIN material mate ON mate.id=pd.material_id
                    JOIN sole ON sole.id=pd.sole_id
                    JOIN status_product_detail spd ON spd.id=pd.status_product_detail
                    WHERE
                    mate.id = IFNULL(NULLIF(:materialId, ''), mate.id) AND
                    b.id = IFNULL(NULLIF(:brandId, ''), b.id) AND
                    sole.id = IFNULL(NULLIF(:soleId, ''), sole.id) AND
                    s.id = IFNULL(NULLIF(:sizeId, ''), s.id) AND
                    c.id = IFNULL(NULLIF(:colorId, ''), c.id) AND
                    cate.id = IFNULL(NULLIF(:categoryId, ''), cate.id) AND
                    spd.id = IFNULL(NULLIF(:spdId, ''), spd.id) AND
                    gen.id = IFNULL(NULLIF(:genderId, ''), gen.id)
                     
            """,nativeQuery = true)
    List<ProductDetailResponse> searchProductDetail(Long materialId,Long brandId,Long soleId,Long sizeId,Long colorId,Long categoryId,
                                                               Long spdId,Long genderId,Pageable pageable);



    @Query(value = """
            SELECT COUNT(*) FROM (
            SELECT  p.id AS product_id,
                    pd.id AS product_detail_id,
                    p.name AS product_name,
                    pd.description AS product_description,
                    pd.quantity AS product_detail_quantity,
                    b.name AS product_detail_brand_name,
                    mate.name AS product_detail_material_name,
                    gen.name AS product_detail_gender_name,
                    sole.name AS product_detail_sole_name,
                    cate.name AS product_detail_category_name,
                    pd.sell_price AS product_detail_sell_price,
                    s.name AS product_detail_size_name,
                    c.name AS product_detail_color_name,
                    c.code AS product_detail_color_code,
                    spd.name AS product_detail_status_name
                    FROM product p
                    JOIN product_detail pd ON p.id=pd.product_id
                    JOIN color c ON pd.color_id=c.id
                    JOIN size s ON pd.size_id=s.id
                    JOIN brand b ON b.id=pd.brand_id
                    JOIN category cate ON cate.id=pd.category_id
                    JOIN gender gen ON gen.id=pd.gender_id
                    JOIN material mate ON mate.id=pd.material_id
                    JOIN sole ON sole.id=pd.sole_id
                    JOIN status_product_detail spd ON spd.id=pd.status_product_detail
                    WHERE 
                    mate.id = IFNULL(NULLIF(:materialId, ''), mate.id) AND
                    b.id = IFNULL(NULLIF(:brandId, ''), b.id) AND
                    sole.id = IFNULL(NULLIF(:soleId, ''), sole.id) AND
                    s.id = IFNULL(NULLIF(:sizeId, ''), s.id) AND
                    c.id = IFNULL(NULLIF(:colorId, ''), c.id) AND
                    cate.id = IFNULL(NULLIF(:categoryId, ''), cate.id) AND
                    spd.id = IFNULL(NULLIF(:spdId, ''), spd.id) AND
                    gen.id = IFNULL(NULLIF(:genderId, ''), gen.id)
            ) as subquery;
            """,nativeQuery = true)
    Integer getTotalPageSearchProductDetail(Long materialId,Long brandId,Long soleId,Long sizeId,Long colorId,Long categoryId,
                                                       Long spdId,Long genderId);

    //Product Detail By Product_Id
    @Query(value = """
            SELECT  p.id AS product_id,
                    pd.id AS product_detail_id,
                    p.name AS product_name,
                    pd.description AS product_description,
                    pd.quantity AS product_detail_quantity,
                    b.name AS product_detail_brand_name,
                    mate.name AS product_detail_material_name,
                    gen.name AS product_detail_gender_name,
                    sole.name AS product_detail_sole_name,
                    cate.name AS product_detail_category_name,
                    pd.sell_price AS product_detail_sell_price,
                    s.name AS product_detail_size_name,
                    c.name AS product_detail_color_name,
                    c.code AS product_detail_color_code,
                    spd.name AS product_detail_status_name
                    FROM product p
                    JOIN product_detail pd ON p.id=pd.product_id
                    JOIN color c ON pd.color_id=c.id
                    JOIN size s ON pd.size_id=s.id
                    JOIN brand b ON b.id=pd.brand_id
                    JOIN category cate ON cate.id=pd.category_id
                    JOIN gender gen ON gen.id=pd.gender_id
                    JOIN material mate ON mate.id=pd.material_id
                    JOIN sole ON sole.id=pd.sole_id
                    JOIN status_product_detail spd ON spd.id=pd.status_product_detail
                    WHERE p.id = :product_id
            """,nativeQuery = true)
    List<ProductDetailResponse> getAllProductDetailByProductId(Long product_id, Pageable pageable);


    @Query(value = """
            
            SELECT count(*) FROM (
            SELECT  p.id AS product_id,
                    pd.id AS product_detail_id,
                    p.name AS product_name,
                    pd.description AS product_description,
                    pd.quantity AS product_detail_quantity,
                    b.name AS product_detail_brand_name,
                    mate.name AS product_detail_material_name,
                    gen.name AS product_detail_gender_name,
                    sole.name AS product_detail_sole_name,
                    cate.name AS product_detail_category_name,
                    pd.sell_price AS product_detail_sell_price,
                    s.name AS product_detail_size_name,
                    c.name AS product_detail_color_name,
                    c.code AS product_detail_color_code,
                    spd.name AS product_detail_status_name
                    FROM product p
                    JOIN product_detail pd ON p.id=pd.product_id
                    JOIN color c ON pd.color_id=c.id
                    JOIN size s ON pd.size_id=s.id
                    JOIN brand b ON b.id=pd.brand_id
                    JOIN category cate ON cate.id=pd.category_id
                    JOIN gender gen ON gen.id=pd.gender_id
                    JOIN material mate ON mate.id=pd.material_id
                    JOIN sole ON sole.id=pd.sole_id
                    JOIN status_product_detail spd ON spd.id=pd.status_product_detail
                    WHERE p.id = :product_id
            ) AS subquery;
            """,nativeQuery = true)
    Integer getTotalPageProductDetailByProductId(Long product_id);


    @Query(value = """
            SELECT  p.id AS product_id,
                    pd.id AS product_detail_id,
                    p.name AS product_name,
                    pd.description AS product_description,
                    pd.quantity AS product_detail_quantity,
                    b.name AS product_detail_brand_name,
                    mate.name AS product_detail_material_name,
                    gen.name AS product_detail_gender_name,
                    sole.name AS product_detail_sole_name,
                    cate.name AS product_detail_category_name,
                    pd.sell_price AS product_detail_sell_price,
                    s.name AS product_detail_size_name,
                    c.name AS product_detail_color_name,
                    c.code AS product_detail_color_code,
                    spd.name AS product_detail_status_name
                    FROM product p
                    JOIN product_detail pd ON p.id=pd.product_id
                    JOIN color c ON pd.color_id=c.id
                    JOIN size s ON pd.size_id=s.id
                    JOIN brand b ON b.id=pd.brand_id
                    JOIN category cate ON cate.id=pd.category_id
                    JOIN gender gen ON gen.id=pd.gender_id
                    JOIN material mate ON mate.id=pd.material_id
                    JOIN sole ON sole.id=pd.sole_id
                    JOIN status_product_detail spd ON spd.id=pd.status_product_detail
                    WHERE p.id = :product_id
                    AND mate.id = IFNULL(NULLIF(:materialId, ''), mate.id)
                    AND b.id = IFNULL(NULLIF(:brandId, ''), b.id)
                    AND sole.id = IFNULL(NULLIF(:soleId, ''), sole.id)
                    AND s.id = IFNULL(NULLIF(:sizeId, ''), s.id)
                    AND c.id = IFNULL(NULLIF(:colorId, ''), c.id)
                    AND cate.id = IFNULL(NULLIF(:categoryId, ''), cate.id)
                    AND spd.id = IFNULL(NULLIF(:spdId, ''), spd.id)
                    AND gen.id = IFNULL(NULLIF(:genderId, ''), gen.id)
                     
            """,nativeQuery = true)
    List<ProductDetailResponse> searchProductDetailByProductId(Long product_id,Long materialId,Long brandId,Long soleId,Long sizeId,Long colorId,Long categoryId,
                                                            Long spdId,Long genderId,Pageable pageable);



    @Query(value = """
            SELECT COUNT(*) FROM (
            SELECT  p.id AS product_id,
                    pd.id AS product_detail_id,
                    p.name AS product_name,
                    pd.description AS product_description,
                    pd.quantity AS product_detail_quantity,
                    b.name AS product_detail_brand_name,
                    mate.name AS product_detail_material_name,
                    gen.name AS product_detail_gender_name,
                    sole.name AS product_detail_sole_name,
                    cate.name AS product_detail_category_name,
                    pd.sell_price AS product_detail_sell_price,
                    s.name AS product_detail_size_name,
                    c.name AS product_detail_color_name,
                    c.code AS product_detail_color_code,
                    spd.name AS product_detail_status_name
                    FROM product p
                    JOIN product_detail pd ON p.id=pd.product_id
                    JOIN color c ON pd.color_id=c.id
                    JOIN size s ON pd.size_id=s.id
                    JOIN brand b ON b.id=pd.brand_id
                    JOIN category cate ON cate.id=pd.category_id
                    JOIN gender gen ON gen.id=pd.gender_id
                    JOIN material mate ON mate.id=pd.material_id
                    JOIN sole ON sole.id=pd.sole_id
                    JOIN status_product_detail spd ON spd.id=pd.status_product_detail
                    WHERE p.id = :product_id
                    AND mate.id = IFNULL(NULLIF(:materialId, ''), mate.id)
                    AND b.id = IFNULL(NULLIF(:brandId, ''), b.id)
                    AND sole.id = IFNULL(NULLIF(:soleId, ''), sole.id)
                    AND s.id = IFNULL(NULLIF(:sizeId, ''), s.id)
                    AND c.id = IFNULL(NULLIF(:colorId, ''), c.id)
                    AND cate.id = IFNULL(NULLIF(:categoryId, ''), cate.id)
                    AND spd.id = IFNULL(NULLIF(:spdId, ''), spd.id)
                    AND gen.id = IFNULL(NULLIF(:genderId, ''), gen.id)
            ) as subquery;
            """,nativeQuery = true)
    Integer getTotalPageSearchProductDetailByProductId(Long product_id,Long materialId,Long brandId,Long soleId,Long sizeId,Long colorId,Long categoryId,
                                                    Long spdId,Long genderId);
}
