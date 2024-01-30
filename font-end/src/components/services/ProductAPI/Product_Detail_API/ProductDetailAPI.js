import axios from "axios";


class ProductDetailAPI{

    addProductDetail=(productDetailRequest)=>{
        return axios.post(`http://localhost:8080/api/product_detail/add`,productDetailRequest);
    }
}

export default new ProductDetailAPI()