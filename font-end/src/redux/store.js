import {configureStore} from "@reduxjs/toolkit";
import staffSlice from "./slices/StaffSlice";
import APIVNSlice from "./slices/APIVNSlice";
import ToastMsgSlice from "./slices/ToastMsgSlice";
import CategorySlice from "./slices/CategorySlice";
import SoleSlice from "./slices/SoleSlice";
import MaterialSlice from "./slices/MaterialSlice";
import BrandSlice from "./slices/BrandSlice";
import GenderSlice from "./slices/GenderSlice";
import StatusProductDetailSlice from "./slices/StatusProductDetailSlice";


export const store=configureStore({
    reducer:{
        staff:staffSlice,
        category:CategorySlice,
        sole:SoleSlice,
        material:MaterialSlice,
        brand:BrandSlice,
        gender:GenderSlice,
        status_product_detail:StatusProductDetailSlice,
        geograph:APIVNSlice,
        toastmsg:ToastMsgSlice
    }
})