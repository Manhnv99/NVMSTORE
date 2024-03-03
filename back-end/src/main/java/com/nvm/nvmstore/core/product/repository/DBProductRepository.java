package com.nvm.nvmstore.core.product.repository;

import com.nvm.nvmstore.core.product.model.response.ProductResponse;
import com.nvm.nvmstore.entity.Product;
import com.nvm.nvmstore.repository.ProductRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DBProductRepository extends ProductRepository {
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
    List<ProductResponse> getAllProductPaging(Pageable pageable);


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
    Integer getTotalPageProduct();

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
    List<ProductResponse> searchProduct(String input,Pageable pageable);


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
    Integer getTotalPageSearchProduct(String input);
}
