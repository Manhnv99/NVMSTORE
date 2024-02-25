import axios from "axios";


class BrandAPI{
    getAllPaging=(page)=>{
        return axios.get(`http://localhost:8080/api/brand/get-all/${page}`)
    }

    getAll=()=>{
        return axios.get(`http://localhost:8080/api/brand/get-all`)
    }

    getAllTotalPage=()=>{
        return axios.get(`http://localhost:8080/api/brand/get-all-totalPage`)
    }

    addBrand=(categoryRequest)=>{
        return axios.post(`http://localhost:8080/api/brand/post-brand`,categoryRequest);
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
        return axios.get(`http://localhost:8080/api/brand/search/get-totalPage`,{
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
        return axios.put(`http://localhost:8080/api/brand/put-brand/${id}`,categoryRequest);
    }
}

export default new BrandAPI()