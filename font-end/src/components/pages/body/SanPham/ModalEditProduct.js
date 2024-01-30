import {Button, Col, Form, Modal} from "react-bootstrap";
import {memo, useState} from "react";
import {NumericFormat} from "react-number-format";


const ModalEditProduct=(props)=>{
    //state
    const [quantity,setQuantity]=useState('');
    const [sell_price,setSell_Price]=useState('');


    const [show,setShow]=useState(true)
    const handleClose=()=>{
        setShow(false)
        setTimeout(()=>{
            props.setOpenModalEdit(false);
        },200)
    }

    const handleUpdate=()=>{
        props.handleEditProduct(quantity,sell_price);
        handleClose();
    }


    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa giá và số lượng sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col sm={12}>
                    <Form.Group>
                        <Form.Label><span style={{color: "red"}}>*</span> Số lượng</Form.Label>
                        <Form.Control value={quantity} onChange={(e)=>{setQuantity(e.target.value)}} required type="number" placeholder="Điền Số Lượng!"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><span style={{color: "red"}}>*</span> Đơn giá</Form.Label>
                        <NumericFormat style={{width:"100%",padding: "0.375rem 0.75rem",borderRadius:"5px",border:"1px solid #dee2e6",outline:"none",fontSize:"16px"}} placeholder={"Điền Giá Bán!"} thousandSeparator={true} suffix={"VNĐ"} onValueChange={(e)=>{setSell_Price(e.value)}} />
                    </Form.Group>
                </Col>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                <Button variant="primary" onClick={handleUpdate}>Cập nhật</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default memo(ModalEditProduct)