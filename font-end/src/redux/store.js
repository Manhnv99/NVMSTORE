import {configureStore} from "@reduxjs/toolkit";
import staffSlice from "./slices/staffSlice";
import APIVNSlice from "./slices/APIVNSlice";
import ToastMsgSlice from "./slices/ToastMsgSlice";


export const store=configureStore({
    reducer:{
        staff:staffSlice,
        geograph:APIVNSlice,
        toastmsg:ToastMsgSlice
    }
})