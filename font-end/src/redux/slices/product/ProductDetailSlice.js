import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import productDetailAPI from "../../../components/services/ProductAPI/Product_Detail_API/ProductDetailAPI";


const initialState={
    listProductDetail:[],
    isLoading:false
}

export const getAllProductDetailByProduct_id=createAsyncThunk("fetchProductDetail",async(param)=>{
    const response=await productDetailAPI.getAllProductDetailByProduct_id(param.product_id,param.page);
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
            .addCase(getAllProductDetailByProduct_id.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getAllProductDetailByProduct_id.fulfilled,(state,action)=>{
                state.listProductDetail=action.payload
                state.isLoading=false
            })
            .addCase(getAllProductDetailByProduct_id.rejected,(state,action)=>{
                state.isLoading=false
            })
    }
})

export const {setListProductDetail}=ProductDetailSlice.actions
export default ProductDetailSlice.reducer