import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CategoryAPI from "../../components/services/CategoryAPI/CategoryAPI";
import MaterialAPI from "../../components/services/MaterialAPI/MaterialAPI";


const initialState={
    listMaterial:[],
    isLoading:false
}

export const getAllMaterial=createAsyncThunk(
    "fetchAllMaterial",
    async (page)=>{
        try {
            const response=await MaterialAPI.getAllPaging(page)
            return response.data
        }catch (e) {
            console.log(e)
        }
    }

)

const MaterialSlice=createSlice({
    name:"material",
    initialState,
    reducers:{
        setListMaterial:(state,action)=>{
            state.listMaterial=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllMaterial.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getAllMaterial.fulfilled,(state,action)=>{
                state.listMaterial=action.payload
                state.isLoading=false
            })
            .addCase(getAllMaterial.rejected,(state,action)=>{
                state.isLoading=false
            })
    }
})

export const {setListMaterial}=MaterialSlice.actions

export default MaterialSlice.reducer