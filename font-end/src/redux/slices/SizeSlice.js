import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import SizeAPI from "../../components/services/SizeAPI/SizeAPI";



const initialState={
    listSize:[],
    isLoading:false,
}

export const getAllSize=createAsyncThunk("fetAllSize",async ()=>{
    try {
        const res=await SizeAPI.getAll();
        return res.data;
    }catch (e) {
        console.log(e)
    }
})

const SizeSlice=createSlice({
    name:"size",
    initialState,
    reducers:{
        setListSize:(state,action)=>{
            state.listSize=action.payload;
        }
    },
    extraReducers:(builder=>{
        builder
            .addCase(getAllSize.pending,(state,action)=>{
                state.isLoading=true;
            })
            .addCase(getAllSize.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.listSize=action.payload;
            })
            .addCase(getAllSize.rejected,(state,action)=>{
                state.isLoading=false;
            })
    })
})

export const {setListSize}=SizeSlice.actions

export default SizeSlice.reducer