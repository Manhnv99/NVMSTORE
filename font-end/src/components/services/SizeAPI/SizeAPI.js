import axios from "axios";


class SizeAPI {
    getAll=()=>{
        return axios.get(`http://localhost:8080/api/size/getAll`);
    }

    addSize=(sizeRequest)=>{
        return axios.post(`http://localhost:8080/api/size/add`,sizeRequest);
    }
}

export default new SizeAPI()