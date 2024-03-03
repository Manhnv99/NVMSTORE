import {createSlice} from "@reduxjs/toolkit";

const initialState={
    listOrderProductDetail:[]
}

export const OrderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{
        setListOrderProductDetail:(state,action)=>{
            state.listOrderProductDetail = action.payload;
        }
    }
})

export const {setListOrderProductDetail} = OrderSlice.actions;

export default OrderSlice.reducer;