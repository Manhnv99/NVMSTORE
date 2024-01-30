import axios from "axios";


class ImageProductAPI{

    addImageProduct=(imageProductRequest)=>{
        return axios.post(`http://localhost:8080/api/image_product/add`,imageProductRequest,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
    }
}

export default new ImageProductAPI()