import axios from "axios";


class GenderAPI {
    getAll=()=>{
        return axios.get(`http://localhost:8080/api/gender/get-all`);
    }

    addGender=(genderRequest)=>{
        return axios.post(`http://localhost:8080/api/gender/post-gender`,genderRequest);
    }
}

export default new GenderAPI()