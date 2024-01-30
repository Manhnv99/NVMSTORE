import axios from "axios";


class ProductAPI{

    addProduct=(productRequest)=>{
        return axios.post(`http://localhost:8080/api/product/add`,productRequest);
    }

    productResponse=()=>{
        return axios.get(`http://localhost:8080/api/product/productResponse`);
    }

    productDetailResponse=(product_id)=>{
        return axios.get(`http://localhost:8080/api/product/productDetailResponse/${product_id}`)
    }

    productImageDetailResponse=(product_detail_id)=>{
        return axios.get(`http://localhost:8080/api/product/productDetailImageResponse/${product_detail_id}}`)
    }

    imageProductResponse=(product_detail_id)=>{
        return axios.get(`http://localhost:8080/api/product/imageProductResponse/${product_detail_id}`)
    }
}

export default new ProductAPI()