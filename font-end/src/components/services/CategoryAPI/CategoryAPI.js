import axios from "axios";


class CategoryAPI{
    getAllPaging=(page)=>{
        return axios.get(`http://localhost:8080/api/category/getAll/${page}`)
    }

    getAll=()=>{
        return axios.get(`http://localhost:8080/api/category/getAll`)
    }

    getAllTotalPage=()=>{
        return axios.get(`http://localhost:8080/api/category/getAllTotalPage`)
    }

    addCategory=(categoryRequest)=>{
        return axios.post(`http://localhost:8080/api/category/add`,categoryRequest);
    }

    searchCategory=(input,status,page)=>{
        return axios.get(`http://localhost:8080/api/category/search/${page}`,{
            params:{
                input:input,
                status:status
            }
        })
    }

    getTotalPageSearch=(input,status)=>{
        return axios.get(`http://localhost:8080/api/category/search/getTotalPage`,{
            params:{
                input:input,
                status:status
            }
        })
    }

    getById=(id)=>{
        return axios.get(`http://localhost:8080/api/category/getById/${id}`);
    }

    updateCategory=(id,categoryRequest)=>{
        return axios.put(`http://localhost:8080/api/category/update/${id}`,categoryRequest);
    }
}

export default new CategoryAPI()