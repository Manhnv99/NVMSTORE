import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {toastMessage} from "../../../../redux/slices/ToastMsgSlice";


const ThongKe=()=> {

    const dispatch = useDispatch();
    const toastSuccess = {
        body: "toastmsg-body_success",
        message: "hihihih22222",
        countdown: "countdown_success",
        icon: "fa-solid fa-check icon_success"
    }
    const toastWarning = {
        body: "toastmsg-body_warning",
        message: "hihihih22222",
        countdown: "countdown_warning",
        icon: "fa-solid fa-triangle-exclamation icon_warning"
    }

    const toastError = {
        body: "toastmsg-body_error",
        message: "hihihih22222",
        countdown: "countdown_error",
        icon: "fa-solid fa-exclamation icon_error"
    }

    const handleTest = () => {
        dispatch(toastMessage(toastError));
    }

    return (
        <Button onClick={handleTest}>Test</Button>
    )
}
export default ThongKe