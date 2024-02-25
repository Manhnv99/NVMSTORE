import axios from "axios";


class ImageProductAPI{

    addImageProduct=(imageProductRequest)=>{
        return axios.post(`http://localhost:8080/api/image_product/post-image_product`,imageProductRequest);
    }

    removeImageProduct=(image_product_id,image_id)=>{
        return axios.delete(`http://localhost:8080/api/image_product/delete-image_product`,{
            params:{
                image_product_id:image_product_id,
                image_id:image_id
            }
        })
    }

    getAllImageById=(product_detail_id)=>{
        return axios.get(`http://localhost:8080/api/image_product/get-image_product-byId/${product_detail_id}`);
    }

    getAllImage=()=>{
        return axios.get(`http://localhost:8080/api/image_product/get-all-image_product`);
    }

    getProductDetailImage=(product_detail_id)=>{
        return axios.get(`http://localhost:8080/api/image_product/get-data-reference-product_productDetail/${product_detail_id}`);
    }

    getQRCodeImage=(qrcode)=>{
        return axios.get(`http://localhost:8080/api/image_product/get-qrcode_image`,{
            params:{
                qrcode:qrcode
            }
        })
    }

}

export default new ImageProductAPI()