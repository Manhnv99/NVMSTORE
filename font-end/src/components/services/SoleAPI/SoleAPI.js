import axios from "axios";


class SoleAPI{
    getAllPaging=(page)=>{
        return axios.get(`http://localhost:8080/api/sole/getAll/${page}`)
    }

    getAll=()=>{
        return axios.get(`http://localhost:8080/api/sole/getAll`)
    }

    getAllTotalPage=()=>{
        return axios.get(`http://localhost:8080/api/sole/getAllTotalPage`)
    }

    addSole=(categoryRequest)=>{
        return axios.post(`http://localhost:8080/api/sole/add`,categoryRequest);
    }

    searchSole=(input,status,page)=>{
        return axios.get(`http://localhost:8080/api/sole/search/${page}`,{
            params:{
                input:input,
                status:status
            }
        })
    }

    getTotalPageSearch=(input,status)=>{
        return axios.get(`http://localhost:8080/api/sole/search/getTotalPage`,{
            params:{
                input:input,
                status:status
            }
        })
    }

    getById=(id)=>{
        return axios.get(`http://localhost:8080/api/sole/getById/${id}`);
    }

    updateSole=(id,categoryRequest)=>{
        return axios.put(`http://localhost:8080/api/sole/update/${id}`,categoryRequest);
    }
}

export default new SoleAPI()