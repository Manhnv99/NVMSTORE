import "./css/Base.css"
import {Button, Card, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import CategoryAPI from "../../../services/CategoryAPI/CategoryAPI";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategory, setListCategory} from "../../../../redux/slices/CategorySlice";
import Loading from "../../loading/Loading";
import categoryAPI from "../../../services/CategoryAPI/CategoryAPI";
import {toastMessage} from "../../../../redux/slices/ToastMsgSlice";
import moment from "moment";
import Paging from "../../../utils/Paging";


const Category=()=>{
    const [name,setName]=useState('');
    const [status,setStatus]=useState('true');
    const [error,setError]=useState(undefined);
    const [totalPage,setTotalPage]=useState(undefined);
    const [touchName,setTouchName]=useState(false);
    const dispatch=useDispatch();
    // redux
    const listCategory=useSelector(state => state.category.listCategory);
    const isLoading=useSelector(state => state.category.isLoading);
    const [loading,setLoading]=useState(false);
    const [input,setInput]=useState('')
    const [whatAction,setWhatAction]=useState("normal");
    const [addOrUpdate,setAddOrUpdate]=useState(true);
    const [idUpdate,setIdUpdate]=useState(undefined);
    //set showModal
    const [show, setShow] = useState(false);
    const toastSuccess=useSelector(state => state.toastmsg.toastSuccess);


    useEffect(()=>{
        getTotalPage();
        dispatch(getAllCategory(1));
    },[])

    const getTotalPage= async ()=>{
        const res= await categoryAPI.getAllTotalPage();
        setTotalPage(res.data);
    }

    const handleSearch= async ()=>{
        try {
            const response=await categoryAPI.searchCategory(input,status,1);
            dispatch(setListCategory(response.data));
            const totalPage=await categoryAPI.getTotalPageSearch(input,status);
            setTotalPage(totalPage.data);
            setWhatAction("search");
        }catch (e){
            console.log(e);
        }
    }

    const handleAPISearchPaging= async (page)=>{
        setLoading(true);
        try {
            const response=await categoryAPI.searchCategory(input,status,page);
            dispatch(setListCategory(response.data));
            setLoading(false);
        }catch (e) {
            setLoading(false);
            console.log(e)
        }
    }

    const handleAPIPaging=(page)=>{
        dispatch(getAllCategory(page))
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
                const response = await CategoryAPI.addCategory(categoryRequest)
                if(response && response.status===201){
                    dispatch(getAllCategory(1));
                    getTotalPage();
                    handleClose();
                    setLoading(false)
                    const toastMsg={...toastSuccess};
                    toastMsg.message="Thêm thể loại thành công!";
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
                const response=await categoryAPI.updateCategory(idUpdate,categoryRequest);
                if(response && response.status===200){
                    dispatch(getAllCategory(1));
                    handleClose();
                    setLoading(false)
                    const toastMsg={...toastSuccess};
                    toastMsg.message="Cập nhật thể loại thành công!";
                    dispatch(toastMessage(toastMsg));
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
            const res= await categoryAPI.getById(id)
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
                    <span>Quản Lý Thể Loại</span>
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
                                        <option value="true">Đang sử dụng</option>
                                        <option value="false">Ngưng sử dụng</option>
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
                            <span>Danh sách thể loại</span>
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
                                    <th style={{width:"30%",textAlign:"center"}}>Tên Thể Loại</th>
                                    <th style={{width:"20%",textAlign:"center"}}>Ngày Cập Nhật</th>
                                    <th style={{width:"20%",textAlign:"center"}}>Trạng Thái</th>
                                    <th style={{width:"20%",textAlign:"center"}}>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listCategory.map((item,index)=>{
                                    return(
                                        <>
                                            <tr key={index} style={{fontSize: "15px"}}>
                                                <td style={{textAlign: "center"}}>{index+1}</td>
                                                <td style={{textAlign: "center"}}>{item.name}</td>
                                                <td style={{textAlign: "center"}}>
                                                    {moment(item.updated_at).format("YYYY-MM-DD hh:mm:ss")}
                                                </td>
                                                <td style={{textAlign: "center", justifyContent: "center", color: "#fff", borderRadius: "5px"}}>
                                                    <span style={{backgroundColor: "#68ae6b", padding: "7px 20px", borderRadius: "5px"}}>{item.status ? "Đang sử dụng" : "Ngưng sử dụng"}</span>
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
                        {addOrUpdate===true ? 'Thêm thể loại' : "Cập nhật thể loại"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col sm={12}>
                        <Form.Group>
                            <Form.Label><span style={{color: "red"}}>*</span> Tên thể loại</Form.Label>
                            <Form.Control value={name} onChange={onChangeName} required isInvalid={touchName && name==='' || error !== undefined} isValid={name!==''} type="text" placeholder="Điền tên thể loại!"/>
                            <Form.Control.Feedback type={"invalid"}>
                                {error !== undefined ? error : "Tên Thể Loại Không Được Để Trống!"}
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
                        {addOrUpdate ? "Thêm" : "Cập nhật"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Category