import axios from "axios";


class MaterialAPI{

    getAllPaging=(page)=>{
        return axios.get(`http://localhost:8080/api/material/getAll/${page}`)
    }

    getAll=()=>{
        return axios.get(`http://localhost:8080/api/material/getAll`)
    }

    getAllTotalPage=()=>{
        return axios.get(`http://localhost:8080/api/material/getAllTotalPage`)
    }

    addMaterial=(categoryRequest)=>{
        return axios.post(`http://localhost:8080/api/material/add`,categoryRequest);
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
        return axios.get(`http://localhost:8080/api/material/search/getTotalPage`,{
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
        return axios.put(`http://localhost:8080/api/material/update/${id}`,categoryRequest);
    }
}
export default new MaterialAPI()