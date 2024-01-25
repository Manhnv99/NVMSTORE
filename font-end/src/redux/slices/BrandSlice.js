import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import BrandAPI from "../../components/services/BrandAPI/BrandAPI";


const initialState={
    listBrand:[],
    isLoading:false
}

export const getAllBrand=createAsyncThunk(
    "fetchAllBrand",
    async (page)=>{
        try {
            const response=await BrandAPI.getAllPaging(page)
            return response.data
        }catch (e) {
            console.log(e)
        }
    }
)

const BrandSlice=createSlice({
    name:"brand",
    initialState,
    reducers:{
        setListBrand:(state,action)=>{
            state.listBrand=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllBrand.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getAllBrand.fulfilled,(state,action)=>{
                state.listBrand=action.payload
                state.isLoading=false
            })
            .addCase(getAllBrand.rejected,(state,action)=>{
                state.isLoading=false
            })
    }
})

export const {setListBrand}=BrandSlice.actions

export default BrandSlice.reducer