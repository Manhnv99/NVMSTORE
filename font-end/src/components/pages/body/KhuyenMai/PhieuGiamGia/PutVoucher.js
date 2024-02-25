import {Button, Col, Form, Modal} from "react-bootstrap";
import {NumericFormat} from "react-number-format";
import {useEffect, useState} from "react";
import VoucherAPI from "../../../../services/VoucherAPI/VoucherAPI";
import {toastMessage} from "../../../../../redux/slices/ToastMsgSlice";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../loading/Loading";


const PutVoucher=(props)=>{
    //dispatch
    const dispatch = useDispatch();
    //toastMessage
    const toastSuccess=useSelector(state => state.toastmsg.toastSuccess);
    const toastError=useSelector(state => state.toastmsg.toastError);
    //state
    const [putVoucherRequest,setPutVoucherRequest]=useState({
        voucher_id:"",
        name:"",
        value:"",
        minimum_order:"",
        quantity:"",
        date_start:"",
        date_end:""
    });
    const [loading,setLoading] = useState(false);
    //touch
    const [touchPutVoucherRequest,setTouchPutVoucherRequest]=useState({
        name:false,
        value:false,
        minimum_order:false,
        quantity:false,
        date_start:false,
        date_end:false
    });
    //error
    const [error,setError]=useState({
        name:undefined,
        value:undefined,
        minimum_order:undefined,
        quantity:undefined,
        date_start:undefined,
        date_end:undefined
    });

    const [show,setShow]=useState(true);


    //UseEffect
    useEffect(() => {
        callAPIGetVoucherById();
    }, []);

    const callAPIGetVoucherById= async ()=>{
        try {
            const response= await VoucherAPI.getVoucherById(props.voucher_id);
            const data=response.data;
            const newPutVoucherRequest = {...putVoucherRequest};
            newPutVoucherRequest.voucher_id = props.voucher_id;
            newPutVoucherRequest.name = data.name;
            newPutVoucherRequest.value = data.value;
            newPutVoucherRequest.quantity = data.quantity;
            newPutVoucherRequest.minimum_order = data.minimum_order;
            newPutVoucherRequest.date_start = data.date_start;
            newPutVoucherRequest.date_end = data.date_end;
            setPutVoucherRequest(newPutVoucherRequest);
        }catch (e){
            console.log(e);
        }
    }

    const handleClose=()=>{
        setShow(false);
        setTimeout(()=>{
            props.setOpenPutModal(false);
        },[200]);
    }

    const handlePut= async ()=>{
        setLoading(true);
        try {
            const response = await VoucherAPI.putVoucherAPI(putVoucherRequest);
            if(response && response.status === 200){
                setLoading(false);
                props.callAPIGetAllVoucherPaging();
                const toastMsg={...toastSuccess}
                toastMsg.message="Cập Nhật Voucher Thành Công!"
                dispatch(toastMessage(toastMsg));
                handleClose();
            }
        }catch (e) {
            setLoading(false);
            const catchError=e.response.data;

            const newError= {...error};
            newError.name=catchError.name;
            newError.value=catchError.value;
            newError.quantity=catchError.quantity;
            newError.minimum_order=catchError.minimum_order;
            newError.date_start=catchError.date_start;
            newError.date_end=catchError.date_end;
            newError.date=catchError.date;

            if(catchError.date !== undefined){
                const toastMsg={...toastError}
                toastMsg.message="Ngày Bắt Đầu Phải Nhỏ Hơn Hoặc Bằng Ngày Kết Thúc!"
                dispatch(toastMessage(toastMsg));
            }

            setError(newError);
        }
    }

    //onChange
    const onChangeVoucherName=(e)=>{
        const newPostVoucherRequest={...putVoucherRequest};
        newPostVoucherRequest.name=e.target.value;
        setPutVoucherRequest(newPostVoucherRequest);

        if(error !== undefined){
            const newError={...error};
            newError.name=undefined;
            setError(newError);
        }

        if(!touchPutVoucherRequest.name){
            const newTouchPutVoucherRequest={...touchPutVoucherRequest};
            newTouchPutVoucherRequest.name=true;
            setTouchPutVoucherRequest(newTouchPutVoucherRequest);
        }
    }

    const onChangeVoucherValue=(e)=>{
        const newPutVoucherRequest={...putVoucherRequest};
        newPutVoucherRequest.value=e.value;
        setPutVoucherRequest(newPutVoucherRequest);

        if(error.value !== undefined){
            const newError={...error};
            newError.value=undefined;
            setError(newError);
        }

        if(!touchPutVoucherRequest.value){
            const newTouchPutVoucherRequest={...touchPutVoucherRequest};
            newTouchPutVoucherRequest.value=true;
            setTouchPutVoucherRequest(newTouchPutVoucherRequest);
        }
    }

    const onChangeVoucherMinimumOder=(e)=>{
        const newPutVoucherRequest={...putVoucherRequest};
        newPutVoucherRequest.minimum_order=e.value;
        setPutVoucherRequest(newPutVoucherRequest);

        if(error.minimum_order !== undefined){
            const newError={...error};
            newError.minimum_order=undefined;
            setError(newError);
        }

        if(!touchPutVoucherRequest.minimum_order){
            const newTouchPutVoucherRequest={...touchPutVoucherRequest};
            newTouchPutVoucherRequest.minimum_order=true;
            setTouchPutVoucherRequest(newTouchPutVoucherRequest);
        }
    }

    const onChangeVoucherQuantity=(e)=>{
        const newPutVoucherRequest={...putVoucherRequest};
        newPutVoucherRequest.quantity=e.target.value;
        setPutVoucherRequest(newPutVoucherRequest);

        if(error.quantity !== undefined){
            const newError={...error};
            newError.quantity=undefined;
            setError(newError);
        }

        if(!touchPutVoucherRequest.quantity){
            const newTouchPutVoucherRequest={...touchPutVoucherRequest};
            newTouchPutVoucherRequest.quantity=true;
            setTouchPutVoucherRequest(newTouchPutVoucherRequest);
        }
    }

    const onChangeVoucherDateStart=(e)=>{
        const newPostVoucherRequest={...putVoucherRequest};
        newPostVoucherRequest.date_start=e.target.value;
        setPutVoucherRequest(newPostVoucherRequest);

        if(error.date_start !== undefined){
            const newError={...error};
            newError.date_start=undefined;
            setError(newError);
        }

        if(!touchPutVoucherRequest.date_start){
            const newTouchPutVoucherRequest={...touchPutVoucherRequest};
            newTouchPutVoucherRequest.date_start=true;
            setTouchPutVoucherRequest(newTouchPutVoucherRequest);
        }
    }

    const onChangeVoucherDateEnd=(e)=>{
        const newPutVoucherRequest={...putVoucherRequest};
        newPutVoucherRequest.date_end=e.target.value;
        setPutVoucherRequest(newPutVoucherRequest);

        if(error.date_end !== undefined){
            const newError={...error};
            newError.date_end=undefined;
            setError(newError);
        }

        if(!touchPutVoucherRequest.date_end){
            const newTouchPutVoucherRequest={...touchPutVoucherRequest};
            newTouchPutVoucherRequest.date_end=true;
            setTouchPutVoucherRequest(newTouchPutVoucherRequest);
        }
    }

    return(
        <>
            {loading && <Loading/>}
            {/*Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật phiếu giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm={12}>
                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Tên phiếu giảm giá</Form.Label>
                            <Form.Control value={putVoucherRequest.name} onChange={onChangeVoucherName} required
                                          isInvalid={touchPutVoucherRequest.name && putVoucherRequest.name === "" || error.name !== undefined}
                                          isValid={putVoucherRequest.name!==''} type="text" placeholder="Điền tên phiếu giảm giá!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.name !== undefined ? error.name : "Bạn Chưa Điền Tên Phiếu Giảm Giá!"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Giá trị giảm</Form.Label>
                            <NumericFormat value={putVoucherRequest.value} style={{width:"100%",padding: "0.375rem 0.75rem",borderRadius:"5px",border:"1px solid #dee2e6",outline:"none",fontSize:"16px"}} placeholder={"Điền Giá Trị Giảm!"}
                                           thousandSeparator={true} suffix={"VNĐ"} onValueChange={onChangeVoucherValue}/>
                            {error.value !== undefined ? <span style={{color:"#dc3545",fontSize:"14px"}}>{error.value}</span> : ""}
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Đơn Tối Thiểu</Form.Label>
                            <NumericFormat value={putVoucherRequest.minimum_order} style={{width:"100%",padding: "0.375rem 0.75rem",borderRadius:"5px",border:"1px solid #dee2e6",outline:"none",fontSize:"16px"}} placeholder={"Điền Đơn Tối Thiểu!"}
                                           thousandSeparator={true} suffix={"VNĐ"} onValueChange={onChangeVoucherMinimumOder}/>
                            {error.minimum_order !== undefined ? <span style={{color:"#dc3545",fontSize:"14px"}}>{error.minimum_order}</span> : ""}
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Số Lượng</Form.Label>
                            <Form.Control value={putVoucherRequest.quantity} onChange={onChangeVoucherQuantity} required
                                          isInvalid={touchPutVoucherRequest.quantity && putVoucherRequest.quantity === "" || error.quantity !== undefined}
                                          isValid={putVoucherRequest.quantity!==''} type="text" placeholder="Điền số Lượng!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.quantity !== undefined ? error.quantity : "Bạn Chưa Điền Số Lượng!"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Ngày Bắt Đầu</Form.Label>
                            <Form.Control value={putVoucherRequest.date_start} onChange={onChangeVoucherDateStart} required
                                          isInvalid={touchPutVoucherRequest.date_start && putVoucherRequest.date_start === "" || error.date_start !== undefined}
                                          isValid={putVoucherRequest.date_start!==''} type="date"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.date_start !== undefined ? error.date_start : "Bạn Chưa Chọn Ngày Bắt Đầu!"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Ngày Kết Thúc</Form.Label>
                            <Form.Control value={putVoucherRequest.date_end} onChange={onChangeVoucherDateEnd} required
                                          isInvalid={touchPutVoucherRequest.date_end && putVoucherRequest.date_end === "" || error.date_end !== undefined}
                                          isValid={putVoucherRequest.date_end!==''} type="date"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.date_end !== undefined ? error.date_end : "Bạn Chưa Chọn Ngày Kết Thúc!"}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                    <Button variant="primary" onClick={handlePut}>Cập Nhật</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default PutVoucher;