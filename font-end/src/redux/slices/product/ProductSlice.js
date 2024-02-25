import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import productAPI from "../../../components/services/ProductAPI/ProductAPI";

const initialState={
    listProduct:[],
    isLoading:false,
    idProduct:undefined
}

export const fetchProductResponse=createAsyncThunk("fetchProductResponse", async(page)=>{
    try {
        const response = await productAPI.getAllProduct(page);
        return response.data;
    }catch (e) {
        console.log(e)
    }
})


const ProductSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
        setListProduct:(state,action)=>{
            state.listProduct=action.payload
        },
        setIdProduct:(state,action)=>{
            state.idProduct=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProductResponse.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(fetchProductResponse.fulfilled,(state,action)=>{
                state.isLoading=false
                state.listProduct=action.payload
            })
            .addCase(fetchProductResponse.rejected,(state,action)=>{
                state.isLoading=false
            })
    }
})

export const {setListProduct,setIdProduct}=ProductSlice.actions

export default ProductSlice.reducer