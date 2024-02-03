import axios from "axios";


class ProductDetailAPI{

    addProductDetail=(productDetailRequest)=>{
        return axios.post(`http://localhost:8080/api/product_detail/add`,productDetailRequest);
    }

    //ProductDetail
    productDetailResponse=(product_id,page)=>{
        return axios.get(`http://localhost:8080/api/product/productDetailResponse/${product_id}`,{
            params:{
                page:page
            }
        });
    }

    getTotalPageProductDetailResponse=(product_id)=>{
        return axios.get(`http://localhost:8080/api/product/getTotalPageProductDetailResponse/${product_id}`);
    }

    searchProductDetailResponse=(product_id,materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId,page)=>{
        return axios.get(`http://localhost:8080/api/product/searchProductDetailResponse/${product_id}`,{
            params:{
                materialId:materialId,
                brandId:brandId,
                soleId:soleId,
                sizeId:sizeId,
                colorId:colorId,
                categoryId:categoryId,
                spdId:spdId,
                genderId:genderId,
                page:page
            }
        });
    }

    getTotalPageSearchProductDetailResponse=(product_id,materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId)=>{
        return axios.get(`http://localhost:8080/api/product/getTotalPageSearchProductDetailResponse/${product_id}`,{
            params:{
                materialId:materialId,
                brandId:brandId,
                soleId:soleId,
                sizeId:sizeId,
                colorId:colorId,
                categoryId:categoryId,
                spdId:spdId,
                genderId:genderId
            }
        });
    }
}

export default new ProductDetailAPI()