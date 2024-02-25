import axios from "axios";


class CategoryAPI{
    getAllPaging=(page)=>{
        return axios.get(`http://localhost:8080/api/category/get-all/${page}`)
    }

    getAll=()=>{
        return axios.get(`http://localhost:8080/api/category/get-all`)
    }

    getAllTotalPage=()=>{
        return axios.get(`http://localhost:8080/api/category/get-all-totalPage`)
    }

    addCategory=(categoryRequest)=>{
        return axios.post(`http://localhost:8080/api/category/post-category`,categoryRequest);
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
        return axios.get(`http://localhost:8080/api/category/search/get-totalPage`,{
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
        return axios.put(`http://localhost:8080/api/category/put-category/${id}`,categoryRequest);
    }
}

export default new CategoryAPI()