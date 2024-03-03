import axios from "axios";


class CustomerAddressAPI{

    getCustomer_AddressById=(customer_address_id)=>{
        return axios.get(`http://localhost:8080/api/customer_address/get-customer_address-byId`,{
            params:{
                customer_address_id:customer_address_id
            }
        })
    }

    listCustomerAddressByCustomerId=(customer_id)=>{
        return axios.get(`http://localhost:8080/api/customer_address/list-customer_address`,{
            params:{
                customer_id:customer_id
            }
        })
    }

    postCustomerAddress=(postCustomerAddressRequest)=>{
        return axios.post(`http://localhost:8080/api/customer_address/post-customer_address`,postCustomerAddressRequest)
    }

    putCustomerAddress=(putCustomerAddressRequest)=>{
        return axios.put(`http://localhost:8080/api/customer_address/put-customer_address`,putCustomerAddressRequest)
    }

    putAddressDefault=(customer_address_id,customer_id)=>{
        return axios.put(`http://localhost:8080/api/customer_address/put-address_default`,{
            customer_address_id:customer_address_id,
            customer_id:customer_id
        });
    }

}

export default new CustomerAddressAPI()