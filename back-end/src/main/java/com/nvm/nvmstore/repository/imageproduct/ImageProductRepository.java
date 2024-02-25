package com.nvm.nvmstore.repository.imageproduct;

import com.nvm.nvmstore.entity.Image_Product;
import com.nvm.nvmstore.response.product.productDetailImage.ImageProductResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ProductDetailImageResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageProductRepository extends JpaRepository<Image_Product,Long> {

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
                    WHERE pd.id=:product_detail_id
            """,nativeQuery = true)
    ProductDetailImageResponse getReferenceProduct_ProductDetail(Long product_detail_id);


    @Query(value = """
            SELECT ip.id AS image_product_id,
            ip.product_detail_id AS product_detail_id,
            ip.image_id AS image_id,
            image_url AS imageURL
            FROM product_detail pd JOIN image_product ip ON pd.id=ip.product_detail_id
            WHERE pd.id=:product_detail_id
            """,nativeQuery = true)
    List<ImageProductResponse> getAllImageProductById(Long product_detail_id);

    @Query(value = """
            SELECT ip.id AS image_product_id,
            ip.product_detail_id AS product_detail_id,
            ip.image_id AS image_id,
            image_url AS imageURL
            FROM image_product ip
            """,nativeQuery = true)
    List<ImageProductResponse> getAllImageProduct();
}
