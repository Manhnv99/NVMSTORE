package com.nvm.nvmstore.service.serviceImpl;

import com.nvm.nvmstore.entity.Image_Product;
import com.nvm.nvmstore.entity.Product_Detail;
import com.nvm.nvmstore.repository.ImageProductRepository;
import com.nvm.nvmstore.repository.Product_DetailRepository;
import com.nvm.nvmstore.request.ImageProduct.ImageProductRequest;
import com.nvm.nvmstore.service.Image_ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class Image_ProductServiceImpl implements Image_ProductService {

    @Autowired
    private ImageProductRepository imageProductRepository;

    @Autowired
    private Product_DetailRepository product_detailRepository;

    @Override
    public void addImageProduct(ImageProductRequest imageProductRequest) {
        Image_Product image_product_add=new Image_Product();
        Optional<Product_Detail> product_detail=product_detailRepository.findById(imageProductRequest.getProduct_detail_id());
        product_detail.ifPresent(image_product_add::setProduct_detail_id);
        image_product_add.setImage_id(imageProductRequest.getImage_id());
        image_product_add.setImage_url(imageProductRequest.getImage_url());
        image_product_add.setCreated_at(new Date());
        image_product_add.setUpdated_at(new Date());
        imageProductRepository.save(image_product_add);
    }
}
