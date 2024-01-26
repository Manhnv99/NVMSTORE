import axios from "axios";


class ColorAPI {
    getAll=()=>{
        return axios.get(`http://localhost:8080/api/color/getAll`);
    }

    addColor=(colorRequest)=>{
        return axios.post(`http://localhost:8080/api/color/add`,colorRequest);
    }
}

export default new ColorAPI()