import "./style/AddVoucher.css"
import {Button, Col, Form, Modal} from "react-bootstrap";
import {memo, useState} from "react";
import {NumericFormat} from "react-number-format";
import VoucherAPI from "../../../../services/VoucherAPI/VoucherAPI";
import {useDispatch, useSelector} from "react-redux";
import {toastMessage} from "../../../../../redux/slices/ToastMsgSlice";
import Loading from "../../../loading/Loading";

const AddVoucher=(props)=>{
    //dispatch
    const dispatch=useDispatch();
    //toastMessage
    const toastSuccess=useSelector(state => state.toastmsg.toastSuccess);
    const toastError=useSelector(state => state.toastmsg.toastError);
    //state
    const [postVoucherRequest,setPostVoucherRequest]=useState({
        name:"",
        value:"",
        minimum_order:"",
        quantity:"",
        date_start:"",
        date_end:""
    });
    const[loading,setLoading]=useState(false);
    //touch
    const [touchPostVoucherRequest,setTouchPostVoucherRequest]=useState({
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
        date_end:undefined,
        date:undefined
    });

    //showModal
    const [show,setShow]=useState(true);


    const handleClose=()=>{
        setShow(false);
        setTimeout(()=>{
            props.setOpenAddModal(false);
        },[200]);
    }

    const handlePost= async ()=>{
        setLoading(true);
        try {
            const response = await VoucherAPI.postVoucherAPI(postVoucherRequest);
            if(response && response.status === 201){
                setLoading(false);
                props.callAPIGetAllVoucherPaging();
                props.callAPIGetToTalPage();
                const toastMsg={...toastSuccess}
                toastMsg.message="Thêm Mới Voucher Thành Công!"
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
        const newPostVoucherRequest={...postVoucherRequest};
        newPostVoucherRequest.name=e.target.value;
        setPostVoucherRequest(newPostVoucherRequest);

        if(error !== undefined){
            const newError={...error};
            newError.name=undefined;
            setError(newError);
        }

        if(!touchPostVoucherRequest.name){
            const newTouchPostVoucherRequest={...touchPostVoucherRequest};
            newTouchPostVoucherRequest.name=true;
            setTouchPostVoucherRequest(newTouchPostVoucherRequest);
        }
    }

    const onChangeVoucherValue=(e)=>{
        const newPostVoucherRequest={...postVoucherRequest};
        newPostVoucherRequest.value=e.value;
        setPostVoucherRequest(newPostVoucherRequest);

        if(error.value !== undefined){
            const newError={...error};
            newError.value=undefined;
            setError(newError);
        }

        if(!touchPostVoucherRequest.value){
            const newTouchPostVoucherRequest={...touchPostVoucherRequest};
            newTouchPostVoucherRequest.value=true;
            setTouchPostVoucherRequest(newTouchPostVoucherRequest);
        }
    }

    const onChangeVoucherMinimumOder=(e)=>{
        const newPostVoucherRequest={...postVoucherRequest};
        newPostVoucherRequest.minimum_order=e.value;
        setPostVoucherRequest(newPostVoucherRequest);

        if(error.minimum_order !== undefined){
            const newError={...error};
            newError.minimum_order=undefined;
            setError(newError);
        }

        if(!touchPostVoucherRequest.minimum_order){
            const newTouchPostVoucherRequest={...touchPostVoucherRequest};
            newTouchPostVoucherRequest.minimum_order=true;
            setTouchPostVoucherRequest(newTouchPostVoucherRequest);
        }
    }

    const onChangeVoucherQuantity=(e)=>{
        const newPostVoucherRequest={...postVoucherRequest};
        newPostVoucherRequest.quantity=e.target.value;
        setPostVoucherRequest(newPostVoucherRequest);

        if(error.quantity !== undefined){
            const newError={...error};
            newError.quantity=undefined;
            setError(newError);
        }

        if(!touchPostVoucherRequest.quantity){
            const newTouchPostVoucherRequest={...touchPostVoucherRequest};
            newTouchPostVoucherRequest.quantity=true;
            setTouchPostVoucherRequest(newTouchPostVoucherRequest);
        }
    }

    const onChangeVoucherDateStart=(e)=>{
        const newPostVoucherRequest={...postVoucherRequest};
        newPostVoucherRequest.date_start=e.target.value;
        setPostVoucherRequest(newPostVoucherRequest);

        if(error.date_start !== undefined){
            const newError={...error};
            newError.date_start=undefined;
            setError(newError);
        }

        if(!touchPostVoucherRequest.date_start){
            const newTouchPostVoucherRequest={...touchPostVoucherRequest};
            newTouchPostVoucherRequest.date_start=true;
            setTouchPostVoucherRequest(newTouchPostVoucherRequest);
        }
    }

    const onChangeVoucherDateEnd=(e)=>{
        const newPostVoucherRequest={...postVoucherRequest};
        newPostVoucherRequest.date_end=e.target.value;
        setPostVoucherRequest(newPostVoucherRequest);

        if(error.date_end !== undefined){
            const newError={...error};
            newError.date_end=undefined;
            setError(newError);
        }

        if(!touchPostVoucherRequest.date_end){
            const newTouchPostVoucherRequest={...touchPostVoucherRequest};
            newTouchPostVoucherRequest.date_end=true;
            setTouchPostVoucherRequest(newTouchPostVoucherRequest);
        }
    }

    return(
        <>
            {loading && <Loading/>}
            {/*Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm phiếu giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm={12}>
                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Tên phiếu giảm giá</Form.Label>
                            <Form.Control value={postVoucherRequest.name} onChange={onChangeVoucherName} required
                                          isInvalid={touchPostVoucherRequest.name && postVoucherRequest.name === "" || error.name !== undefined}
                                          isValid={postVoucherRequest.name!==''} type="text" placeholder="Điền tên phiếu giảm giá!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.name !== undefined ? error.name : "Bạn Chưa Điền Tên Phiếu Giảm Giá!"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Giá trị giảm</Form.Label>
                            <NumericFormat style={{width:"100%",padding: "0.375rem 0.75rem",borderRadius:"5px",border:"1px solid #dee2e6",outline:"none",fontSize:"16px"}} placeholder={"Điền Giá Trị Giảm!"}
                                           thousandSeparator={true} suffix={"VNĐ"} onValueChange={onChangeVoucherValue}/>
                            {error.value !== undefined ? <span style={{color:"#dc3545",fontSize:"14px"}}>{error.value}</span> : ""}
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Đơn Tối Thiểu</Form.Label>
                            <NumericFormat style={{width:"100%",padding: "0.375rem 0.75rem",borderRadius:"5px",border:"1px solid #dee2e6",outline:"none",fontSize:"16px"}} placeholder={"Điền Đơn Tối Thiểu!"}
                                           thousandSeparator={true} suffix={"VNĐ"} onValueChange={onChangeVoucherMinimumOder}/>
                            {error.minimum_order !== undefined ? <span style={{color:"#dc3545",fontSize:"14px"}}>{error.minimum_order}</span> : ""}
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Số Lượng</Form.Label>
                            <Form.Control value={postVoucherRequest.quantity} onChange={onChangeVoucherQuantity} required
                                          isInvalid={touchPostVoucherRequest.quantity && postVoucherRequest.quantity === "" || error.quantity !== undefined}
                                          isValid={postVoucherRequest.quantity!==''} type="text" placeholder="Điền số Lượng!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.quantity !== undefined ? error.quantity : "Bạn Chưa Điền Số Lượng!"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Ngày Bắt Đầu</Form.Label>
                            <Form.Control value={postVoucherRequest.date_start} onChange={onChangeVoucherDateStart} required
                                          isInvalid={touchPostVoucherRequest.date_start && postVoucherRequest.date_start === "" || error.date_start !== undefined} type="date"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.date_start !== undefined ? error.date_start : "Bạn Chưa Chọn Ngày Bắt Đầu!"}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Ngày Kết Thúc</Form.Label>
                            <Form.Control value={postVoucherRequest.date_end} onChange={onChangeVoucherDateEnd} required
                                          isInvalid={touchPostVoucherRequest.date_end && postVoucherRequest.date_end === "" || error.date_end !== undefined} type="date"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.date_end !== undefined ? error.date_end :"Bạn Chưa Chọn Ngày Kết Thúc!"}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                    <Button variant="primary" onClick={handlePost}>Thêm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(AddVoucher)