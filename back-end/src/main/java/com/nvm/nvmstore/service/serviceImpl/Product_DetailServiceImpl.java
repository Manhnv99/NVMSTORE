package com.nvm.nvmstore.service.serviceImpl;

import com.nvm.nvmstore.entity.*;
import com.nvm.nvmstore.repository.*;
import com.nvm.nvmstore.request.productdetail.ProductDetailRequest;
import com.nvm.nvmstore.service.Product_DetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class Product_DetailServiceImpl implements Product_DetailService {

    @Autowired
    private Product_DetailRepository product_detailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ColorRepository colorRepository;

    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private Status_ProductDetailRepository status_productDetailRepository;

    @Override
    public Long addProduct_Detail(ProductDetailRequest productDetailRequest) {
        Product_Detail product_detailAdd=new Product_Detail();
        Optional<Product> productOptional=productRepository.findById(productDetailRequest.getProduct_id());
        Optional<Status_ProductDetail> status_productDetailOptional= status_productDetailRepository.findById(productDetailRequest.getStatus_product_detail_id());
        productOptional.ifPresent(product_detailAdd::setProduct_id);
        product_detailAdd.setColor_id(colorRepository.getColorByName(productDetailRequest.getColor_name()));
        product_detailAdd.setSize_id(sizeRepository.getSizeByName(productDetailRequest.getSize_name()));
        status_productDetailOptional.ifPresent(product_detailAdd::setStatus_productDetail_id);
        product_detailAdd.setQuantity(productDetailRequest.getQuantity());
        product_detailAdd.setSell_price(productDetailRequest.getSell_price());
        product_detailAdd.setCreated_at(new Date());
        product_detailAdd.setUpdated_at(new Date());
        Product_Detail product_detail_response=product_detailRepository.save(product_detailAdd);
        return product_detail_response.getId();
    }
}
