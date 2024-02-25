import "./Staff.css"
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllStaff, setListStaff} from "../../../../../redux/slices/StaffSlice";
import staffAPI from "../../../../services/StaffAPI/StaffAPI";
import Loading from "../../../loading/Loading";
import Paging from "../../../../utils/Paging";


const Staff=()=>{
    const dispatch=useDispatch();
    const [totalPage,setTotalPage]=useState(undefined);
    const nav=useNavigate();
    const [input,setInput]=useState('');
    const [status,setStatus]=useState('');
    const [whatAction,setWhatAction]=useState("normal");
    //loading
    const isLoading=useSelector(state => state.staff.isLoading);
    const [loading,setLoading]=useState(false);
    const listStaff=useSelector((state)=>state.staff.listStaff);


    useEffect(() => {
        getTotalPage();
        dispatch(getAllStaff(1));
    }, []);

    const getTotalPage= async ()=>{
        const res= await staffAPI.getTotalPage();
        setTotalPage(res.data);
    }


    const handleSearch= async ()=>{
        try {
            const response=await staffAPI.searchStaff(input,status,1);
            dispatch(setListStaff(response.data));
            const totalPage=await staffAPI.getTotalPageSearch(input,status);
            setTotalPage(totalPage.data);
            setWhatAction("search");
        }catch (e){
            console.log(e)
        }
    }

    const handleAPISearchPaging= async (page)=>{
        setLoading(true);
        try {
            const response=await staffAPI.searchStaff(input,status,page);
            dispatch(setListStaff(response.data));
            setLoading(false);
        }catch (e) {
            setLoading(false);
            console.log(e)
        }
    }

    const handleAPIPaging=(page)=>{
        dispatch(getAllStaff(page));
    }



    const handleClearText=()=>{
        setInput('')
        setStatus("")
        const statusDOC=document.querySelector('.statusDOC option')
        statusDOC.selected=true
    }

    return(
        <>
            {loading || isLoading && <Loading/>}
            <Container>
                <div className="staff-header">
                    <i className="fa-solid fa-box-open"></i>
                    <span>Quản Lý Tài Khoản Nhân Viên</span>
                </div>
                <div className="staff-filter">
                    <div className="title-filter">
                        <i className="fa-solid fa-filter"></i>
                        <span>Bộ lọc</span>
                    </div>
                    <div className="filter-body">
                        <Row>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Tìm kiếm</Form.Label>
                                    <Form.Control value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Tìm kiếm tên và sđt..." type="text"/>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Trạng Thái</Form.Label>
                                    <Form.Select className={"statusDOC"} onChange={(e)=>{setStatus(e.target.value)}}>
                                        <option value="">Tất cả</option>
                                        <option value="true">Đang làm</option>
                                        <option value="false">Nghỉ làm</option>
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
                <div className="staff-body">
                    <div className="staff-body-title">
                        <div className={"staff-body-title-left"}>
                            <i className="fa-solid fa-list"></i>
                            <span>Danh sách nhân viên</span>
                        </div>
                        <div className={"staff-body-title-right"}>
                            <Button onClick={()=>{nav("/add-staff-management")}}>
                                <i className="fa-solid fa-plus"></i>
                                <span style={{marginLeft: "5px"}}>Thêm Nhân Viên</span>
                            </Button>
                        </div>
                    </div>
                    <Card style={{marginTop:"30px"}}>
                        <Card.Body style={{padding:"0"}}>
                            <Table style={{marginBottom:"0"}}>
                                <thead>
                                <tr style={{fontSize:"13px",fontWeight:"600"}}>
                                    <th style={{width:"5%",textAlign:"center"}}>STT</th>
                                    <th style={{width:"15%",textAlign:"center"}}>Ảnh</th>
                                    <th style={{width:"15%",textAlign:"center"}}>Tên nhân viên</th>
                                    <th style={{width:"15%",textAlign:"center"}}>CCCD</th>
                                    <th style={{width:"10%",textAlign:"center"}}>Số điện thoại</th>
                                    <th style={{width:"10%",textAlign:"center"}}>Ngày sinh</th>
                                    <th style={{width:"10%",textAlign:"center"}}>Giới tính</th>
                                    <th style={{width:"10%",textAlign:"center"}}>Trạng thái</th>
                                    <th style={{width:"10%",textAlign:"center"}}>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listStaff.map((item,index)=>{
                                    return(
                                        <tr style={{fontSize:"15px"}}>
                                            <td style={{textAlign:"center"}}>{index+1}</td>
                                            <td style={{textAlign:"center"}}>
                                                <img src={item.image_url} style={{width:"100%",height:"100px",objectFit:"cover",borderRadius:"5px"}}/>
                                            </td>
                                            <td style={{textAlign:"center"}}>{item.name}</td>
                                            <td style={{textAlign:"center"}}>{item.cccd}</td>
                                            <td style={{textAlign:"center"}}>{item.phone}</td>
                                            <td style={{textAlign:"center"}}>{item.birthday}</td>
                                            <td style={{textAlign:"center"}}>{item.gender ? "Nam" : "Nữ"}</td>
                                            <td style={{textAlign:"center"}}>
                                                <span style={{backgroundColor:"#68ae6b",height:"40px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",borderRadius:"5px",cursor:"default"}}>
                                                    {item.status ? "Đang Làm" : "Tạm Ngưng"}
                                                </span>
                                            </td>
                                            <td style={{textAlign:"center"}}>
                                                <i onClick={()=>{nav(`/detail-staff-management/${item.id}`)}} className="fa-regular fa-eye actionDetail"></i>
                                                <i onClick={()=>{nav(`/update-staff-management/${item.id}`)}} className="fa-regular fa-pen-to-square actionEdit"></i>
                                            </td>
                                        </tr>
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
        </>
    )
}

export default Staff