import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import SoleAPI from "../../components/services/SoleAPI/SoleAPI";


const initialState={
    listSole:[],
    isLoading:false
}

export const getAllSole=createAsyncThunk(
    "fetchAllSole",
    async (page)=>{
        try {
            const response=await SoleAPI.getAllPaging(page)
            return response.data
        }catch (e) {
            console.log(e)
        }
    }

)

const SoleSlice=createSlice({
    name:"sole",
    initialState,
    reducers:{
        setListSole:(state,action)=>{
            state.listSole=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllSole.pending,(state,action)=>{
                state.isLoading=true
            })
            .addCase(getAllSole.fulfilled,(state,action)=>{
                state.listSole=action.payload
                state.isLoading=false
            })
            .addCase(getAllSole.rejected,(state,action)=>{
                state.isLoading=false
            })
    }
})

export const {setListSole}=SoleSlice.actions

export default SoleSlice.reducer