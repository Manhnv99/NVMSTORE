import axios from "axios";


class ProductAPI{

    getAllProduct=()=>{
        return axios.get(`http://localhost:8080/api/product/getAll`);
    }

    addProduct=(productRequest)=>{
        return axios.post(`http://localhost:8080/api/product/add`,productRequest);
    }

    //Product
    productResponse=(page)=>{
        return axios.get(`http://localhost:8080/api/product/productResponse`,{
            params:{
                page:page
            }
        });
    }

    getTotalPageProductResponse=()=>{
        return axios.get(`http://localhost:8080/api/product/totalPageProductResponse`);
    }

    searchProductResponse=(input,page)=>{
        return axios.get(`http://localhost:8080/api/product/searchProductResponse`,{
            params:{
                input:input,
                page:page
            }
        });
    }

    getTotalPageSearchProductResponse=(input)=>{
        return axios.get(`http://localhost:8080/api/product/totalPageSearchProductResponse`,{
            params:{
                input:input
            }
        });
    }

    //Product Image Detail
    productImageDetailResponse=(product_detail_id)=>{
        return axios.get(`http://localhost:8080/api/product/productDetailImageResponse/${product_detail_id}}`);
    }

    imageProductResponse=(product_detail_id)=>{
        return axios.get(`http://localhost:8080/api/product/imageProductResponse/${product_detail_id}`);
    }
}

export default new ProductAPI()