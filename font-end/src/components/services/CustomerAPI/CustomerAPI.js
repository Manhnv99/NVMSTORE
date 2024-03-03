import axios from "axios";


class CustomerAPI{

    postCustomer=(postCustomerRequest)=>{
        return axios.post(`http://localhost:8080/api/customer/post-customer`,postCustomerRequest)
    }

    putCustomer=(putCustomerRequest)=>{
        return axios.put(`http://localhost:8080/api/customer/put-customer`,putCustomerRequest)
    }

    getCustomerById=(id)=>{
        return axios.get(`http://localhost:8080/api/customer/get-customer-byId`,{
            params:{
                id:id
            }
        })
    }

    listCustomerPaging=(page)=>{
        return axios.get(`http://localhost:8080/api/customer/list-customer-paging`,{
            params:{
                page:page
            }
        });
    }

    totalPageListCustomerPaging=()=>{
        return axios.get(`http://localhost:8080/api/customer/totalPage-list-customer-paging`);
    }

    listSearchCustomerPaging=(input,page)=>{
        return axios.get(`http://localhost:8080/api/customer/list-search-customer-paging`,{
            params:{
                input:input,
                page:page
            }
        });
    }

    totalPageSearchListCustomerPaging=(input)=>{
        return axios.get(`http://localhost:8080/api/customer/totalPage-list-search-customer-paging`,{
            params:{
                input:input
            }
        });
    }

}

export default new CustomerAPI()