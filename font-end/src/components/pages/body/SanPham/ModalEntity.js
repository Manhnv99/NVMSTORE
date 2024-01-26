import {Button, Col, Form, Modal} from "react-bootstrap";
import {memo, useState} from "react";
import {useDispatch} from "react-redux";
import BrandAPI from "../../../services/BrandAPI/BrandAPI";
import {getAllBrand, setListBrand} from "../../../../redux/slices/BrandSlice";
import {toastMessage} from "../../../../redux/slices/ToastMsgSlice";
import Loading from "../../loading/Loading";
import brandAPI from "../../../services/BrandAPI/BrandAPI";
import categoryAPI from "../../../services/CategoryAPI/CategoryAPI";
import {setListCategory} from "../../../../redux/slices/CategorySlice";
import soleAPI from "../../../services/SoleAPI/SoleAPI";
import {setListSole} from "../../../../redux/slices/SoleSlice";
import materialAPI from "../../../services/MaterialAPI/MaterialAPI";
import {setListMaterial} from "../../../../redux/slices/MaterialSlice";
import genderAPI from "../../../services/GenderAPI/GenderAPI";
import {getAllGender} from "../../../../redux/slices/GenderSlice";
import statusProductDetailAPI from "../../../services/StatusProductDetailAPI/StatusProductDetailAPI";
import {getAllStatusProductDetail} from "../../../../redux/slices/StatusProductDetailSlice";


const ModalEntity=(props)=>{
    //state
    const [name,setName]=useState('')
    const [status,setStatus]=useState('')
    // touch
    const [touchName,setTouchName]=useState(false)
    // dispatch
    const dispatch=useDispatch();
    // loading
    const [loading,setLoading]=useState(false)
    // settingModal
    const [show, setShow] = useState(true);
    const handleClose = () =>{
        setShow(false);
        setTimeout(()=>{
            props.setOpenModalEntity(false);
        },200)
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

    const handleAdd= async ()=>{
        //add brand
        if(props.whatEntity==='brand'){
            setLoading(true)
            const brandRequest={
                name:name,
                status:status
            }
            try {
                const response = await BrandAPI.addBrand(brandRequest)
                if(response && response.status===201){
                    getAllBrand();
                    setLoading(false)
                    handleClose();
                    dispatch(toastMessage("Thêm thương hiệu thành công!"))
                }
            }catch (e) {
                setLoading(false)
                setError(e.response.data.name)
            }
        }
        //add category
        if(props.whatEntity==='category'){
            setLoading(true)
            const categoryRequest={
                name:name,
                status:status
            }
            try {
                const response = await categoryAPI.addCategory(categoryRequest)
                if(response && response.status===201){
                    getAllCategory();
                    setLoading(false)
                    handleClose();
                    dispatch(toastMessage("Thêm thể loại thành công!"))
                }
            }catch (e) {
                setLoading(false)
                setError(e.response.data.name)
            }
        }
        //add sole
        if(props.whatEntity==='sole'){
            setLoading(true)
            const soleRequest={
                name:name,
                status:status
            }
            try {
                const response = await soleAPI.addSole(soleRequest)
                if(response && response.status===201){
                    getAllSole();
                    setLoading(false)
                    handleClose();
                    dispatch(toastMessage("Thêm đế giày thành công!"))
                }
            }catch (e) {
                setLoading(false)
                setError(e.response.data.name)
            }
        }
        //add material
        if(props.whatEntity==='material'){
            setLoading(true)
            const materialRequest={
                name:name,
                status:status
            }
            try {
                const response = await materialAPI.addMaterial(materialRequest)
                if(response && response.status===201){
                    getAllMaterial();
                    setLoading(false)
                    handleClose();
                    dispatch(toastMessage("Thêm chất liệu thành công!"))
                }
            }catch (e) {
                setLoading(false)
                setError(e.response.data.name)
            }
        }
        //add gender
        if(props.whatEntity==='gender'){
            setLoading(true)
            const genderRequest={
                name:name,
                status:status
            }
            try {
                const response = await genderAPI.addGender(genderRequest)
                if(response && response.status===201){
                    dispatch(getAllGender())
                    setLoading(false)
                    handleClose();
                    dispatch(toastMessage("Thêm giới tính thành công!"))
                }
            }catch (e) {
                setLoading(false)
                setError(e.response.data.name)
            }
        }
        //add status product detail
        if(props.whatEntity==='status_product_detail'){
            setLoading(true)
            const statusProductDetailRequest={
                name:name,
                status:status
            }
            try {
                const response = await statusProductDetailAPI.addStatusProductDetail(statusProductDetailRequest)
                if(response && response.status===201){
                    dispatch(getAllStatusProductDetail())
                    setLoading(false)
                    handleClose();
                    dispatch(toastMessage("Thêm trạng thái thành công!"))
                }
            }catch (e) {
                setLoading(false)
                setError(e.response.data.name)
            }
        }
    }

    const getAllBrand= async ()=>{
        const res=await brandAPI.getAll();
        if(res && res.status===200){
            dispatch(setListBrand(res.data))
        }
    }
    const getAllCategory= async ()=>{
        const res=await categoryAPI.getAll();
        if(res && res.status===200){
            dispatch(setListCategory(res.data))
        }
    }
    const getAllSole= async ()=>{
        const res=await soleAPI.getAll();
        if(res && res.status===200){
            dispatch(setListSole(res.data))
        }
    }
    const getAllMaterial= async ()=>{
        const res=await materialAPI.getAll();
        if(res && res.status===200){
            dispatch(setListMaterial(res.data))
        }
    }


    return(
        <>
            {loading && <Loading/>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.whatEntity==='brand' ? 'Thêm thương hiệu' : props.whatEntity==='category' ? 'Thêm thể loại' :
                            props.whatEntity==='sole' ? 'Thêm đế giày' : props.whatEntity==='material' ? 'Thêm chất liệu' :
                                props.whatEntity==='gender' ? 'Thêm giới tính' : props.whatEntity==='status_product_detail' ? 'Thêm trạng thái' :''}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm={12}>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span>
                                {props.whatEntity==='brand' ? 'Thêm thương hiệu' : props.whatEntity==='category' ? 'Thêm thể loại' :
                                    props.whatEntity==='sole' ? 'Thêm đế giày' : props.whatEntity==='material' ? 'Thêm chất liệu' :
                                        props.whatEntity==='gender' ? 'Thêm giới tính' : props.whatEntity==='status_product_detail' ? 'Thêm trạng thái' :''}
                            </Form.Label>
                            <Form.Control value={name} onChange={onChangeName} required isInvalid={touchName && name==='' || error !== undefined} isValid={name!==''} type="text" placeholder="Điền tên!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error !== undefined ? error : "Tên Không Được Để Trống!"}
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