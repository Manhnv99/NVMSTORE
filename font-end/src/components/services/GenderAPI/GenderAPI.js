import axios from "axios";


class GenderAPI {
    getAll=()=>{
        return axios.get(`http://localhost:8080/api/gender/getAll`);
    }

    addGender=(genderRequest)=>{
        return axios.post(`http://localhost:8080/api/gender/add`,genderRequest);
    }
}

export default new GenderAPI()