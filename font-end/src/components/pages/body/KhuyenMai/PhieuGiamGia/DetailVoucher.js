import {Button, Col, Form, Modal} from "react-bootstrap";
import {NumericFormat} from "react-number-format";
import {useEffect, useState} from "react";
import VoucherAPI from "../../../../services/VoucherAPI/VoucherAPI";


const DetailVoucher=(props)=>{
    //state
    const [voucherObject,setVoucherObject]=useState({
        name:"",
        value:"",
        minimum_order:"",
        quantity:"",
        date_start:"",
        date_end:""
    });

    const [show,setShow]=useState(true);

    const handleClose=()=>{
        setShow(false);
        setTimeout(()=>{
            props.setOpenDetailModal(false);
        },[200]);
    }

    //UseEffect
    useEffect(() => {
        callAPIGetVoucherById();
    }, []);

    const callAPIGetVoucherById= async ()=>{
        try {
            const response= await VoucherAPI.getVoucherById(props.voucher_id);
            const data=response.data;
            const newVoucherObject = {...voucherObject};
            newVoucherObject.voucher_id = props.voucher_id;
            newVoucherObject.name = data.name;
            newVoucherObject.value = data.value;
            newVoucherObject.quantity = data.quantity;
            newVoucherObject.minimum_order = data.minimum_order;
            newVoucherObject.date_start = data.date_start;
            newVoucherObject.date_end = data.date_end;
            setVoucherObject(newVoucherObject);
        }catch (e){
            console.log(e);
        }
    }

    return(
        <>
            {/*Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết phiếu giảm giá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm={12}>
                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Tên phiếu giảm giá</Form.Label>
                            <Form.Control value={voucherObject.name} required type="text" placeholder="Điền tên phiếu giảm giá!" disabled/>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Giá trị giảm</Form.Label>
                            <NumericFormat value={voucherObject.value} style={{width:"100%",padding: "0.375rem 0.75rem",borderRadius:"5px",border:"1px solid #dee2e6",outline:"none",fontSize:"16px"}} placeholder={"Điền Giá Trị Giảm!"}
                                           thousandSeparator={true} suffix={"VNĐ"} disabled/>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Đơn Tối Thiểu</Form.Label>
                            <NumericFormat value={voucherObject.minimum_order} style={{width:"100%",padding: "0.375rem 0.75rem",borderRadius:"5px",border:"1px solid #dee2e6",outline:"none",fontSize:"16px"}} placeholder={"Điền Đơn Tối Thiểu!"}
                                           thousandSeparator={true} suffix={"VNĐ"} disabled/>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Số Lượng</Form.Label>
                            <Form.Control value={voucherObject.quantity} required type="text" placeholder="Điền số Lượng!" disabled/>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Ngày Bắt Đầu</Form.Label>
                            <Form.Control value={voucherObject.date_start} required type="date" disabled/>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label><span style={{color: "red"}}>*</span> Ngày Kết Thúc</Form.Label>
                            <Form.Control value={voucherObject.date_end} required type="date" disabled/>
                        </Form.Group>
                    </Col>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Quay Về</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DetailVoucher;