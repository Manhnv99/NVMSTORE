

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import StatusProductDetailAPI from "../../components/services/StatusProductDetailAPI/StatusProductDetailAPI";


const initialState={
    listStatusProductDetail:[],
    isLoading:false
}

export const getAllStatusProductDetail=createAsyncThunk(
    "fetchAllStatusProductDetail",
    async ()=>{
        try {
            const response=await StatusProductDetailAPI.getAll()
            return response.data
        }catch (e) {
            console.log(e)
        }
    }
)

const StatusProductDetailSlice=createSlice({
    name:"status_product_detail",
    initialState,
    reducers:{
        setListStatusProductDetail:(state,action)=>{
            state.listStatusProductDetail=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllStatusProductDetail.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getAllStatusProductDetail.fulfilled,(state,action)=>{
                state.listStatusProductDetail=action.payload
                state.isLoading=false
            })
            .addCase(getAllStatusProductDetail.rejected,(state,action)=>{
                state.isLoading=false
            })
    }
})

export const {setListStatusProductDetail}=StatusProductDetailSlice.actions

export default StatusProductDetailSlice.reducer