import Loading from "../../../../loading/Loading";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {useSelector,useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {toastMessage} from "../../../../../../redux/slices/ToastMsgSlice";
import CustomerAPI from "../../../../../services/CustomerAPI/CustomerAPI";

const DetailKhachHang =(props)=>{
    //state
    const [putCustomerRequest,setPutCustomerRequest]=useState({
        id:undefined,
        name:"",
        phone:"",
        email:"",
        status:"true"
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
            props.setOpenDetailModal(false);
        },[200]);
    }


    return(
        <>
            {/*Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm={12}>
                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Tên khách hàng</Form.Label>
                            <Form.Control value={putCustomerRequest.name} required
                                          isValid={putCustomerRequest.name!==''} type="text" placeholder="Điền tên khách hàng!"/>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Số điện thoại</Form.Label>
                            <Form.Control value={putCustomerRequest.phone} required
                                          isValid={putCustomerRequest.phone!==''} type="text" placeholder="Điền số điện thoại!"/>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Email</Form.Label>
                            <Form.Control value={putCustomerRequest.email} required
                                          isValid={putCustomerRequest.email!==''} type="text" placeholder="Điền email!"/>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Trạng Thái</Form.Label>
                            <Form.Select value={putCustomerRequest.status} isValid={putCustomerRequest.status !== ""}>
                                <option value="true">Kích hoạt</option>
                                <option value="false">Ngưng kích hoạt</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >Quay Lại</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DetailKhachHang