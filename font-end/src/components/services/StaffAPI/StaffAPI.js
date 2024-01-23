import axios from "axios";


class StaffAPI{

    createStaff=(formData)=>{
        return axios.post("http://localhost:8080/api/staff/create",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
    }

    updateStaff=(id,formData)=>{
        return axios.put(`http://localhost:8080/api/staff/update/${id}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
    }

    getAll=(page)=>{
        return axios.get(`http://localhost:8080/api/staff/getAll/${page}`)
    }

    getTotalPage=()=>{
        return axios.get(`http://localhost:8080/api/staff/getTotalPage`)
    }

    getStaffById=(id)=>{
        return axios.get(`http://localhost:8080/api/staff/getStaffById/${id}`)
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
        return axios.get(`http://localhost:8080/api/staff/search/getTotalPage`,{
            params:{
                input:input,
                status:status
            }
        })
    }

}
export default new StaffAPI()