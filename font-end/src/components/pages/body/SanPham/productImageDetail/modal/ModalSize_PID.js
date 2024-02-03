import "./style/SizeAndColor.css"
import {Button, Col, Form, Modal} from "react-bootstrap";
import {memo, useState} from "react";
import {useDispatch} from "react-redux";
import SizeAPI from "../../../../../services/SizeAPI/SizeAPI";
import {toastMessage} from "../../../../../../redux/slices/ToastMsgSlice";
import Loading from "../../../../loading/Loading";
import {getAllSize, setListSize} from "../../../../../../redux/slices/SizeSlice";


const ModalSize_PID=(props)=>{
    //state
    const [name,setName]=useState('')
    const [status,setStatus]=useState('')
    // touch
    const [touchName,setTouchName]=useState(false)
    // dispatch
    const dispatch=useDispatch();
    // loading
    const [loading,setLoading]=useState(false)
    // error
    const [error,setError]=useState(undefined)
    //show
    const [show,setShow]=useState(true)


    const handleClose = () =>{
        setShow(false)
        setTimeout(()=>{
            props.setOpenModalSize(false);
        },200)
    }


    //onChange
    const onChangeName=(e)=>{
        setName(e.target.value)
        setError(undefined)
        if(!touchName){
            setTouchName(true)
        }
    }

    const handleAdd= async ()=>{
        //case add
        setLoading(true)
        const sizeRequest={
            name:name,
            status:status
        }
        try {
            const response = await SizeAPI.addSize(sizeRequest)
            if(response && response.status===201){
                setLoading(false);
                dispatch(getAllSize());
                dispatch(toastMessage("Thêm kích thước thành công!"));
                handleClose();
            }
        }catch (e) {
            setLoading(false)
            setError(e.response.data.name)
        }
    }


    return(
        <>
            {loading && <Loading/>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Thêm kích cỡ
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*Add*/}
                    <Col sm={12}>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Thêm kích cỡ</Form.Label>
                            <Form.Control value={name} onChange={onChangeName} required isInvalid={touchName && name==='' || error !== undefined} isValid={name!==''} type="number" placeholder="Điền tên kích cỡ!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error !== undefined ? error : "Tên Kích Cỡ Không Được Để Trống!"}
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
                    <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                    <Button variant="primary" onClick={handleAdd}>Thêm</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(ModalSize_PID)