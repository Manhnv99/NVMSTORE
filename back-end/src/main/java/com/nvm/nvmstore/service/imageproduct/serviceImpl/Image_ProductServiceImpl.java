package com.nvm.nvmstore.service.imageproduct.serviceImpl;

import com.nvm.nvmstore.entity.Image_Product;
import com.nvm.nvmstore.entity.Product_Detail;
import com.nvm.nvmstore.repository.imageproduct.ImageProductRepository;
import com.nvm.nvmstore.repository.productdetail.Product_DetailRepository;
import com.nvm.nvmstore.request.ImageProduct.PostImageProductRequest;
import com.nvm.nvmstore.response.product.productDetailImage.ImageProductResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ProductDetailImageResponse;
import com.nvm.nvmstore.service.cloudinary.CloudinaryService;
import com.nvm.nvmstore.service.imageproduct.Image_ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class Image_ProductServiceImpl implements Image_ProductService {

    @Autowired
    private ImageProductRepository imageProductRepository;

    @Autowired
    private Product_DetailRepository product_detailRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Override
    public void postImageProduct(PostImageProductRequest postImageProductRequest) {
        Image_Product image_product_add=new Image_Product();
        Optional<Product_Detail> product_detail=product_detailRepository.findById(postImageProductRequest.getProduct_detail_id());
        product_detail.ifPresent(image_product_add::setProduct_detail_id);
        image_product_add.setImage_id(postImageProductRequest.getImage_id());
        image_product_add.setImage_url(postImageProductRequest.getImage_url());
        image_product_add.setCreated_at(new Date());
        image_product_add.setUpdated_at(new Date());
        imageProductRepository.save(image_product_add);
    }

    @Override
    public void deleteImageProduct(Long image_product_id,String image_id) throws IOException {
        imageProductRepository.deleteById(image_product_id);
        cloudinaryService.delete(image_id);
    }

    //Product Image Detail
    @Override
    public ProductDetailImageResponse getReferenceProduct_ProductDetail(Long product_detail_id) {
        return imageProductRepository.getReferenceProduct_ProductDetail(product_detail_id);
    }

    @Override
    public List<ImageProductResponse> getAllImageProductById(Long product_detail_id) {
        return imageProductRepository.getAllImageProductById(product_detail_id);
    }

    @Override
    public List<ImageProductResponse> getAllImageProduct() {
        return imageProductRepository.getAllImageProduct();
    }
}
