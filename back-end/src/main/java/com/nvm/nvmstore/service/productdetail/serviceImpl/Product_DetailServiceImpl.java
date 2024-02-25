package com.nvm.nvmstore.service.productdetail.serviceImpl;

import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import com.nvm.nvmstore.entity.*;
import com.nvm.nvmstore.repository.brand.BrandRepository;
import com.nvm.nvmstore.repository.category.CategoryRepository;
import com.nvm.nvmstore.repository.color.ColorRepository;
import com.nvm.nvmstore.repository.gender.GenderRepository;
import com.nvm.nvmstore.repository.material.MaterialRepository;
import com.nvm.nvmstore.repository.product.ProductRepository;
import com.nvm.nvmstore.repository.productdetail.Product_DetailRepository;
import com.nvm.nvmstore.repository.size.SizeRepository;
import com.nvm.nvmstore.repository.sole.SoleRepository;
import com.nvm.nvmstore.repository.statusproductdetail.Status_ProductDetailRepository;
import com.nvm.nvmstore.request.productdetail.PostProductDetailRequest;
import com.nvm.nvmstore.request.productdetail.PutProductDetailRequest;
import com.nvm.nvmstore.response.product.productDetail.ProductDetailResponse;
import com.nvm.nvmstore.service.productdetail.Product_DetailService;
import com.nvm.nvmstore.service.qrcode.QRCodeService;
import com.nvm.nvmstore.utils.ValidateInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

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

    @Autowired
    private QRCodeService qrCodeService;

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
    private ValidateInput validateInput;

    @Override
    public Long postProduct_Detail(PostProductDetailRequest postProductDetailRequest) {
        //Add ProductDetail
        //optional
        Optional<Status_ProductDetail> status_productDetailOptional= status_productDetailRepository.findById(postProductDetailRequest.getStatus_product_detail_id());
        Optional<Brand> brandOptional=brandRepository.findById(postProductDetailRequest.getBrand_id());
        Optional<Material> materialOptional=materialRepository.findById(postProductDetailRequest.getMaterial_id());
        Optional<Gender> genderOptional=genderRepository.findById(postProductDetailRequest.getGender_id());
        Optional<Sole> soleOptional=soleRepository.findById(postProductDetailRequest.getSole_id());
        Optional<Category> categoryOptional=categoryRepository.findById(postProductDetailRequest.getCategory_id());
        //
        Product productAdd=new Product();
        Product_Detail product_detailAdd=new Product_Detail();
        //Add Product
        Product isProductPresent=productRepository.getProductByName(postProductDetailRequest.getName());
        if(isProductPresent!=null){
            //check duplicate
            Map<String,String> keyvalue=new HashMap<>();
            List<Product_Detail> allProductDetail= product_detailRepository.findAll();
            for(Product_Detail product_detail:allProductDetail){
                if(product_detail.getBrand_id().equals(brandRepository.getReferenceById(postProductDetailRequest.getBrand_id())) &&
                        product_detail.getMaterial_id().equals(materialRepository.getReferenceById(postProductDetailRequest.getMaterial_id())) &&
                        product_detail.getSole_id().equals(soleRepository.getReferenceById(postProductDetailRequest.getSole_id())) &&
                        product_detail.getCategory_id().equals(categoryRepository.getReferenceById(postProductDetailRequest.getCategory_id())) &&
                        product_detail.getGender_id().equals(genderRepository.getReferenceById(postProductDetailRequest.getGender_id())) &&
                        product_detail.getSize_id().equals(sizeRepository.getSizeByName(postProductDetailRequest.getSize_name()))){
                    //nếu mà màu trùng thì không thêm
                    if(product_detail.getColor_id().equals(colorRepository.getColorByName(postProductDetailRequest.getColor_name()))){
                        keyvalue.put("toastMsg","Đã Tồn Tại Sản Phẩm Này Với Color:"+ postProductDetailRequest.getColor_name());
                        throw new ExceptionMessage(keyvalue);
                    }
                }
            }
            product_detailAdd.setProduct_id(productRepository.getReferenceById(isProductPresent.getId()));
        }else{
            if(productRepository.getNewest()==null){
                productAdd.setCode("SP1");
            }else{
                String code=productRepository.getNewest().getCode();//getNewStaff to get Code
                productAdd.setCode(code.substring(0,2)+((Integer.parseInt(code.substring(2)))+1));
            }
            productAdd.setName(postProductDetailRequest.getName());
            productAdd.setStatus(true);
            productAdd.setCreated_at(new Date());
            productAdd.setUpdated_at(new Date());
            Product productResponse=productRepository.save(productAdd);
            product_detailAdd.setProduct_id(productRepository.getReferenceById(productResponse.getId()));
        }


        product_detailAdd.setDescription(postProductDetailRequest.getDescription());
        brandOptional.ifPresent(product_detailAdd::setBrand_id);
        materialOptional.ifPresent(product_detailAdd::setMaterial_id);
        genderOptional.ifPresent(product_detailAdd::setGender_id);
        soleOptional.ifPresent(product_detailAdd::setSole_id);
        categoryOptional.ifPresent(product_detailAdd::setCategory_id);
        product_detailAdd.setColor_id(colorRepository.getColorByName(postProductDetailRequest.getColor_name()));
        product_detailAdd.setSize_id(sizeRepository.getSizeByName(postProductDetailRequest.getSize_name()));
        status_productDetailOptional.ifPresent(product_detailAdd::setStatus_productDetail_id);
        product_detailAdd.setQuantity(postProductDetailRequest.getQuantity());
        product_detailAdd.setSell_price(postProductDetailRequest.getSell_price());
        product_detailAdd.setCreated_at(new Date());
        product_detailAdd.setUpdated_at(new Date());
        //addQRCode
        Product_Detail product_detail_response=product_detailRepository.save(product_detailAdd);
        //generate QRCODE
        qrCodeService.GenerateQRCode(product_detail_response.getId());
        return product_detail_response.getId();
    }

    @Override
    public void putProduct_Detail(PutProductDetailRequest putProductDetailRequest) {
        Product_Detail product_detail_update=product_detailRepository.getReferenceById(putProductDetailRequest.getProduct_detail_id());
        Map<String,String> keyvalue=new HashMap<>();
        List<Product_Detail> allProductDetail= product_detailRepository.findAll();

        //check input value
        if(validateInput.CheckSpace(putProductDetailRequest.getDescription())){
            keyvalue.put("description","Mô Tả Nhập Không Hợp Lệ!");
        }
        if(!keyvalue.isEmpty()){
            throw new ExceptionMessage(keyvalue);
        }

        //nếu size hoặc color thay đổi thì sẽ thực hiện check
        if(!product_detail_update.getSize_id().equals(sizeRepository.getSizeByName(putProductDetailRequest.getSize_name())) ||
                !product_detail_update.getColor_id().equals(colorRepository.getColorByName(putProductDetailRequest.getColor_name()))){
            //check duplicate
            for(Product_Detail product_detail:allProductDetail){
                if(product_detail.getBrand_id().equals(brandRepository.getBrandByName(putProductDetailRequest.getBrand_name())) &&
                        product_detail.getMaterial_id().equals(materialRepository.getMaterialByName(putProductDetailRequest.getMaterial_name())) &&
                        product_detail.getSole_id().equals(soleRepository.getSoleByName(putProductDetailRequest.getSole_name())) &&
                        product_detail.getCategory_id().equals(categoryRepository.getCategoryByName(putProductDetailRequest.getCategory_name())) &&
                        product_detail.getGender_id().equals(genderRepository.getGenderByName(putProductDetailRequest.getGender_name())) &&
                        product_detail.getSize_id().equals(sizeRepository.getSizeByName(putProductDetailRequest.getSize_name()))){
                    //nếu mà màu trùng thì không thêm
                    if(product_detail.getColor_id().equals(colorRepository.getColorByName(putProductDetailRequest.getColor_name()))){
                        Color color=colorRepository.getColorByName(putProductDetailRequest.getColor_name());
                        keyvalue.put("toastMsg","Đã Tồn Tại Sản Phẩm Này Với Color:"+color.getName());
                        throw new ExceptionMessage(keyvalue);
                    }
                }
            }
        }

        //update
        product_detail_update.setSell_price(putProductDetailRequest.getSell_price());
        product_detail_update.setQuantity(putProductDetailRequest.getQuantity());
        product_detail_update.setDescription(putProductDetailRequest.getDescription());
        product_detail_update.setBrand_id(brandRepository.getBrandByName(putProductDetailRequest.getBrand_name()));
        product_detail_update.setMaterial_id(materialRepository.getMaterialByName(putProductDetailRequest.getMaterial_name()));
        product_detail_update.setSole_id(soleRepository.getSoleByName(putProductDetailRequest.getSole_name()));
        product_detail_update.setCategory_id(categoryRepository.getCategoryByName(putProductDetailRequest.getCategory_name()));
        product_detail_update.setGender_id(genderRepository.getGenderByName(putProductDetailRequest.getGender_name()));
        product_detail_update.setSize_id(sizeRepository.getSizeByName(putProductDetailRequest.getSize_name()));
        product_detail_update.setColor_id(colorRepository.getColorByName(putProductDetailRequest.getColor_name()));
        product_detail_update.setStatus_productDetail_id(status_productDetailRepository.getStatus_ProductDetailByName(putProductDetailRequest.getStatus_name()));
        product_detail_update.setUpdated_at(new Date());

        product_detailRepository.save(product_detail_update);
    }


    //Product Detail
    @Override
    public List<ProductDetailResponse> getAllProductDetail(Pageable pageable) {
        return product_detailRepository.getAllProductDetail(pageable);
    }

    @Override
    public Double getTotalPageProductDetail() {
        return Math.ceil(product_detailRepository.getTotalPageProductDetail()/3.0);
    }

    @Override
    public List<ProductDetailResponse> searchProductDetail(Long materialId, Long brandId, Long soleId, Long sizeId, Long colorId, Long categoryId, Long spdId, Long genderId, Pageable pageable) {
        return product_detailRepository.searchProductDetail(materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId, pageable);
    }

    @Override
    public Double getTotalPageSearchProductDetail(Long materialId, Long brandId, Long soleId, Long sizeId, Long colorId, Long categoryId, Long spdId, Long genderId) {
        return Math.ceil(product_detailRepository.getTotalPageSearchProductDetail(materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId)/3.0);
    }

    //Product Detail By Product_Id
    @Override
    public List<ProductDetailResponse> getAllProductDetailByProductId(Long product_id,Pageable pageable) {
        return product_detailRepository.getAllProductDetailByProductId(product_id,pageable);
    }

    @Override
    public Double getTotalPageProductDetailByProductId(Long product_id) {
        return Math.ceil(product_detailRepository.getTotalPageProductDetailByProductId(product_id)/3.0);
    }

    @Override
    public List<ProductDetailResponse> searchProductDetailByProductId(Long product_id, Long materialId, Long brandId, Long soleId, Long sizeId, Long colorId, Long categoryId, Long spdId, Long genderId, Pageable pageable) {
        return product_detailRepository.searchProductDetailByProductId(product_id, materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId, pageable);
    }

    @Override
    public Double getTotalPageSearchProductDetailByProductId(Long product_id,Long materialId, Long brandId, Long soleId, Long sizeId, Long colorId, Long categoryId, Long spdId, Long genderId) {
        return Math.ceil(product_detailRepository.getTotalPageSearchProductDetailByProductId(product_id,materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId)/3.0);
    }
}
