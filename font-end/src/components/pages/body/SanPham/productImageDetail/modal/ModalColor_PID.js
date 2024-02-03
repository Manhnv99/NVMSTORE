import "./style/SizeAndColor.css"
import {Button, Col, Form, Modal} from "react-bootstrap";
import {memo, useState} from "react";
import {useDispatch} from "react-redux";
import {toastMessage} from "../../../../../../redux/slices/ToastMsgSlice";
import Loading from "../../../../loading/Loading";
import {getAllColor} from "../../../../../../redux/slices/ColorSlice";
import ColorAPI from "../../../../../services/ColorAPI/ColorAPI";


const ModalColor_PID=(props)=>{
    //state
    const [code,setCode]=useState('');
    const [name,setName]=useState('');
    const [status,setStatus]=useState('');
    // touch
    const [touchCode,setTouchCode]=useState(false);
    const [touchName,setTouchName]=useState(false);
    // dispatch
    const dispatch=useDispatch();
    // loading
    const [loading,setLoading]=useState(false);
    // error
    const [errors,setErrors]=useState({
        code:undefined,
        name:undefined
    });
    //show
    const [show,setShow]=useState(true);


    const handleClose = () =>{
        setShow(false)
        setTimeout(()=>{
            props.setOpenModalColor(false);
        },200)
    }


    //onChange
    const onChangeCode=(e)=>{
        setCode(e.target.value)
        const errorCopy={...errors}
        errorCopy.code=undefined;
        setErrors(errorCopy)
        if(!touchCode){
            setTouchCode(true)
        }
    }

    const onChangeName=(e)=>{
        setName(e.target.value)
        const errorCopy={...errors}
        errorCopy.name=undefined;
        setErrors(errorCopy)
        if(!touchName){
            setTouchName(true)
        }
    }

    const handleAdd= async ()=>{
        //case add
        setLoading(true)
        const colorRequest={
            code:code,
            name:name,
            status:status
        }
        try {
            const response = await ColorAPI.addColor(colorRequest)
            if(response && response.status===201){
                setLoading(false);
                dispatch(getAllColor());
                dispatch(toastMessage("Thêm Màu Sắc thành công!"));
                handleClose();
            }
        }catch (e) {
            setLoading(false);
            const errorCopy={...errors};
            errorCopy.code=e.response.data.code;
            errorCopy.name=e.response.data.name;
            setErrors(errorCopy);
        }
    }


    return(
        <>
            {loading && <Loading/>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Thêm màu sắc
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*Add*/}
                    <Col sm={12}>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Điền mã màu sắc</Form.Label>
                            <Form.Control value={code} onChange={onChangeCode} required isInvalid={touchCode && code==='' || errors.code !== undefined} isValid={code!==''} type="text" placeholder="Điền mã màu sắc!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.code !== undefined ? errors.code : "Mã Màu Sắc Không Được Để Trống!"}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Điền tên màu sắc</Form.Label>
                            <Form.Control value={name} onChange={onChangeName} required isInvalid={touchName && name==='' || errors.name !== undefined} isValid={name!==''} type="text" placeholder="Điền tên màu sắc!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {errors.name !== undefined ? errors.name : "Tên Màu Sắc Không Được Để Trống!"}
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

export default memo(ModalColor_PID)