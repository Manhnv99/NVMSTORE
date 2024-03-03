import Loading from "../../../../loading/Loading";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {toastMessage} from "../../../../../../redux/slices/ToastMsgSlice";
import CustomerAPI from "../../../../../services/CustomerAPI/CustomerAPI";

const UpdateKhachHang =(props)=>{
    //dispatch
    const dispatch=useDispatch();
    //toastMessage
    const toastSuccess=useSelector(state => state.toastmsg.toastSuccess);
    const toastError=useSelector(state => state.toastmsg.toastError);
    //state
    const [putCustomerRequest,setPutCustomerRequest]=useState({
        id:undefined,
        name:"",
        phone:"",
        email:"",
        status:"KICH_HOAT"
    });
    const[loading,setLoading]=useState(false);
    //touch
    const [touchPutCustomerRequest,setTouchPutCustomerRequest]=useState({
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

    useEffect(() => {
        callCustomerById();
    }, []);

    const callCustomerById= async ()=>{
        try {
            const response = await CustomerAPI.getCustomerById(props.customer_id);
            if(response && response.status === 200){
                const newPutCustomerRequest = {...putCustomerRequest}
                newPutCustomerRequest.id=props.customer_id;
                newPutCustomerRequest.name=response.data.name;
                newPutCustomerRequest.phone=response.data.phone;
                newPutCustomerRequest.email=response.data.email;
                newPutCustomerRequest.status=response.data.status;
                setPutCustomerRequest(newPutCustomerRequest);
            }
        }catch (e){
            console.log(e);
        }
    }

    //handle function
    const handleClose=()=>{
        setShow(false);
        setTimeout(()=>{
            props.setOpenPutModal(false);
        },[200]);
    }

    const handlePutCustomer= async ()=>{
        setLoading(true);
        try {
            const newPutCustomerRequest = {...putCustomerRequest};
            const response = await CustomerAPI.putCustomer(newPutCustomerRequest);
            if(response && response.status === 200){
                setLoading(false);
                props.CallListCustomer();
                const toastMsg={...toastSuccess}
                toastMsg.message="Cập Nhật Khách Hàng Thành Công!"
                dispatch(toastMessage(toastMsg));
                handleClose();
            }
        }catch (e) {
            setLoading(false);
            const catchError=e.response.data;
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
        const newPutCustomerRequest={...putCustomerRequest};
        newPutCustomerRequest.name=e.target.value;
        setPutCustomerRequest(newPutCustomerRequest);

        if(error !== undefined){
            const newError={...error};
            newError.name=undefined;
            setError(newError);
        }

        if(!touchPutCustomerRequest.name){
            const newTouchPutCustomerRequest={...touchPutCustomerRequest};
            newTouchPutCustomerRequest.name=true;
            setTouchPutCustomerRequest(newTouchPutCustomerRequest);
        }
    }

    const onChangeCustomerEmail=(e)=>{
        const newPutCustomerRequest={...putCustomerRequest};
        newPutCustomerRequest.email=e.target.value;
        setPutCustomerRequest(newPutCustomerRequest);

        if(error !== undefined){
            const newError={...error};
            newError.email=undefined;
            setError(newError);
        }

        if(!touchPutCustomerRequest.email){
            const newTouchPutCustomerRequest={...touchPutCustomerRequest};
            newTouchPutCustomerRequest.email=true;
            setTouchPutCustomerRequest(newTouchPutCustomerRequest);
        }
    }

    const onChangeCustomerPhone=(e)=>{
        const newPutCustomerRequest={...putCustomerRequest};
        newPutCustomerRequest.phone=e.target.value;
        setPutCustomerRequest(newPutCustomerRequest);

        if(error !== undefined){
            const newError={...error};
            newError.phone=undefined;
            setError(newError);
        }

        if(!touchPutCustomerRequest.phone){
            const newTouchPutCustomerRequest={...touchPutCustomerRequest};
            newTouchPutCustomerRequest.phone=true;
            setTouchPutCustomerRequest(newTouchPutCustomerRequest);
        }
    }

    const onChangeCustomerStatus=(e)=>{
        const newPutCustomerRequest={...putCustomerRequest};
        newPutCustomerRequest.status=e.target.value;
        setPutCustomerRequest(newPutCustomerRequest);

        if(error !== undefined){
            const newError={...error};
            newError.status=undefined;
            setError(newError);
        }

        if(!touchPutCustomerRequest.status){
            const newTouchPutCustomerRequest={...touchPutCustomerRequest};
            newTouchPutCustomerRequest.status=true;
            setTouchPutCustomerRequest(newTouchPutCustomerRequest);
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
                            <Form.Control value={putCustomerRequest.name} onChange={onChangeCustomerName} required
                                          isInvalid={touchPutCustomerRequest.name && putCustomerRequest.name === "" || error.name !== undefined}
                                          isValid={putCustomerRequest.name!==''} type="text" placeholder="Điền tên khách hàng!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.name !== undefined ? error.name : "Bạn Chưa Điền Tên Khách Hàng!"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Số điện thoại</Form.Label>
                            <Form.Control value={putCustomerRequest.phone} onChange={onChangeCustomerPhone} required
                                          isInvalid={touchPutCustomerRequest.phone && putCustomerRequest.phone === "" || error.phone !== undefined}
                                          isValid={putCustomerRequest.phone!==''} type="text" placeholder="Điền số điện thoại!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.phone !== undefined ? error.phone : "Bạn Chưa Điền Số Điện Thoại!"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Email</Form.Label>
                            <Form.Control value={putCustomerRequest.email} onChange={onChangeCustomerEmail} required
                                          isInvalid={touchPutCustomerRequest.email && putCustomerRequest.email === "" || error.email !== undefined}
                                          isValid={putCustomerRequest.email!==''} type="text" placeholder="Điền email!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.email !== undefined ? error.email : "Bạn Chưa Điền Email!"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Trạng Thái</Form.Label>
                            <Form.Select value={putCustomerRequest.status} onChange={onChangeCustomerStatus} isValid={putCustomerRequest.status !== ""}>
                                <option value="KICH_HOAT">Kích hoạt</option>
                                <option value="NGUNG_KICH_HOAT">Ngưng kích hoạt</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >Hủy</Button>
                    <Button variant="primary" onClick={handlePutCustomer}>Cập Nhật</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateKhachHang