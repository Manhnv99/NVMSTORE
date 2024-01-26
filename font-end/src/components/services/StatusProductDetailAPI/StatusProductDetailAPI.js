import axios from "axios";


class StatusProductDetailAPI {
    getAll=()=>{
        return axios.get(`http://localhost:8080/api/status_product_detail/getAll`);
    }

    addStatusProductDetail=(statusProductDetailRequest)=>{
        return axios.post(`http://localhost:8080/api/status_product_detail/add`,statusProductDetailRequest);
    }
}

export default new StatusProductDetailAPI()