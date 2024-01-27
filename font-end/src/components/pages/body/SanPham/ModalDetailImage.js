import {Button,Modal} from "react-bootstrap";
import {useState} from "react";


const ModalDetailImage=(props)=>{

    const [show,setShow]=useState(true)
    const handleClose=()=>{
        setShow(false)
        setTimeout(()=>{
            props.setOpenModalImageDetail(false)
        },200)
    }

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Hình Ảnh Chi Tiết</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img style={{width:"100%",height:"500px",objectFit:"contain"}} src={props.imageDetail} alt=""/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Hủy</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDetailImage