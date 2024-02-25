import axios from "axios";


class MaterialAPI{

    getAllPaging=(page)=>{
        return axios.get(`http://localhost:8080/api/material/get-all/${page}`)
    }

    getAll=()=>{
        return axios.get(`http://localhost:8080/api/material/get-all`)
    }

    getAllTotalPage=()=>{
        return axios.get(`http://localhost:8080/api/material/get-all-totalPage`)
    }

    addMaterial=(categoryRequest)=>{
        return axios.post(`http://localhost:8080/api/material/post-material`,categoryRequest);
    }

    searchMaterial=(input,status,page)=>{
        return axios.get(`http://localhost:8080/api/material/search/${page}`,{
            params:{
                input:input,
                status:status
            }
        })
    }

    getTotalPageSearch=(input,status)=>{
        return axios.get(`http://localhost:8080/api/material/search/get-totalPage`,{
            params:{
                input:input,
                status:status
            }
        })
    }

    getById=(id)=>{
        return axios.get(`http://localhost:8080/api/material/getById/${id}`);
    }

    updateMaterial=(id,categoryRequest)=>{
        return axios.put(`http://localhost:8080/api/material/put-material/${id}`,categoryRequest);
    }
}
export default new MaterialAPI()