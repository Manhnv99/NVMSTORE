import "./css/Base.css"
import {Button, Card, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../loading/Loading";
import {getAllBrand, setListBrand} from "../../../../redux/slices/BrandSlice";
import brandAPI from "../../../services/BrandAPI/BrandAPI";
import BrandAPI from "../../../services/BrandAPI/BrandAPI";
import {toastMessage} from "../../../../redux/slices/ToastMsgSlice";
import moment from "moment";
import Paging from "../../../utils/Paging";


const Brand=()=>{
    const dispatch=useDispatch();
    const [name,setName]=useState('');
    const [status,setStatus]=useState('DANG_SU_DUNG');
    const [error,setError]=useState(undefined);
    const [totalPage,setTotalPage]=useState(undefined);
    const [touchName,setTouchName]=useState(false);
    const listBrand=useSelector(state => state.brand.listBrand);
    const isLoading=useSelector(state => state.brand.isLoading);
    const [loading,setLoading]=useState(false);
    const [input,setInput]=useState('')
    const [whatAction,setWhatAction]=useState("normal");
    const [addOrUpdate,setAddOrUpdate]=useState(true);
    const [idUpdate,setIdUpdate]=useState(undefined);
    //set showModal
    const [show, setShow] = useState(false);
    //toast Message
    const toastSuccess=useSelector(state => state.toastmsg.toastSuccess);


    useEffect(()=>{
        getTotalPage();
        dispatch(getAllBrand(1));
    },[])

    const getTotalPage= async ()=>{
        const res= await brandAPI.getAllTotalPage();
        setTotalPage(res.data);
    }

    const handleSearch= async ()=>{
        try {
            const response=await brandAPI.searchBrand(input,status,1);
            dispatch(setListBrand(response.data));
            const totalPage=await brandAPI.getTotalPageSearch(input,status);
            setTotalPage(totalPage.data);
            setWhatAction("search");
        }catch (e){
            console.log(e);
        }
    }

    const handleAPISearchPaging= async (page)=>{
        setLoading(true);
        try {
            const response=await brandAPI.searchBrand(input,status,page);
            dispatch(setListBrand(response.data));
            setLoading(false);
        }catch (e) {
            setLoading(false);
            console.log(e)
        }
    }

    const handleAPIPaging=(page)=>{
        dispatch(getAllBrand(page));
    }

    const handleClearText=()=>{
        setInput('')
        setStatus("")
        const statusDOC=document.querySelector('.statusDOC option')
        statusDOC.selected=true
    }

    const handleClose = () => {
        setShow(false)
        setTouchName(false)
        setError(undefined)
        setName('')
        setTimeout(()=>{
            setAddOrUpdate(true)
        },200)
    };
    const handleShow = () => setShow(true);


    const onChangeName=(e)=>{
        setName(e.target.value)
        setError(undefined)
        if(!touchName){
            setTouchName(true)
        }
    }
    const handleAdd= async ()=>{
        if(addOrUpdate){
            setLoading(true)
            const categoryRequest={
                name:name,
                status:status
            }
            try {
                const response = await BrandAPI.addBrand(categoryRequest)
                if(response && response.status===201){
                    dispatch(getAllBrand(1));
                    getTotalPage();
                    handleClose();
                    setLoading(false)
                    const toastMsg={...toastSuccess}
                    toastMsg.message="Thêm thương hiệu thành công!"
                    dispatch(toastMessage(toastMsg));
                }
            }catch (e) {
                setLoading(false)
                setError(e.response.data.name)
            }
        }else{
            setLoading(true)
            const categoryRequest={
                name:name,
                status:status
            }
            try{
                const response=await brandAPI.updateBrand(idUpdate,categoryRequest);
                if(response && response.status===200){
                    dispatch(getAllBrand(1));
                    handleClose();
                    setLoading(false)
                    const toastMsg={...toastSuccess}
                    toastMsg.message="Cập nhật thương hiệu thành công!"
                    dispatch(toastMessage(toastMsg))
                }
            }catch (e) {
                setLoading(false)
                setError(e.response.data.name)
            }
        }
    }

    const handleEdit= async (id)=>{
        handleShow();
        setIdUpdate(id)
        setAddOrUpdate(false)
        try {
            const res= await brandAPI.getById(id)
            if(res && res.status===200){
                setName(res.data.name)
                setStatus(res.data.status+"")
                const status=document.querySelectorAll('.modal-status option')
                if(res.data.status){
                    status[0].selected=true
                }else{
                    status[1].selected=true
                }
            }
        }catch (e) {
            setError(e.response.data.name)
        }
    }


    return(
        <>
            {(loading || isLoading) && <Loading/>}
            <Container>
                <div className="base-header">
                    <i className="fa-solid fa-box-open"></i>
                    <span>Quản Lý Thương Hiệu</span>
                </div>
                <div className="base-filter">
                    <div className="title-filter">
                        <i className="fa-solid fa-filter"></i>
                        <span>Bộ lọc</span>
                    </div>
                    <div className="filter-body">
                        <Row>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Tìm kiếm</Form.Label>
                                    <Form.Control value={input} onChange={(e)=>{setInput(e.target.value)}} type="text"/>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Trạng Thái</Form.Label>
                                    <Form.Select onChange={(e)=>{setStatus(e.target.value)}} className={"statusDOC"}>
                                        <option value="">Tất cả</option>
                                        <option value="DANG_SU_DUNG">Đang sử dụng</option>
                                        <option value="NGUNG_SU_DUNG">Ngưng sử dụng</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} style={{textAlign:"center",marginTop:"50px"}}>
                                <button onClick={handleSearch} className="handleFilter">Tìm kiếm</button>
                                <button onClick={handleClearText} className="handleClear">Làm mới bộ lọc</button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="base-body">
                    <div className="base-body-title">
                        <div className={"base-body-title-left"}>
                            <i className="fa-solid fa-list"></i>
                            <span>Danh sách thương hiệu</span>
                        </div>
                        <div className={"base-body-title-right"}>
                            <button onClick={handleShow} className={"btn btn-primary"}>
                                <i className="fa-solid fa-plus"></i>
                                <span style={{marginLeft: "5px"}}>Thêm thể loại</span>
                            </button>
                        </div>
                    </div>
                    <Card style={{marginTop: "30px"}}>
                        <Card.Body style={{padding:"0"}}>
                            <Table style={{marginBottom:"0"}}>
                                <thead>
                                <tr style={{fontSize:"13px",fontWeight:"600"}}>
                                    <th style={{width:"10%",textAlign:"center"}}>STT</th>
                                    <th style={{width:"30%",textAlign:"center"}}>Tên Thương Hiệu</th>
                                    <th style={{width:"20%",textAlign:"center"}}>Ngày Cập Nhật</th>
                                    <th style={{width:"20%",textAlign:"center"}}>Trạng Thái</th>
                                    <th style={{width:"20%",textAlign:"center"}}>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listBrand.map((item,index)=>{
                                    return(
                                        <>
                                            <tr key={index} style={{fontSize: "15px"}}>
                                                <td style={{textAlign: "center"}}>{index+1}</td>
                                                <td style={{textAlign: "center"}}>{item.name}</td>
                                                <td style={{textAlign: "center"}}>
                                                    {moment(item.updated_at).format("YYYY-MM-DD hh:mm:ss")}
                                                </td>
                                                <td style={{textAlign: "center", justifyContent: "center", color: "#fff", borderRadius: "5px"}}>
                                                    <span style={{backgroundColor: "#68ae6b", padding: "7px 20px", borderRadius: "5px"}}>{item.status === "DANG_SU_DUNG" ? "Đang sử dụng" : "Ngưng sử dụng"}</span>
                                                </td>
                                                <td style={{textAlign: "center"}}>
                                                    <i className="fa-regular fa-eye actionDetail"></i>
                                                    <i onClick={()=>{handleEdit(item.id)}} className="fa-regular fa-pen-to-square actionEdit"></i>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor: "#fff"}}>
                            <Paging TotalPage={totalPage} APIPaging={handleAPIPaging} APISearchPaging={handleAPISearchPaging} whatAction={whatAction}/>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
            {/*Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {addOrUpdate===true ? 'Thêm thương hiệu' : "Cập nhật thương hiệu"}
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
                                <option value="DANG_SU_DUNG">Đang sử dụng</option>
                                <option value="NGUNG_SU_DUNG">Không sử dụng</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleAdd}>
                        {addOrUpdate ? "Thêm" : "Cập nhật"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Brand