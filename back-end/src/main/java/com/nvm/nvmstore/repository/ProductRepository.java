package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Product;
import com.nvm.nvmstore.response.product.ProductResponse;
import com.nvm.nvmstore.response.product.productDetail.ProductDetailResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ImageProductResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ProductDetailImageResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query(value = """
                select * from product order by product.id desc limit 1
                 """,nativeQuery = true)
    Product getNewest();


    @Query("""
            select p from Product p where p.name=:name
            """)
    Product getProductByName(String name);

    //Product
    @Query(value = """
            select p.id as product_id,
            p.code as product_code,
            p.name as product_name,
            p.status as product_status,
            sum(quantity) as sum_quantity
            from product p join product_detail pd on p.id=pd.product_id group by p.code,p.name,p.id
            """,nativeQuery = true)
    List<ProductResponse> getProductResponse(Pageable pageable);


    @Query(value = """
            SELECT COUNT(*) AS total_count
            FROM (
                SELECT p.id AS product_id,
                        p.code AS product_code,
                        p.name AS product_name,
                        SUM(quantity) AS sum_quantity
                FROM product p
                JOIN product_detail pd ON p.id = pd.product_id
                GROUP BY p.code, p.name, p.id
            ) AS subquery;
            """,nativeQuery = true)
    Integer getTotalPageProductResponse();

    @Query(value = """
            SELECT p.id AS product_id,
                       p.code AS product_code,
                       p.name AS product_name,
                       SUM(quantity) AS sum_quantity
                FROM product p
                JOIN product_detail pd ON p.id = pd.product_id
                WHERE p.code LIKE CONCAT('%', :input, '%')
                    OR p.name LIKE CONCAT('%', :input, '%')
                GROUP BY p.code, p.name, p.id;
            """,nativeQuery = true)
    List<ProductResponse> searchProductResponse(String input,Pageable pageable);


    @Query(value = """
            select count(*) as 'result' from (
                SELECT p.id AS product_id,
                       p.code AS product_code,
                       p.name AS product_name,
                       SUM(quantity) AS sum_quantity
                FROM product p
                JOIN product_detail pd ON p.id = pd.product_id
                WHERE p.code LIKE CONCAT('%', :input, '%')
                    OR p.name LIKE CONCAT('%', :input, '%')
                GROUP BY p.code, p.name, p.id) as subquery ;
            """,nativeQuery = true)
    Integer getTotalPageSearchProductResponse(String input);


    //Product Detail
    @Query(value = """
            SELECT pd.id AS product_detail_id,
            p.name AS product_name,
            pd.quantity AS product_detail_quantity,
            pd.sell_price AS product_detail_sell_price,
            s.name AS product_detail_size_name,
            c.code AS product_detail_color_code,
            spd.name AS product_detail_status
            FROM product p
            JOIN product_detail pd ON p.id=pd.product_id
            JOIN color c ON pd.color_id=c.id
            JOIN size s ON pd.size_id=s.id
            JOIN status_product_detail spd ON spd.id=pd.status_product_detail
            WHERE p.id=:product_id
            """,nativeQuery = true)
    List<ProductDetailResponse> getProductDetailResponse(Long product_id,Pageable pageable);


    @Query(value = """
            SELECT count(*) FROM ( SELECT pd.id AS product_detail_id,
                        p.name AS product_name,
                        pd.quantity AS product_detail_quantity,
                        pd.sell_price AS product_detail_sell_price,
                        s.name AS product_detail_size_name,
                        c.code AS product_detail_color_code,
                        spd.name AS product_detail_status
                        FROM product p
                        JOIN product_detail pd ON p.id=pd.product_id
                        JOIN color c ON pd.color_id=c.id
                        JOIN size s ON pd.size_id=s.id
                        JOIN status_product_detail spd ON spd.id=pd.status_product_detail
                        where p.id=:product_id) AS subquery;
            """,nativeQuery = true)
    Integer getTotalPageProductDetailResponse(Long product_id);


    @Query(value = """
            SELECT pd.id AS product_detail_id,
                   p.name AS product_name,
                   pd.quantity AS product_detail_quantity,
                   pd.sell_price AS product_detail_sell_price,
                   s.name AS product_detail_size_name,
                   c.code AS product_detail_color_code,
                   spd.name AS product_detail_status
            FROM product p
            JOIN product_detail pd ON p.id = pd.product_id
            JOIN material ON material.id = pd.material_id
            JOIN brand ON brand.id = pd.brand_id
            JOIN sole ON sole.id = pd.sole_id
            JOIN category ON category.id = pd.category_id
            JOIN gender ON gender.id = pd.gender_id
            JOIN color c ON c.id = pd.color_id
            JOIN size s ON s.id = pd.size_id
            JOIN status_product_detail spd ON spd.id = pd.status_product_detail
            WHERE p.id =:product_id
            AND material.id = IFNULL(NULLIF(:materialId, ''), material.id)
            AND brand.id = IFNULL(NULLIF(:brandId, ''), brand.id)
            AND sole.id = IFNULL(NULLIF(:soleId, ''), sole.id)
            AND s.id = IFNULL(NULLIF(:sizeId, ''), s.id)
            AND c.id = IFNULL(NULLIF(:colorId, ''), c.id)
            AND category.id = IFNULL(NULLIF(:categoryId, ''), category.id)
            AND spd.id = IFNULL(NULLIF(:spdId, ''), spd.id)
            AND gender.id = IFNULL(NULLIF(:genderId, ''), gender.id)
            """,nativeQuery = true)
    List<ProductDetailResponse> searchProductDetailResponse(Long product_id,Long materialId,Long brandId,Long soleId,Long sizeId,Long colorId,Long categoryId,
                                                            Long spdId,Long genderId,Pageable pageable);



    @Query(value = """
            SELECT COUNT(*) FROM (SELECT pd.id AS product_detail_id,
                   p.name AS product_name,
                   pd.quantity AS product_detail_quantity,
                   pd.sell_price AS product_detail_sell_price,
                   s.name AS product_detail_size_name,
                   c.code AS product_detail_color_code,
                   spd.name AS product_detail_status
            FROM product p
            JOIN product_detail pd ON p.id = pd.product_id
            JOIN material ON material.id = pd.material_id
            JOIN brand ON brand.id = pd.brand_id
            JOIN sole ON sole.id = pd.sole_id
            JOIN category ON category.id = pd.category_id
            JOIN gender ON gender.id = pd.gender_id
            JOIN color c ON c.id = pd.color_id
            JOIN size s ON s.id = pd.size_id
            JOIN status_product_detail spd ON spd.id = pd.status_product_detail
            WHERE p.id =:product_id
            AND material.id = IFNULL(NULLIF(:materialId, ''), material.id)
            AND brand.id = IFNULL(NULLIF(:brandId, ''), brand.id)
            AND sole.id = IFNULL(NULLIF(:soleId, ''), sole.id)
            AND s.id = IFNULL(NULLIF(:sizeId, ''), s.id)
            AND c.id = IFNULL(NULLIF(:colorId, ''), c.id)
            AND category.id = IFNULL(NULLIF(:categoryId, ''), category.id)
            AND spd.id = IFNULL(NULLIF(:spdId, ''), spd.id)
            AND gender.id = IFNULL(NULLIF(:genderId, ''), gender.id)) as subquery;
            """,nativeQuery = true)
    Integer getTotalPageSearchProductDetailResponse(Long product_id,Long materialId,Long brandId,Long soleId,Long sizeId,Long colorId,Long categoryId,
                                                            Long spdId,Long genderId);



    @Query(value = """
            SELECT p.id AS product_id,
            pd.id AS product_detail_id,
            p.name AS product_name,
            pd.description AS product_description,
            pd.quantity AS product_detail_quantity,
            b.id AS product_detail_brand_id,
            mate.id AS product_detail_material_id,
            gen.id AS product_detail_gender_id,
            sole.id AS product_detail_sole_id,
            cate.id AS product_detail_category_id,
            pd.sell_price AS product_detail_sell_price,
            s.id AS product_detail_size_id,
            c.id AS product_detail_color_id,
            spd.id AS product_detail_status_id
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
            WHERE pd.id=:product_detail_id
            """,nativeQuery = true)
    ProductDetailImageResponse getProductDetailImageResponse(Long product_detail_id);


    @Query(value = """
            select image_url as imageURL from product_detail pd join image_product ip on pd.id=ip.product_detail_id where pd.id=:product_detail_id
            """,nativeQuery = true)
    List<ImageProductResponse> getImageProductResponse(Long product_detail_id);
}
