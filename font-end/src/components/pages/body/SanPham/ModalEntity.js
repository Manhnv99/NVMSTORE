import {Button, Col, Form, Modal} from "react-bootstrap";
import {memo, useState} from "react";


const ModalEntity=(props)=>{
    //state
    const [name,setName]=useState('')
    const [status,setStatus]=useState('')
    // touch
    const [touchName,setTouchName]=useState(false)
    // settingModal
    const [show, setShow] = useState(true);
    const handleClose = () =>{
        props.setOpenModal(false);
        setShow(false);
    }


    const [error,setError]=useState(undefined)


    //onChange
    const onChangeName=(e)=>{
        setName(e.target.value)
        setError(undefined)
        if(!touchName){
            setTouchName(true)
        }
    }

    const handleAdd=()=>{

    }


    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Thêm
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm={12}>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span> Tên thương hiệu</Form.Label>
                            <Form.Control value={name} onChange={onChangeName} required isInvalid={touchName && name==='' || error !== undefined} isValid={name!==''} type="text" placeholder="Điền tên thương hiệu!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error !== undefined ? error : "Tên Thương Hiệu Không Được Để Trống!"}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Trạng thái</Form.Label>
                            <Form.Select className="modal-status" onChange={(e)=>{setStatus(e.target.value)}} required>
                                <option value="true">Đang sử dụng</option>
                                <option value="false">Không sử dụng</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(ModalEntity)