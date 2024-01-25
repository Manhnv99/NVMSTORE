import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CategoryAPI from "../../components/services/CategoryAPI/CategoryAPI";


const initialState={
    listCategory:[],
    isLoading:false
}

export const getAllCategory=createAsyncThunk(
    "fetchAllCategory",
    async (page)=>{
        try {
            const response=await CategoryAPI.getAllPaging(page)
            return response.data
        }catch (e) {
            console.log(e)
        }
    }

)

const CategorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{
        setListCategory:(state,action)=>{
            state.listCategory=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllCategory.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getAllCategory.fulfilled,(state,action)=>{
                state.listCategory=action.payload
                state.isLoading=false
            })
            .addCase(getAllCategory.rejected,(state,action)=>{
                state.isLoading=false
            })
    }
})

export const {setListCategory}=CategorySlice.actions

export default CategorySlice.reducer