package com.nvm.nvmstore.repository;

import com.nvm.nvmstore.entity.Product;
import com.nvm.nvmstore.response.product.ProductResponse;
import com.nvm.nvmstore.response.product.productDetail.ProductDetailResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ImageProductResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ProductDetailImageResponse;
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

    @Query(value = """
            select p.id as product_id,p.code as product_code,p.name as product_name,sum(quantity) as sum_quantity from product p join product_detail pd on p.id=pd.product_id group by p.code,p.name,p.id
            """,nativeQuery = true)
    List<ProductResponse> getProductResponse();


    @Query(value = """
            select pd.id as product_detail_id,
            p.name as product_name,
            pd.quantity as product_detail_quantity,
            pd.sell_price as product_detail_sell_price,
            s.name as product_detail_size_name,
            c.code as product_detail_color_code,
            spd.name as product_detail_status
            from product p
            join product_detail pd on p.id=pd.product_id
            join color c on pd.color_id=c.id
            join size s on pd.size_id=s.id
            join status_product_detail spd on spd.id=pd.status_product_detail
            where p.id=:product_id
            """,nativeQuery = true)
    List<ProductDetailResponse> getProductDetailResponse(Long product_id);


    @Query(value = """
            select p.id as product_id,
            pd.id as product_detail_id,
            p.name as product_name,
            p.description as product_description,
            pd.quantity as product_detail_quantity,
            b.name as product_detail_brand_name,
            mate.name as product_detail_material_name,
            gen.name as product_detail_gender_name,
            sole.name as product_detail_sole_name,
            cate.name as product_detail_category_name,
            pd.sell_price as product_detail_sell_price,
            s.name as product_detail_size_name,
            c.code as product_detail_color_code,
            spd.name as product_detail_status
            from product p
            join product_detail pd on p.id=pd.product_id
            join color c on pd.color_id=c.id
            join size s on pd.size_id=s.id
            join brand b on b.id=p.brand_id
            join category cate on cate.id=p.category_id
            join gender gen on gen.id=p.gender_id
            join material mate on mate.id=p.material_id
            join sole on sole.id=p.sole_id
            join status_product_detail spd on spd.id=pd.status_product_detail
            where pd.id=:product_detail_id
            """,nativeQuery = true)
    ProductDetailImageResponse getProductDetailImageResponse(Long product_detail_id);


    @Query(value = """
            select image_url as imageURL from product_detail pd join image_product ip on pd.id=ip.product_detail_id where pd.id=:product_detail_id
            """,nativeQuery = true)
    List<ImageProductResponse> getImageProductResponse(Long product_detail_id);
}
