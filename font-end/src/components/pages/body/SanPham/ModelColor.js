import "./style/SizeAndColor.css"
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {memo, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Loading from "../../loading/Loading";
import sizeAPI from "../../../services/SizeAPI/SizeAPI";
import SizeAPI from "../../../services/SizeAPI/SizeAPI";
import {toastMessage} from "../../../../redux/slices/ToastMsgSlice";
import colorAPI from "../../../services/ColorAPI/ColorAPI";
import ColorAPI from "../../../services/ColorAPI/ColorAPI";


const ModalColor=(props)=>{
    //state
    const [code,setCode]=useState('')
    const [name,setName]=useState('')
    const [status,setStatus]=useState('')
    const [listColor,setListColor]=useState([])
    //
    const [addOrChoose,setAddOrChoose]=useState(true)
    // touch
    const [touchName,setTouchName]=useState(false)
    const [touchCode,setTouchCode]=useState(false)
    // dispatch
    const dispatch=useDispatch();
    // loading
    const [loading,setLoading]=useState(false)
    // settingModal
    const [show, setShow] = useState(true);
    // error
    const [error,setError]=useState({
        code:undefined,
        name:undefined
    })
    const [listColorChoosed,setListColorChoosed]=useState([])


    useEffect(() => {
        getAllColor();
    }, []);


    const handleClose = () =>{
        setShow(false);
        setTimeout(()=>{
            props.setOpenModalColor(false);
        },200)
    }


    const getAllColor=async ()=> {
        const res=await colorAPI.getAll();
        setListColor(res.data)
    }

    //onChange
    const onChangeCode=(e)=>{
        setCode(e.target.value)
        const errorCopy={...error}
        errorCopy.code=undefined
        setError(errorCopy)
        if(!touchCode){
            setTouchCode(true)
        }
    }

    const onChangeName=(e)=>{
        setName(e.target.value)
        const errorCopy={...error}
        errorCopy.name=undefined
        setError(errorCopy)
        if(!touchName){
            setTouchName(true)
        }
    }

    const handleAdd= async ()=>{
        if(addOrChoose){
            props.handleSetListColor(listColorChoosed)
            handleClose();
        }else{
            setLoading(true)
            const colorRequest={
                code:code,
                name:name,
                status:status
            }
            try {
                const response = await ColorAPI.addColor(colorRequest)
                if(response && response.status===201){
                    getAllColor();
                    setLoading(false);
                    handleAddOrChoose();
                    dispatch(toastMessage("Thêm màu sắc thành công!"));
                }
            }catch (e) {
                setLoading(false)
                const errorCopy={...error}
                errorCopy.code=e.response.data.code
                errorCopy.name=e.response.data.name
                setError(errorCopy)
            }
        }
    }

    const handleAddOrChoose=()=>{
        if(addOrChoose){
            //add
            setAddOrChoose(false)
            document.querySelector('.chooseSizeOrColor').style.display='none'
            document.querySelector('.addSizeOrColor').style.display='block'
            setCode('')
            setName('')
            setStatus("true")
            setTouchName(false)
            setTouchCode(false)
            setError({
                code:undefined,
                name:undefined
            })
            document.querySelector('.modal-status')[0].selected=true
        }else{
            //choose
            setAddOrChoose(true)
            document.querySelector('.chooseSizeOrColor').style.display='block'
            document.querySelector('.addSizeOrColor').style.display='none'
        }
    }

    const handleChooseColor=(e,name)=>{
        const codeColor=e.target.textContent
        e.target.classList.toggle('activeChooseColor')
        //filter code from listColor to push it into storeCode -> storeCode have only code so that it can compare with orther because listColorChoosed have code and name -> it cant compare
        const storeCode=[]
        listColorChoosed.forEach(item=>{
            storeCode.push(item.code)
        })
        let hasColor=storeCode.includes(codeColor)
        if(!hasColor){
            setListColorChoosed([{code:codeColor,name:name},...listColorChoosed])
        }else{
            //filter these has size.code===codeColor
            setListColorChoosed(listColorChoosed.filter(size=>size.code!==codeColor))
        }
    }

    return(
        <>
            {loading && <Loading/>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {addOrChoose ? 'Chọn màu sắc' : 'Thêm màu sắc'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm={12}>
                        <div style={{display:"flex",justifyContent:"end"}}>
                            <Button onClick={handleAddOrChoose} variant="outline-info">
                                <i className="fa-solid fa-plus"></i>
                                {addOrChoose ? 'Chọn màu sắc' : 'Thêm màu sắc'}
                            </Button>
                        </div>
                    </Col>
                    {/*Choose*/}
                    <Col sm={12} className="chooseSizeOrColor">
                        <Row>
                            {listColor.map((item,index)=>{
                                return(
                                    <Col sm={3} style={{margin:"0 0 15px 0"}}>
                                        <span key={index} onClick={(e)=>{handleChooseColor(e,item.name)}} style={{backgroundColor:item.code}} className={"nameColor"}>{item.code}</span>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Col>
                    {/*Add*/}
                    <Col sm={12} className="addSizeOrColor">
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Mã màu sắc</Form.Label>
                            <Form.Control value={code} onChange={onChangeCode} required isInvalid={touchCode && code==='' || error.code !== undefined} isValid={code!==''} type="text" placeholder="Điền mã màu sắc!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.code !== undefined ? error.code : "Mã Màu Sắc Không Được Để Trống!"}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>Tên màu sắc</Form.Label>
                            <Form.Control value={name} onChange={onChangeName} required isInvalid={touchName && name==='' || error.name !== undefined} isValid={name!==''} type="text" placeholder="Điền tên màu sắc!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error.name !== undefined ? error.name : "Tên Màu Sắc Không Được Để Trống!"}
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

export default memo(ModalColor)