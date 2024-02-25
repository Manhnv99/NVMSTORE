import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import VoucherAPI from "../../components/services/VoucherAPI/VoucherAPI";


const initialState={
    listVoucher:[],
    isLoading:false
}

export const getAllVoucherPaging=createAsyncThunk("fetchAll",async (page) => {
    try {
        const response= await VoucherAPI.getAllVoucherPagingAPI(page);
        return response.data;
    }catch (e) {
        console.log(e);
    }
})


export const VoucherSlice=createSlice({
    name:"voucher",
    initialState,
    reducers:{
        setListVoucher:(state,action)=>{
            state.listVoucher = action.payload;
        }
    },
    extraReducers:(builder=>{
        builder
            .addCase(getAllVoucherPaging.pending,(state, action)=>{
                state.isLoading=true;
            })
            .addCase(getAllVoucherPaging.fulfilled,(state, action)=>{
                state.isLoading=false;
                state.listVoucher=action.payload;
            })
            .addCase(getAllVoucherPaging.rejected,(state, action)=>{
                state.isLoading=false;
            })
    })
})

export const {setListVoucher}=VoucherSlice.actions
export default VoucherSlice.reducer;