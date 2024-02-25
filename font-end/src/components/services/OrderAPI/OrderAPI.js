import axios from "axios";


class OrderAPI{
    post_Default_Order=()=>{
        return axios.post(`http://localhost:8080/api/order/post-default_order`);
    }

    list_Order_Pending=()=>{
        return axios.get(`http://localhost:8080/api/order/list-order_pending`)
    }
}

export default new OrderAPI()