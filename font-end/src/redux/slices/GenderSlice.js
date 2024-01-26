

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import GenderAPI from "../../components/services/GenderAPI/GenderAPI";


const initialState={
    listGender:[],
    isLoading:false
}

export const getAllGender=createAsyncThunk(
    "fetchAllGender",
    async ()=>{
        try {
            const response=await GenderAPI.getAll()
            return response.data
        }catch (e) {
            console.log(e)
        }
    }
)

const GenderSlice=createSlice({
    name:"gender",
    initialState,
    reducers:{
        setListGender:(state,action)=>{
            state.listGender=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllGender.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getAllGender.fulfilled,(state,action)=>{
                state.listGender=action.payload
                state.isLoading=false
            })
            .addCase(getAllGender.rejected,(state,action)=>{
                state.isLoading=false
            })
    }
})

export const {setListGender}=GenderSlice.actions

export default GenderSlice.reducer