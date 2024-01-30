package com.nvm.nvmstore.service.serviceImpl;

import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import com.nvm.nvmstore.entity.*;
import com.nvm.nvmstore.repository.*;
import com.nvm.nvmstore.request.product.ProductRequest;
import com.nvm.nvmstore.response.product.ProductResponse;
import com.nvm.nvmstore.response.product.productDetail.ProductDetailResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ImageProductResponse;
import com.nvm.nvmstore.response.product.productDetailImage.ProductDetailImageResponse;
import com.nvm.nvmstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private SoleRepository soleRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private GenderRepository genderRepository;

    @Autowired
    private Status_ProductDetailRepository status_productDetailRepository;

    @Override
    public Long addProduct(ProductRequest productRequest) {
        Product productAdd=new Product();
        Map<String,String> keyvalue=new HashMap<>();
        //Set code Product
        //check name
        if(productRepository.getProductByName(productRequest.getName())!=null){
            keyvalue.put("name","Đã Tồn Tại Tên Sản Phẩm Này!");
        }
        //set Code
        if(productRepository.getNewest()==null){
            productAdd.setCode("SP1");
        }else{
            String code=productRepository.getNewest().getCode();//getNewStaff to get Code
            productAdd.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
        }
        //set Name and Description
        productAdd.setName(productRequest.getName());
        productAdd.setDescription(productRequest.getDescription());
        //start check and add Entity
        Optional<Brand> brandOptional=brandRepository.findById(productRequest.getBrand_id());
        if(brandOptional.isPresent()){
            productAdd.setBrand_id(brandOptional.get());
        }else{
            keyvalue.put("brand_id","Không Tìm Thấy Brand Này!");
        }
        Optional<Material> materialOptional=materialRepository.findById(productRequest.getMaterial_id());
        if(materialOptional.isPresent()){
            productAdd.setMaterial_id(materialOptional.get());
        }else{
            keyvalue.put("material_id","Không Tìm Thấy Chất Liệu Này!");
        }
        Optional<Gender> genderOptional=genderRepository.findById(productRequest.getGender_id());
        if(genderOptional.isPresent()){
            productAdd.setGender_id(genderOptional.get());
        }else{
            keyvalue.put("gender_id","Không Tìm Thấy Giới Tính Này!");
        }
        Optional<Sole> soleOptional=soleRepository.findById(productRequest.getSole_id());
        if(soleOptional.isPresent()){
            productAdd.setSole_id(soleOptional.get());
        }else{
            keyvalue.put("sole_id","Không Tìm Thấy Đế Giày Này!");
        }
        Optional<Category> categoryOptional=categoryRepository.findById(productRequest.getCategory_id());
        if(categoryOptional.isPresent()){
            productAdd.setCategory_id(categoryOptional.get());
        }else{
            keyvalue.put("category_id","Không Tìm Thấy Thể Loại Này!");
        }
        //end check and add Entity
        productAdd.setCreated_at(new Date());
        productAdd.setUpdated_at(new Date());

        //Check xem chọn chưa chứ không dùng.
        Optional<Status_ProductDetail> status_productDetail=status_productDetailRepository.findById(productRequest.getStatus_id());
        if(!status_productDetail.isPresent()){
            keyvalue.put("status_id","Không Tìm Thấy Trạng Thái Này!");
        }

        //ném ra ngoại lệ check
        if(!keyvalue.isEmpty()){
            throw new ExceptionMessage(keyvalue);
        }

        //add Product
        Product product=productRepository.save(productAdd);
        //because product detail need product id so that i have to dispatch product_id
        return product.getId();
    }

    @Override
    public List<ProductResponse> getProductResponse() {
        return productRepository.getProductResponse();
    }

    @Override
    public List<ProductDetailResponse> getProductDetailResponse(Long product_id) {
        return productRepository.getProductDetailResponse(product_id);
    }

    @Override
    public ProductDetailImageResponse getProductDetailImageResponse(Long product_detail_id) {
        return productRepository.getProductDetailImageResponse(product_detail_id);
    }

    @Override
    public List<ImageProductResponse> getImageProductResponse(Long product_detail_id) {
        return productRepository.getImageProductResponse(product_detail_id);
    }
}
