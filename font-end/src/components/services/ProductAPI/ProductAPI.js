import axios from "axios";


class ProductAPI{

    getAllName_Product=()=>{
        return axios.get(`http://localhost:8080/api/product/get-all`);
    }

    postProduct=(productRequest)=>{
        return axios.post(`http://localhost:8080/api/product/post-product`,productRequest);
    }

    //Product
    getAllProduct=(page)=>{
        return axios.get(`http://localhost:8080/api/product/get-all-product_paging`,{
            params:{
                page:page
            }
        });
    }

    getTotalPageProduct=()=>{
        return axios.get(`http://localhost:8080/api/product/get-totalPage`);
    }

    searchProduct=(input,page)=>{
        return axios.get(`http://localhost:8080/api/product/search-product_paging`,{
            params:{
                input:input,
                page:page
            }
        });
    }

    getTotalPageSearchProduct=(input)=>{
        return axios.get(`http://localhost:8080/api/product/search-totalPage`,{
            params:{
                input:input
            }
        });
    }
}

export default new ProductAPI()