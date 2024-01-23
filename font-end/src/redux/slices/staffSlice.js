import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import staffAPI from "../../components/services/StaffAPI/StaffAPI";


const initialState={
    listStaff:[],
    isLoading:false,
    isError: false
};

export const getAllStaff=createAsyncThunk(
    "fetchAllStaff",
    async (page)=>{
        try {
            const response= await staffAPI.getAll(page);
            return response.data;
        }catch (e) {
            console.log(e)
        }
    }
)

export const staffSlice=createSlice({
    name:"staff",
    initialState,
    reducers:{
        setListStaff:(state,action)=>{
            state.listStaff=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllStaff.pending,(state, action)=>{
                state.isLoading=true;
                state.isError=false;
            })
            .addCase(getAllStaff.fulfilled,(state,action)=>{
                state.listStaff=action.payload
                state.isLoading=false;
                state.isError=false;
            })
            .addCase(getAllStaff.rejected,(state, action)=>{
                state.isError=true;
                state.isLoading=false;
            })
    }
})

export const {setListStaff}=staffSlice.actions
export default staffSlice.reducer;