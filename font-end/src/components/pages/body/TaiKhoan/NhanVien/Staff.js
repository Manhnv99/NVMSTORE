import "./Staff.css"
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllStaff, setListStaff} from "../../../../../redux/slices/staffSlice";
import staffAPI from "../../../../services/StaffAPI/StaffAPI";


const Staff=()=>{
    const dispatch=useDispatch();
    const [totalPage,setTotalPage]=useState([]);
    const [currentPage,setCurrentPage]=useState(1)
    const nav=useNavigate()
    const [input,setInput]=useState('')
    const [status,setStatus]=useState('')
    const [searchOrNothing,setSearchOrNothing]=useState(false)

    const listStaff=useSelector((state)=>state.staff.listStaff)


    useEffect(() => {
        getTotalPage();
        dispatch(getAllStaff(1))
    }, []);

    const getTotalPage= async ()=>{
        const res= await staffAPI.getTotalPage()
        let mypage=[]
        for(let i=0;i<res.data;i++){
            mypage.push(i)
        }
        setTotalPage(mypage)
    }

    const handleMovePage=async(index)=>{
        if(searchOrNothing===true){
            const response=await staffAPI.searchStaff(input,status,index+1)
            dispatch(setListStaff(response.data))
            handleMoveAnimation(index)
        }else{
            handleMoveAnimation(index)
            dispatch(getAllStaff(index+1))
        }
    }
    const handleMoveAnimation=(index)=>{
        const page=document.querySelectorAll('.page')
        for(let i=0;i<page.length;i++){
            page[i].classList.remove('actionPage')
        }
        page[index].classList.add('actionPage')
    }

    const handleNextPage= async ()=>{
        if(searchOrNothing===true){
            if(currentPage===totalPage.length){
                const response=await staffAPI.searchStaff(input,status,1)
                dispatch(setListStaff(response.data))
                handleMoveAnimation(0)
                setCurrentPage(1)
            }else{
                const response=await staffAPI.searchStaff(input,status,currentPage+1)
                dispatch(setListStaff(response.data))
                handleMoveAnimation(currentPage)
                setCurrentPage(currentPage+1)
            }
        }else{
            if(currentPage===totalPage.length){
                dispatch(getAllStaff(1))
                handleMoveAnimation(0)
                setCurrentPage(1)
            }else{
                dispatch(getAllStaff(currentPage+1))
                handleMoveAnimation(currentPage)
                setCurrentPage(currentPage+1)
            }
        }

    }

    const handlePrePage= async ()=>{
        if(searchOrNothing===true){
            if(currentPage===1){
                const response=await staffAPI.searchStaff(input,status,totalPage.length)
                dispatch(setListStaff(response.data))
                handleMoveAnimation(totalPage.length-1)
                setCurrentPage(totalPage.length)
            }else{
                const response=await staffAPI.searchStaff(input,status,currentPage-1)
                dispatch(setListStaff(response.data))
                handleMoveAnimation(currentPage-2)
                setCurrentPage(currentPage-1)
            }
        }else{
            if(currentPage===1){
                dispatch(getAllStaff(totalPage.length))
                handleMoveAnimation(totalPage.length-1)
                setCurrentPage(totalPage.length)
            }else{
                dispatch(getAllStaff(currentPage-1))
                handleMoveAnimation(currentPage-2)
                setCurrentPage(currentPage-1)
            }
        }
    }


    const handleSearch= async ()=>{
        try {
            const response=await staffAPI.searchStaff(input,status,1)
            dispatch(setListStaff(response.data))
            const totalPage=await staffAPI.getTotalPageSearch(input,status)
            let mypage=[]
            for(let i=0;i<totalPage.data;i++){
                mypage.push(i)
            }
            setTotalPage(mypage)
            setSearchOrNothing(true)
        }catch (e){
            console.log(e)
        }
    }

    const handleClearText=()=>{
        setInput('')
        setStatus("")
        const statusDOC=document.querySelector('.statusDOC option')
        statusDOC.selected=true
    }

    return(
        <>
            <button onClick={()=>{console.log(totalPage)}}>Click</button>
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
                            <Link to="/add-nhanvien-management">
                                <i className="fa-solid fa-plus"></i>
                                <span style={{marginLeft:"5px"}}>Thêm Nhân Viên</span>
                            </Link>
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
                                            <td style={{textAlign:"center",backgroundColor:"#68ae6b",height:"40px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",borderRadius:"5px"}}>{item.status ? "Đang Làm" : "Tạm Ngưng"}</td>
                                            <td style={{textAlign:"center"}}>
                                                <i onClick={()=>{nav(`/detail-nhanvien-management/${item.id}`)}} className="fa-regular fa-eye actionDetail"></i>
                                                <i onClick={()=>{nav(`/update-nhanvien-management/${item.id}`)}} className="fa-regular fa-pen-to-square actionEdit"></i>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor: "#fff"}}>
                            <div style={{display: "flex", justifyContent: "end", alignItems: "center"}}>
                                <i onClick={handlePrePage} style={{marginRight: "15px", cursor: "pointer",color:"#fa0307"}}
                                   className="fa-solid fa-angle-left"></i>
                                {totalPage.map((item,index)=>{
                                    if(index===0){
                                        return (
                                            <span onClick={()=>{handleMovePage(index)}} className={"actionPage page"} style={{cursor: "pointer", padding: "3px 10px", borderRadius: "5px", textAlign: "center", margin: "3px", color: "#fa0307"}}>{item + 1}</span>
                                        )
                                    }else{
                                        return (
                                            <span onClick={()=>{handleMovePage(index)}} className={"page"} style={{cursor: "pointer", padding: "3px 10px", borderRadius: "5px", textAlign: "center", margin: "3px", color: "#fa0307"}}>{item + 1}</span>
                                        )
                                    }
                                })}
                                <i onClick={handleNextPage} style={{marginLeft: "15px", cursor: "pointer", color: "#fa0307"}}
                                   className="fa-solid fa-angle-right"></i>
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </>
    )
}

export default Staff