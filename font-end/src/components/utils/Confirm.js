import "./style/Confirm.css"
import {Col, Modal} from "react-bootstrap";
import {memo, useState} from "react";


const Confirm=(props)=>{

    const [show,setShow]=useState(true);
    const handleClose=()=>{
        setShow(false);
        props.setOpenConfirm(false);
    }

    const handleConfirm=()=>{
        if(props.whatActionConfirm==="updateProductDetail"){
            props.handleUpdateProductDetail();
        }else if(props.whatActionConfirm==="deleteImageProductDetail"){
            props.handleRemoveImageProductDetail();
        }
        handleClose();
    }

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Col sm={12}>
                        <div className="conf_header">
                            <i className="fa-solid fa-exclamation"></i>
                            <span>Xác nhận</span>
                        </div>
                        <div className="conf_message">
                            <span>{props.message}</span>
                        </div>
                        <div className="conf_function">
                            <button onClick={handleClose} className="conf-close">Hủy</button>
                            <button onClick={handleConfirm} className="conf-agree">Xác Nhận</button>
                        </div>
                    </Col>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default memo(Confirm)