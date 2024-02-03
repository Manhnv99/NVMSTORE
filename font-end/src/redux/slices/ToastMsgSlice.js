import {createSlice} from "@reduxjs/toolkit";

const initialState={
    toastSuccess: {
        body: "toastmsg-body_success",
        message: "",
        countdown: "countdown_success",
        icon: "fa-solid fa-check icon_success"
    },
    toastWarning : {
        body: "toastmsg-body_warning",
        message: "",
        countdown: "countdown_warning",
        icon: "fa-solid fa-triangle-exclamation icon_warning"
    },
    toastError : {
        body: "toastmsg-body_error",
        message: "",
        countdown: "countdown_error",
        icon: "fa-solid fa-exclamation icon_error"
    }
}

const ToastMsgSlice=createSlice({
    name:"toastmsg",
    initialState,
    reducers:{
        toastMessage:(state,action)=>{
            let toastContent=document.createElement("div")
            toastContent.classList.add(action.payload.body)
            toastContent.classList.add('toastmsg-body')
            toastContent.innerHTML= `
                                <i class="${action.payload.icon}"></i>
                                <span class="message">${action.payload.message}</span>
                                <span class=${action.payload.countdown}></span>`

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