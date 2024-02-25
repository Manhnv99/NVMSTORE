import axios from "axios";


class ProductDetailAPI{

    postProductDetail=(productDetailRequest)=>{
        return axios.post(`http://localhost:8080/api/product_detail/post-product_detail`,productDetailRequest);
    }

    updateProductDetail=(updateProductDetailRequest)=>{
        return axios.put(`http://localhost:8080/api/product_detail/put-product_detail`,updateProductDetailRequest);
    }

    //ProductDetail

    getAllProductDetail=(page)=>{
        return axios.get(`http://localhost:8080/api/product_detail/get-all-product_detail`,{
            params:{
                page:page
            }
        });
    }

    getTotalPageProductDetail=()=>{
        return axios.get(`http://localhost:8080/api/product_detail/get-totalPage-product_detail`);
    }

    searchProductDetail=(materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId,page)=>{
        return axios.get(`http://localhost:8080/api/product_detail/search-product_detail`,{
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

    getTotalPageSearchProductDetail=(materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId)=>{
        return axios.get(`http://localhost:8080/api/product_detail/search-totalPage-product_detail`,{
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


    //ProductDetail By Product_Id
    getAllProductDetailByProduct_id=(product_id,page)=>{
        return axios.get(`http://localhost:8080/api/product_detail/get-all-product_detail-byProductId/${product_id}`,{
            params:{
                page:page
            }
        });
    }

    getTotalPageProductDetailByProduct_id=(product_id)=>{
        return axios.get(`http://localhost:8080/api/product_detail/get-totalPage-product_detail-byProductId/${product_id}`);
    }

    searchProductDetailByProduct_id=(product_id,materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId,page)=>{
        return axios.get(`http://localhost:8080/api/product_detail/search-product_detail-byProductId/${product_id}`,{
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

    getTotalPageSearchProductDetailByProductId=(product_id,materialId,brandId,soleId,sizeId,colorId,categoryId,spdId,genderId)=>{
        return axios.get(`http://localhost:8080/api/product_detail/search-totalPage-product_detail-byProductId/${product_id}`,{
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