import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    listGeograph:[]
}

export const CallApiGeoGraph=createAsyncThunk(
    "fetchAllAPIVN",
    async ()=>{
        try {
            const response=await axios.get('https://provinces.open-api.vn/api/?depth=3')
            return response.data
        }catch (e){
            console.log(e)
        }
    }
)


const APIVNSlice=createSlice({
    name:"geograph",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(CallApiGeoGraph.fulfilled,(state,action)=>{
            state.listGeograph=action.payload
        })
    }

})


export default APIVNSlice.reducer