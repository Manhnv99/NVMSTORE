import axios from "axios";


class StaffAPI{

    createStaff=(formData)=>{
        return axios.post("http://localhost:8080/api/staff/create",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
    }

}
export default new StaffAPI()