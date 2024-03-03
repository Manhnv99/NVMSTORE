import Loading from "../../../../loading/Loading";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import {useState} from "react";
import {toastMessage} from "../../../../../../redux/slices/ToastMsgSlice";
import CustomerAPI from "../../../../../services/CustomerAPI/CustomerAPI";

const AddKhachHang =(props)=>{
    //dispatch
    const dispatch=useDispatch();
    //toastMessage
    const toastSuccess=useSelector(state => state.toastmsg.toastSuccess);
    const toastError=useSelector(state => state.toastmsg.toastError);
    //state
    const [postCustomerRequest,setPostCustomerRequest]=useState({
        name:"",
        phone:"",
        email:"",
        status:"true"
    });
    const[loading,setLoading]=useState(false);
    //touch
    const [touchPostCustomerRequest,setTouchPostCustomerRequest]=useState({
        name:false,
        phone:false,
        email:false,
        status:false
    });
    //error
    const [error,setError]=useState({
        name:undefined,
        phone:undefined,
        email:undefined,
        status:undefined
    });

    //showModal
    const [show,setShow]=useState(true);


    const handleClose=()=>{
        setShow(false);
        setTimeout(()=>{
            props.setOpenPostModal(false);
        },[200]);
    }

    const handlePostCustomer= async ()=>{
        setLoading(true);
        try {
            const newPostCustomerRequest = {...postCustomerRequest};
            if(newPostCustomerRequest.status === "true"){
                newPostCustomerRequest.status = true;
            }else{
                newPostCustomerRequest.status = false;
            }
            console.log(newPostCustomerRequest)
            const response = await CustomerAPI.postCustomer(newPostCustomerRequest);
            if(response && response.status === 201){
                setLoading(false);
                props.CallListCustomer();
                props.CallGetToTalPage();
                const toastMsg={...toastSuccess}
                toastMsg.message="Thêm Mới Khách Hàng Thành Công!"
                dispatch(toastMessage(toastMsg));
                handleClose();
            }
        }catch (e) {
            setLoading(false);
            const catchError=e.response.data;
            console.log(catchError)
            const newError= {...error};
            newError.name=catchError.name;
            newError.phone=catchError.phone;
            newError.email=catchError.email;
            newError.status=catchError.status;
            setError(newError);
        }
    }

    //onChange
    const onChangeCustomerName=(e)=>{
        const newPostCustomerRequest={...postCustomerRequest};
        newPostCustomerRequest.name=e.target.value;
        setPostCustomerRequest(newPostCustomerRequest);

        if(error !== undefined){
            const newError={...error};
            newError.name=undefined;
            setError(newError);
        }

        if(!touchPostCustomerRequest.name){
            const newTouchPostCustomerRequest={...touchPostCustomerRequest};
            newTouchPostCustomerRequest.name=true;
            setTouchPostCustomerRequest(newTouchPostCustomerRequest);
        }
    }

    const onChangeCustomerEmail=(e)=>{
        const newPostCustomerRequest={...postCustomerRequest};
        newPostCustomerRequest.email=e.target.value;
        setPostCustomerRequest(newPostCustomerRequest);

        if(error !== undefined){
            const newError={...error};
            newError.email=undefined;
            setError(newError);
        }

        if(!touchPostCustomerRequest.email){
            const newTouchPostCustomerRequest={...touchPostCustomerRequest};
            newTouchPostCustomerRequest.email=true;
            setTouchPostCustomerRequest(newTouchPostCustomerRequest);
        }
    }

    const onChangeCustomerPhone=(e)=>{
        const newPostCustomerRequest={...postCustomerRequest};
        newPostCustomerRequest.phone=e.target.value;
        setPostCustomerRequest(newPostCustomerRequest);

        if(error !== undefined){
            const newError={...error};
            newError.phone=undefined;
            setError(newError);
        }

        if(!touchPostCustomerRequest.phone){
            const newTouchPostCustomerRequest={...touchPostCustomerRequest};
            newTouchPostCustomerRequest.phone=true;
            setTouchPostCustomerRequest(newTouchPostCustomerRequest);
        }
    }

    const onChangeCustomerStatus=(e)=>{
        const newPostCustomerRequest={...postCustomerRequest};
        newPostCustomerRequest.status=e.target.value;
        setPostCustomerRequest(newPostCustomerRequest);

        if(error !== undefined){
            const newError={...error};
            newError.status=undefined;
            setError(newError);
        }

        if(!touchPostCustomerRequest.status){
            const newTouchPostCustomerRequest={...touchPostCustomerRequest};
            newTouchPostCustomerRequest.status=true;
            setTouchPostCustomerRequest(newTouchPostCustomerRequest);
        }
    }

    return(
        <>
            {loading && <Loading/>}
            {/*Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm={12}>
                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Tên khách hàng</Form.Label>
                            <Form.Control value={postCustomerRequest.name} onChange={onChangeCustomerName} required
                                          isInvalid={touchPostCustomerRequest.name && postCustomerRequest.name === "" || error.name !== undefined}
                                          isValid={postCustomerRequest.name!==''} type="text" placeholder="Điền tên khách hàng!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.name !== undefined ? error.name : "Bạn Chưa Điền Tên Khách Hàng!"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Số điện thoại</Form.Label>
                            <Form.Control value={postCustomerRequest.phone} onChange={onChangeCustomerPhone} required
                                          isInvalid={touchPostCustomerRequest.phone && postCustomerRequest.phone === "" || error.phone !== undefined}
                                          isValid={postCustomerRequest.phone!==''} type="text" placeholder="Điền số điện thoại!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.phone !== undefined ? error.phone : "Bạn Chưa Điền Số Điện Thoại!"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Email</Form.Label>
                            <Form.Control value={postCustomerRequest.email} onChange={onChangeCustomerEmail} required
                                          isInvalid={touchPostCustomerRequest.email && postCustomerRequest.email === "" || error.email !== undefined}
                                          isValid={postCustomerRequest.email!==''} type="text" placeholder="Điền email!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.email !== undefined ? error.email : "Bạn Chưa Điền Email!"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Trạng Thái</Form.Label>
                            <Form.Select value={postCustomerRequest.status} onChange={onChangeCustomerStatus} isValid={postCustomerRequest.status !== ""}>
                                <option value="true">Kích hoạt</option>
                                <option value="false">Ngưng kích hoạt</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >Hủy</Button>
                    <Button variant="primary" onClick={handlePostCustomer}>Thêm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddKhachHang