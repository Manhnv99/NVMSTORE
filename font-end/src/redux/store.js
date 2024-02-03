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
import ProductSlice from "./slices/product/ProductSlice";
import ProductDetailSlice from "./slices/product/ProductDetailSlice";
import ColorSlice from "./slices/ColorSlice";
import SizeSlice from "./slices/SizeSlice";


export const store=configureStore({
    reducer:{
        staff:staffSlice,
        category:CategorySlice,
        sole:SoleSlice,
        material:MaterialSlice,
        brand:BrandSlice,
        gender:GenderSlice,
        color:ColorSlice,
        size:SizeSlice,
        status_product_detail:StatusProductDetailSlice,
        geograph:APIVNSlice,
        toastmsg:ToastMsgSlice,
        product:ProductSlice,
        productDetail:ProductDetailSlice
    }
})