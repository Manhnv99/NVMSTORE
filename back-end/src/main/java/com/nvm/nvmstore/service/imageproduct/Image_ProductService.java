package com.nvm.nvmstore.service.imageproduct;

import com.nvm.nvmstore.request.ImageProduct.PostImageProductRequest;
import com.nvm.nvmstore.response.product.productDetailImage.ImageProductResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ProductDetailImageResponse;

import java.io.IOException;
import java.util.List;


public interface Image_ProductService {

    void postImageProduct(PostImageProductRequest postImageProductRequest) throws IOException;

    void deleteImageProduct(Long image_product_id,String image_id) throws IOException;

    //Product Image
    ProductDetailImageResponse getReferenceProduct_ProductDetail(Long product_detail_id);

    List<ImageProductResponse> getAllImageProductById(Long product_detail_id);

    List<ImageProductResponse> getAllImageProduct();
}
