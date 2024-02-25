import axios from "axios";


class ColorAPI {
    getAll=()=>{
        return axios.get(`http://localhost:8080/api/color/get-all`);
    }

    addColor=(colorRequest)=>{
        return axios.post(`http://localhost:8080/api/color/post-color`,colorRequest);
    }
}

export default new ColorAPI()