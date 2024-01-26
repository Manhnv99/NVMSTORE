import "./style/SizeAndColor.css"
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {memo, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Loading from "../../loading/Loading";
import sizeAPI from "../../../services/SizeAPI/SizeAPI";
import SizeAPI from "../../../services/SizeAPI/SizeAPI";
import {toastMessage} from "../../../../redux/slices/ToastMsgSlice";


const ModalSize=(props)=>{
    //state
    const [name,setName]=useState('')
    const [status,setStatus]=useState('')
    const [listSize,setListSize]=useState([])
    //
    const [addOrChoose,setAddOrChoose]=useState(true)
    // touch
    const [touchName,setTouchName]=useState(false)
    // dispatch
    const dispatch=useDispatch();
    // loading
    const [loading,setLoading]=useState(false)
    // settingModal
    const [show, setShow] = useState(true);
    // error
    const [error,setError]=useState(undefined)


    useEffect(() => {
        getAllSize();
    }, []);


    const handleClose = () =>{
        setShow(false);
        setTimeout(()=>{
            props.setOpenModalSize(false);
        },200)
    }


    const getAllSize=async ()=> {
        const res=await sizeAPI.getAll();
        setListSize(res.data)
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
        if(addOrChoose){
            console.log('choose')
        }else{
            setLoading(true)
            const sizeRequest={
                name:name,
                status:status
            }
            try {
                const response = await SizeAPI.addSize(sizeRequest)
                if(response && response.status===201){
                    getAllSize();
                    setLoading(false);
                    handleAddOrChoose();
                    dispatch(toastMessage("Thêm kích thước thành công!"));
                }
            }catch (e) {
                setLoading(false)
                setError(e.response.data.name)
            }
        }
    }

    const handleAddOrChoose=()=>{
        if(addOrChoose){
            //add
            setAddOrChoose(false)
            document.querySelector('.chooseSizeOrColor').style.display='none'
            document.querySelector('.addSizeOrColor').style.display='block'
            setName('')
            setStatus("true")
            setTouchName(false)
            setError(undefined)
            document.querySelector('.modal-status')[0].selected=true
        }else{
            //choose
            setAddOrChoose(true)
            document.querySelector('.chooseSizeOrColor').style.display='block'
            document.querySelector('.addSizeOrColor').style.display='none'
        }
    }

    return(
        <>
            {loading && <Loading/>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {addOrChoose ? 'Chọn kích cỡ' : 'Thêm kích cỡ'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm={12}>
                        <div style={{display:"flex",justifyContent:"end"}}>
                            <Button onClick={handleAddOrChoose} variant="outline-info">
                                <i className="fa-solid fa-plus"></i>
                                {addOrChoose ? 'Thêm kích cỡ' : 'Chọn kích cỡ'}
                            </Button>
                        </div>
                    </Col>
                    {/*Choose*/}
                    <Col sm={12} className="chooseSizeOrColor">
                        <Row>
                            {listSize.map((item)=>{
                                return(
                                    <Col sm={3} style={{margin:"0 0 15px 0"}}>
                                        <span className={"nameSize"}>{item.name}</span>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                    {/*Add*/}
                    <Col sm={12} className="addSizeOrColor">
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
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        {addOrChoose ? 'Chọn' : 'Thêm'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(ModalSize)