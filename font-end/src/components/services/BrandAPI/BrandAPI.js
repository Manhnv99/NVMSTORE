import axios from "axios";


class BrandAPI{
    getAllPaging=(page)=>{
        return axios.get(`http://localhost:8080/api/brand/getAll/${page}`)
    }

    getAll=()=>{
        return axios.get(`http://localhost:8080/api/brand/getAll`)
    }

    getAllTotalPage=()=>{
        return axios.get(`http://localhost:8080/api/brand/getAllTotalPage`)
    }

    addBrand=(categoryRequest)=>{
        return axios.post(`http://localhost:8080/api/brand/add`,categoryRequest);
    }

    searchBrand=(input,status,page)=>{
        return axios.get(`http://localhost:8080/api/brand/search/${page}`,{
            params:{
                input:input,
                status:status
            }
        })
    }

    getTotalPageSearch=(input,status)=>{
        return axios.get(`http://localhost:8080/api/brand/search/getTotalPage`,{
            params:{
                input:input,
                status:status
            }
        })
    }

    getById=(id)=>{
        return axios.get(`http://localhost:8080/api/brand/getById/${id}`);
    }

    updateBrand=(id,categoryRequest)=>{
        return axios.put(`http://localhost:8080/api/brand/update/${id}`,categoryRequest);
    }
}

export default new BrandAPI()