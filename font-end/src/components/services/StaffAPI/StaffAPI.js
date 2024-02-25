import axios from "axios";


class StaffAPI{

    postStaff=(formData)=>{
        return axios.post("http://localhost:8080/api/staff/post-staff",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
    }

    putStaff=(id,formData)=>{
        return axios.put(`http://localhost:8080/api/staff/put-staff/${id}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
    }

    getAll=(page)=>{
        return axios.get(`http://localhost:8080/api/staff/get-all/${page}`)
    }

    getTotalPage=()=>{
        return axios.get(`http://localhost:8080/api/staff/get-totalPage`)
    }

    getById=(id)=>{
        return axios.get(`http://localhost:8080/api/staff/get-byId/${id}`)
    }

    searchStaff=(input,status,page)=>{
        return axios.get(`http://localhost:8080/api/staff/search/${page}`,{
            params:{
                input:input,
                status:status
            }
        })
    }

    getTotalPageSearch=(input,status)=>{
        return axios.get(`http://localhost:8080/api/staff/search/get-totalPage`,{
            params:{
                input:input,
                status:status
            }
        })
    }

}
export default new StaffAPI()