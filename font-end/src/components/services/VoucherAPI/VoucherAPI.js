import axios from "axios";

class VoucherAPI{
    postVoucherAPI=(voucherPostRequest)=>{
        return axios.post(`http://localhost:8080/api/voucher/post-voucher`,voucherPostRequest);
    }

    putVoucherAPI=(voucherPutRequest)=>{
        return axios.put(`http://localhost:8080/api/voucher/put-voucher`,voucherPutRequest);
    }

    getAllVoucherPagingAPI=(page)=>{
        return axios.get(`http://localhost:8080/api/voucher/get-all-voucher_paging`,{
            params:{
                page:page
            }
        })
    }

    getToTalPageVoucherAPI=()=>{
        return axios.get(`http://localhost:8080/api/voucher/get-total-page`);
    }

    searchVoucherPagingAPI=(page,code,quantity,value,status,date_start,date_end)=>{
        return axios.get(`http://localhost:8080/api/voucher/search-voucher_paging`,{
            params:{
                page:page,
                code:code,
                quantity:quantity,
                value:value,
                status:status,
                date_start:date_start,
                date_end:date_end
            }
        })
    }

    getToTalPageSearchVoucher=(code,quantity,value,status,date_start,date_end)=>{
        return axios.get(`http://localhost:8080/api/voucher/get-total-page-search`,{
            params:{
                code:code,
                quantity:quantity,
                value:value,
                status:status,
                date_start:date_start,
                date_end:date_end
            }
        })
    }

    getVoucherById=(voucher_id)=>{
        return axios.get(`http://localhost:8080/api/voucher/get-voucher-by-id`,{
            params:{
                id:voucher_id
            }
        })
    }
}
export default new VoucherAPI();