package com.nvm.nvmstore.service.serviceImpl;

import com.nvm.nvmstore.ExceptionHandler.ExceptionMessage;
import com.nvm.nvmstore.entity.*;
import com.nvm.nvmstore.repository.*;
import com.nvm.nvmstore.request.productdetail.ProductDetailRequest;
import com.nvm.nvmstore.request.productdetail.UpdateProductDetailRequest;
import com.nvm.nvmstore.service.Product_DetailService;
import com.nvm.nvmstore.service.QRCodeService;
import com.nvm.nvmstore.utils.QRCodeGenerator;
import com.nvm.nvmstore.utils.ValidateInput;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Long addProduct_Detail(ProductDetailRequest productDetailRequest) {
        //Add ProductDetail
        //optional
        Optional<Status_ProductDetail> status_productDetailOptional= status_productDetailRepository.findById(productDetailRequest.getStatus_product_detail_id());
        Optional<Brand> brandOptional=brandRepository.findById(productDetailRequest.getBrand_id());
        Optional<Material> materialOptional=materialRepository.findById(productDetailRequest.getMaterial_id());
        Optional<Gender> genderOptional=genderRepository.findById(productDetailRequest.getGender_id());
        Optional<Sole> soleOptional=soleRepository.findById(productDetailRequest.getSole_id());
        Optional<Category> categoryOptional=categoryRepository.findById(productDetailRequest.getCategory_id());
        //
        Product productAdd=new Product();
        Product_Detail product_detailAdd=new Product_Detail();
        //Add Product
        Product isProductPresent=productRepository.getProductByName(productDetailRequest.getName());
        if(isProductPresent!=null){
            //check duplicate
            Map<String,String> keyvalue=new HashMap<>();
            List<Product_Detail> allProductDetail= product_detailRepository.findAll();
            for(Product_Detail product_detail:allProductDetail){
                if(product_detail.getBrand_id().equals(brandRepository.getReferenceById(productDetailRequest.getBrand_id())) &&
                        product_detail.getMaterial_id().equals(materialRepository.getReferenceById(productDetailRequest.getMaterial_id())) &&
                        product_detail.getSole_id().equals(soleRepository.getReferenceById(productDetailRequest.getSole_id())) &&
                        product_detail.getCategory_id().equals(categoryRepository.getReferenceById(productDetailRequest.getCategory_id())) &&
                        product_detail.getGender_id().equals(genderRepository.getReferenceById(productDetailRequest.getGender_id())) &&
                        product_detail.getSize_id().equals(sizeRepository.getSizeByName(productDetailRequest.getSize_name()))){
                    //nếu mà màu trùng thì không thêm
                    if(product_detail.getColor_id().equals(colorRepository.getColorByName(productDetailRequest.getColor_name()))){
                        keyvalue.put("toastMsg","Đã Tồn Tại Sản Phẩm Này Với Color:"+productDetailRequest.getColor_name());
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
            productAdd.setName(productDetailRequest.getName());
            productAdd.setStatus(true);
            productAdd.setCreated_at(new Date());
            productAdd.setUpdated_at(new Date());
            Product productResponse=productRepository.save(productAdd);
            product_detailAdd.setProduct_id(productRepository.getReferenceById(productResponse.getId()));
        }


        product_detailAdd.setDescription(productDetailRequest.getDescription());
        brandOptional.ifPresent(product_detailAdd::setBrand_id);
        materialOptional.ifPresent(product_detailAdd::setMaterial_id);
        genderOptional.ifPresent(product_detailAdd::setGender_id);
        soleOptional.ifPresent(product_detailAdd::setSole_id);
        categoryOptional.ifPresent(product_detailAdd::setCategory_id);
        product_detailAdd.setColor_id(colorRepository.getColorByName(productDetailRequest.getColor_name()));
        product_detailAdd.setSize_id(sizeRepository.getSizeByName(productDetailRequest.getSize_name()));
        status_productDetailOptional.ifPresent(product_detailAdd::setStatus_productDetail_id);
        product_detailAdd.setQuantity(productDetailRequest.getQuantity());
        product_detailAdd.setSell_price(productDetailRequest.getSell_price());
        product_detailAdd.setCreated_at(new Date());
        product_detailAdd.setUpdated_at(new Date());
        //addQRCode
        Product_Detail product_detail_response=product_detailRepository.save(product_detailAdd);
        //generate QRCODE
        qrCodeService.GenerateQRCode(product_detail_response.getId());
        return product_detail_response.getId();
    }

    @Override
    public void updateProduct_Detail(UpdateProductDetailRequest updateProductDetailRequest) {
        Product_Detail product_detail_update=product_detailRepository.getReferenceById(updateProductDetailRequest.getProduct_detail_id());
        Map<String,String> keyvalue=new HashMap<>();
        List<Product_Detail> allProductDetail= product_detailRepository.findAll();

        //check input value
        if(validateInput.CheckSpace(updateProductDetailRequest.getDescription())){
            keyvalue.put("description","Mô Tả Nhập Không Hợp Lệ!");
        }
        if(!keyvalue.isEmpty()){
            throw new ExceptionMessage(keyvalue);
        }

        //nếu size hoặc color thay đổi thì sẽ thực hiện check
        if(!product_detail_update.getSize_id().equals(sizeRepository.getReferenceById(updateProductDetailRequest.getSize_id())) ||
                !product_detail_update.getColor_id().equals(colorRepository.getReferenceById(updateProductDetailRequest.getColor_id()))){
            //check duplicate
            for(Product_Detail product_detail:allProductDetail){
                if(product_detail.getBrand_id().equals(brandRepository.getReferenceById(updateProductDetailRequest.getBrand_id())) &&
                        product_detail.getMaterial_id().equals(materialRepository.getReferenceById(updateProductDetailRequest.getMaterial_id())) &&
                        product_detail.getSole_id().equals(soleRepository.getReferenceById(updateProductDetailRequest.getSole_id())) &&
                        product_detail.getCategory_id().equals(categoryRepository.getReferenceById(updateProductDetailRequest.getCategory_id())) &&
                        product_detail.getGender_id().equals(genderRepository.getReferenceById(updateProductDetailRequest.getGender_id())) &&
                        product_detail.getSize_id().equals(sizeRepository.getReferenceById(updateProductDetailRequest.getSize_id()))){
                    //nếu mà màu trùng thì không thêm
                    if(product_detail.getColor_id().equals(colorRepository.getReferenceById(updateProductDetailRequest.getColor_id()))){
                        Color color=colorRepository.getReferenceById(updateProductDetailRequest.getColor_id());
                        keyvalue.put("toastMsg","Đã Tồn Tại Sản Phẩm Này Với Color:"+color.getName());
                        throw new ExceptionMessage(keyvalue);
                    }
                }
            }
        }

        //update
        product_detail_update.setSell_price(updateProductDetailRequest.getSell_price());
        product_detail_update.setQuantity(updateProductDetailRequest.getQuantity());
        product_detail_update.setDescription(updateProductDetailRequest.getDescription());
        product_detail_update.setBrand_id(brandRepository.getReferenceById(updateProductDetailRequest.getBrand_id()));
        product_detail_update.setMaterial_id(materialRepository.getReferenceById(updateProductDetailRequest.getMaterial_id()));
        product_detail_update.setSole_id(soleRepository.getReferenceById(updateProductDetailRequest.getSole_id()));
        product_detail_update.setCategory_id(categoryRepository.getReferenceById(updateProductDetailRequest.getCategory_id()));
        product_detail_update.setGender_id(genderRepository.getReferenceById(updateProductDetailRequest.getGender_id()));
        product_detail_update.setSize_id(sizeRepository.getReferenceById(updateProductDetailRequest.getSize_id()));
        product_detail_update.setColor_id(colorRepository.getReferenceById(updateProductDetailRequest.getColor_id()));
        product_detail_update.setStatus_productDetail_id(status_productDetailRepository.getReferenceById(updateProductDetailRequest.getStatus_id()));
        product_detail_update.setUpdated_at(new Date());

        product_detailRepository.save(product_detail_update);
    }
}
