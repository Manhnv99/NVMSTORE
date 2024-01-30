import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import productAPI from "../../../components/services/ProductAPI/ProductAPI";


const initialState={
    listProductDetail:[],
    isLoading:false
}

export const fetchProductDetail=createAsyncThunk("fetchProductDetail",async(product_id)=>{
    const response=await productAPI.productDetailResponse(product_id);
    return response.data
})

const ProductDetailSlice=createSlice({
    name:"product_detail",
    initialState,
    reducers:{
        setListProductDetail:(state,action)=>{
            state.listProductDetail=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProductDetail.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(fetchProductDetail.fulfilled,(state,action)=>{
                state.listProductDetail=action.payload
                state.isLoading=false
            })
            .addCase(fetchProductDetail.rejected,(state,action)=>{
                state.isLoading=false
            })
    }
})

export const {setListProductDetail}=ProductDetailSlice.actions
export default ProductDetailSlice.reducer