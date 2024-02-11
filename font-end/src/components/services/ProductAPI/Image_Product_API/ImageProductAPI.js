import axios from "axios";


class ImageProductAPI{

    addImageProduct=(imageProductRequest)=>{
        return axios.post(`http://localhost:8080/api/image_product/add`,imageProductRequest);
    }

    removeImageProduct=(image_product_id,image_id)=>{
        return axios.delete(`http://localhost:8080/api/image_product/remove`,{
            params:{
                image_product_id:image_product_id,
                image_id:image_id
            }
        })
    }

    getAllImage=(product_detail_id)=>{
        return axios.get(`http://localhost:8080/api/product/imageProductResponse/${product_detail_id}`);
    }

    getProductDetailImage=(product_detail_id)=>{
        return axios.get(`http://localhost:8080/api/product/productDetailImageResponse/${product_detail_id}`);
    }

    getQRCodeImage=(qrcode)=>{
        return axios.get(`http://localhost:8080/api/image_product/qrcodeimage`,{
            params:{
                qrcode:qrcode
            }
        })
    }


}

export default new ImageProductAPI()