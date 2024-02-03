import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ColorAPI from "../../components/services/ColorAPI/ColorAPI";


const initialState={
    listColor:[],
    isLoading:false,
}

export const getAllColor=createAsyncThunk("fetAllColor",async ()=>{
    try {
        const res=await ColorAPI.getAll();
        return res.data;
    }catch (e) {
        console.log(e)
    }
})

const ColorSlice=createSlice({
    name:"color",
    initialState,
    reducers:{
        setListColor:(state,action)=>{
            state.listColor=action.payload;
        }
    },
    extraReducers:(builder=>{
        builder
            .addCase(getAllColor.pending,(state,action)=>{
                state.isLoading=true;
            })
            .addCase(getAllColor.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.listColor=action.payload;
            })
            .addCase(getAllColor.rejected,(state,action)=>{
                state.isLoading=false;
            })
    })
})

export const {setListColor}=ColorSlice.actions

export default ColorSlice.reducer