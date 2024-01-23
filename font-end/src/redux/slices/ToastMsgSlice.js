import {createSlice} from "@reduxjs/toolkit";
import ToastMessage from "../../components/pages/toastmsg/ToastMessage";

const initialState={

}

const ToastMsgSlice=createSlice({
    name:"toastmsg",
    initialState,
    reducers:{
        toastMessage:(state,action)=>{
            let toastContent=document.createElement("div")
            toastContent.classList.add('toastmsg-body')
            toastContent.innerHTML= `
                                <i class="fa-solid fa-circle-check"></i>
                                <span class="message">${action.payload}</span>
                                <span class="countdown"></span>`

            //toast container
            let toastContainer=document.getElementsByClassName('toastmsg-container')[0]
            toastContainer.appendChild(toastContent)
            setTimeout(()=>{
                toastContent.style.animation='endd ease-in-out 1.5s forwards'
            },3000)

            setTimeout(()=>{
                toastContent.remove()
            },6000)
        }
    }
})

export const {toastMessage}=ToastMsgSlice.actions

export default ToastMsgSlice.reducer