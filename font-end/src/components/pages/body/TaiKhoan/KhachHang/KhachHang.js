import "./style/KhachHang.css"
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import Paging from "../../../../utils/Paging";
import CustomerAPI from "../../../../services/CustomerAPI/CustomerAPI";
import Loading from "../../../loading/Loading";
import AddKhachHang from "./modal/AddKhachHang";
import UpdateKhachHang from "./modal/UpdateKhachHang";
import DetailKhachHang from "./modal/DetailKhachHang";
import CustomerAddress from "./modal/CustomerAddress";

const KhachHang=()=>{
    //modal
    const [openPostModal,setOpenPostModal] = useState(false);
    const [openPutModal,setOpenPutModal] = useState(false);
    const [openDetailModal,setOpenDetailModal] = useState(false);
    const [openCustomerAddressModal,setOpenCustomerAddressModal] = useState(false);
    //search
    const [inputSearch,setInputSearch] = useState("");
    //state List
    const [listCustomer,setListCustomer] = useState([]);
    //page
    const [totalPage,setTotalPage] = useState(undefined);
    const [whatAction,setWhatAction] = useState("normal");
    //isLoading
    const [loading,setLoading] = useState(false);
    const [customer_id,setCustomer_Id] = useState(undefined);


    useEffect(() => {
        CallListCustomer();
        CallGetToTalPage();
    }, []);

    const CallListCustomer = async () =>{
        setLoading(true)
        try {
            const response = await CustomerAPI.listCustomerPaging(1);
            if(response && response.status === 200){
                setListCustomer(response.data);
                setLoading(false)
            }
        }catch (e){
            setLoading(false)
            console.log(e);
        }
    }

    const CallGetToTalPage = async ()=>{
        try {
            const response= await CustomerAPI.totalPageListCustomerPaging();
            if(response && response.status === 200){
                setTotalPage(response.data);
            }
        }catch (e) {
            console.log(e);
        }
    }

    const CallGetToTalPageSearch = async (inputSearch) =>{
        try {
            const response= await CustomerAPI.totalPageSearchListCustomerPaging(inputSearch);
            if(response && response.status === 200){
                setTotalPage(response.data);
            }
        }catch (e) {
            console.log(e);
        }
    }

    //handle function

    const handleMovePaging = async (page) =>{
        try {
            const response = await CustomerAPI.listCustomerPaging(page);
            if(response && response.status === 200){
                setListCustomer(response.data);
            }
        }catch (e){
            console.log(e);
        }
    }

    const handleMoveSearchPaging= async (page)=>{
        try {
            const response = await CustomerAPI.listSearchCustomerPaging(inputSearch,page);
            if(response && response.status === 200){
                setListCustomer(response.data);
            }
        }catch (e){
            console.log(e);
        }
    }

    const handleOpenPutModal=(customer_id)=>{
        setCustomer_Id(customer_id);
        setOpenPutModal(true);
    }

    const handleOpenDetailModal=(customer_id) =>{
        setCustomer_Id(customer_id);
        setOpenDetailModal(true);
    }

    const handleOpenCustomerAddressModal = (customer_id)=>{
        setCustomer_Id(customer_id);
        setOpenCustomerAddressModal(true);
    }

    //onChange
    const onSearchCustomer= async (e)=>{
        setInputSearch(e.target.value);
        setWhatAction("search");
        CallGetToTalPageSearch(e.target.value);
        try {
            const response = await CustomerAPI.listSearchCustomerPaging(e.target.value,1);
            if(response && response.status === 200){
                setListCustomer(response.data);
            }
        }catch (e){
            console.log(e);
        }
    }




    return(
        <>
            {openCustomerAddressModal && <CustomerAddress setOpenCustomerAddressModal={setOpenCustomerAddressModal} customer_id={customer_id}/>}
            {openDetailModal && <DetailKhachHang setOpenDetailModal={setOpenDetailModal} customer_id={customer_id}/>}
            {openPutModal && <UpdateKhachHang setOpenPutModal={setOpenPutModal} customer_id={customer_id} CallListCustomer={CallListCustomer}/>}
            {openPostModal && <AddKhachHang setOpenPostModal={setOpenPostModal} CallListCustomer={CallListCustomer} CallGetToTalPage={CallGetToTalPage}/>}
            {loading && <Loading/>}
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
                            <Col lg={12}>
                                <Form.Group>
                                    <Form.Label>Tìm kiếm</Form.Label>
                                    <Form.Control value={inputSearch} onChange={onSearchCustomer} placeholder="Tìm kiếm tên và sđt..." type="text"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} style={{textAlign:"center",marginTop:"50px"}}>
                                <button onClick={()=>{setInputSearch("")}} className="handleClear">Làm mới bộ lọc</button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="staff-body">
                    <div className="staff-body-title">
                        <div className={"staff-body-title-left"}>
                            <i className="fa-solid fa-list"></i>
                            <span>Danh sách khách hàng</span>
                        </div>
                        <div className={"staff-body-title-right"}>
                            <Button onClick={()=>{setOpenPostModal(true)}}>
                                <i className="fa-solid fa-plus"></i>
                                <span style={{marginLeft: "5px"}}>Thêm Khách Hàng</span>
                            </Button>
                        </div>
                    </div>
                    <Card style={{marginTop:"30px"}}>
                        <Card.Body style={{padding:"0"}}>
                            <Table style={{marginBottom:"0"}}>
                                <thead>
                                <tr style={{fontSize: "13px", fontWeight: "600"}}>
                                    <th style={{width: "5%", textAlign: "center"}}>STT</th>
                                    <th style={{width: "20%", textAlign: "center"}}>Tên Khách Hàng</th>
                                    <th style={{width: "15%", textAlign: "center"}}>Số điện thoại</th>
                                    <th style={{width: "20%", textAlign: "center"}}>Email</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Điểm</th>
                                    <th style={{width: "15%", textAlign: "center"}}>Trạng thái</th>
                                    <th style={{width: "15%", textAlign: "center"}}>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listCustomer.map((item,index)=>{
                                    return (
                                        <tr style={{fontSize: "15px"}}>
                                            <td style={{textAlign: "center"}}>{index+1}</td>
                                            <td style={{textAlign: "center"}}>{item.name}</td>
                                            <td style={{textAlign: "center"}}>{item.phone}</td>
                                            <td style={{textAlign: "center"}}>{item.email}</td>
                                            <td style={{textAlign: "center"}}>{item.point}</td>
                                            <td style={{textAlign: "center"}}>
                                                <span style={{backgroundColor: "#68ae6b", display:"block",color:"white",padding:"6px 0", borderRadius: "5px"
                                                }}>{item.status ? "Kích hoạt" : "Ngưng kích hoạt"}</span>
                                            </td>
                                            <td style={{textAlign: "center"}}>
                                                <i onClick={() => {handleOpenDetailModal(item.id)}} className="fa-regular fa-eye actionDetail"></i>
                                                <i onClick={() => {handleOpenPutModal(item.id)}} className="fa-regular fa-pen-to-square actionEdit"></i>
                                                <i onClick={() => {handleOpenCustomerAddressModal(item.id)}} className="fa-solid fa-list-check actionEdit" style={{backgroundColor:"#000000"}}></i>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor: "#fff"}}>
                            <Paging whatAction={whatAction} TotalPage={totalPage} APIPaging={handleMovePaging}
                                    APISearchPaging={handleMoveSearchPaging}/>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </>
    )
}

export default KhachHang