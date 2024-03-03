import "./style/Voucher.css"
import {Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import Paging from "../../../../utils/Paging";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {getAllVoucherPaging, setListVoucher} from "../../../../../redux/slices/VoucherSlice";
import moment from "moment/moment";
import VoucherAPI from "../../../../services/VoucherAPI/VoucherAPI";
import Loading from "../../../loading/Loading";
import AddVoucher from "./AddVoucher";
import PutVoucher from "./PutVoucher";
import DetailVoucher from "./DetailVoucher";


const Voucher=()=>{

    //nav
    const nav= useNavigate();
    //dispatch
    const dispatch= useDispatch();
    //state store
    const listVoucher=useSelector(state => state.voucher.listVoucher);
    const isLoading=useSelector(state => state.voucher.isLoading);
    //state
    const [voucherObjectSearchRequest,setVoucherObjectSearchRequest] = useState({
        code:"",
        quantity:"",
        date_start:"",
        date_end:"",
        value:"",
        status:""
    });
    const [voucher_id,setVoucher_id] = useState(undefined);
    const [openAddModal,setOpenAddModal] = useState(false);
    const [openPutModal,setOpenPutModal] = useState(false);
    const [openDetailModal,setOpenDetailModal] = useState(false);
    //page
    const [totalPage,setTotalPage] = useState(undefined);
    const [whatAction,setWhatAction] = useState("normal");
    const [loading,setLoading] = useState(false);


    useEffect(() => {
        callAPIGetAllVoucherPaging();
        callAPIGetToTalPage();
        setTimeout(()=>{
            console.log(listVoucher);
        },[500])
    }, []);

    //Call API GetAll Voucher Paging at store
    const callAPIGetAllVoucherPaging= ()=>{
        dispatch(getAllVoucherPaging(1));
    }

    //Start page
    const callAPIGetToTalPage= async ()=>{
        try {
            const response= await VoucherAPI.getToTalPageVoucherAPI();
            if(response && response.status === 200){
                setTotalPage(response.data);
            }
        }catch (e) {
            console.log(e);
        }
    }

    const handleAPIPaging=(page)=>{
        dispatch(getAllVoucherPaging(page));
    }

    const handleAPISearchPaging= async (page)=>{
        setLoading(true);
        try {
            if(voucherObjectSearchRequest.date_start === "" && voucherObjectSearchRequest.date_end === ""){
                const response=await VoucherAPI.searchVoucherPagingAPI(page,voucherObjectSearchRequest.code,voucherObjectSearchRequest.quantity,
                    voucherObjectSearchRequest.value,voucherObjectSearchRequest.status,
                    null,null);
                if(response && response.status === 200){
                    console.log(response.data);
                    dispatch(setListVoucher(response.data));
                    setLoading(false);
                }
            }else if(voucherObjectSearchRequest.date_start !== "" && voucherObjectSearchRequest.date_end === ""){
                const response=await VoucherAPI.searchVoucherPagingAPI(page,voucherObjectSearchRequest.code,voucherObjectSearchRequest.quantity,
                    voucherObjectSearchRequest.value,voucherObjectSearchRequest.status,
                    voucherObjectSearchRequest.date_start,null);
                if(response && response.status === 200){
                    console.log(response.data);
                    dispatch(setListVoucher(response.data));
                    setLoading(false);
                }
            }else if(voucherObjectSearchRequest.date_start === "" && voucherObjectSearchRequest.date_end !== ""){
                const response=await VoucherAPI.searchVoucherPagingAPI(page,voucherObjectSearchRequest.code,voucherObjectSearchRequest.quantity,
                    voucherObjectSearchRequest.value,voucherObjectSearchRequest.status,
                    null,voucherObjectSearchRequest.date_end);
                if(response && response.status === 200){
                    console.log(response.data);
                    dispatch(setListVoucher(response.data));
                    setLoading(false);
                }
            }
        }catch (e) {
            setLoading(false);
            console.log(e)
        }
    }
    //End page

    const handleSearch= async ()=>{
        setLoading(true);
        try{
            if(voucherObjectSearchRequest.date_start === "" && voucherObjectSearchRequest.date_end === ""){
                const response=await VoucherAPI.searchVoucherPagingAPI(1,voucherObjectSearchRequest.code,voucherObjectSearchRequest.quantity,
                                                                                            voucherObjectSearchRequest.value,voucherObjectSearchRequest.status,
                                                                                            null,null);
                if(response && response.status === 200){
                    dispatch(setListVoucher(response.data));
                    setLoading(false);
                }
                const totalPage=await VoucherAPI.getToTalPageSearchVoucher(voucherObjectSearchRequest.code,voucherObjectSearchRequest.quantity,
                                                                                                voucherObjectSearchRequest.value,voucherObjectSearchRequest.status,
                                                                                                null,null);
                setTotalPage(totalPage.data);
                setWhatAction("search");
            }else if(voucherObjectSearchRequest.date_start !== "" && voucherObjectSearchRequest.date_end === ""){
                const response=await VoucherAPI.searchVoucherPagingAPI(1,voucherObjectSearchRequest.code,voucherObjectSearchRequest.quantity,
                                                                                            voucherObjectSearchRequest.value,voucherObjectSearchRequest.status,
                                                                                            voucherObjectSearchRequest.date_start,null);
                if(response && response.status === 200){
                    dispatch(setListVoucher(response.data));
                    setLoading(false);
                }
                const totalPage=await VoucherAPI.getToTalPageSearchVoucher(voucherObjectSearchRequest.code,voucherObjectSearchRequest.quantity,
                                                                                               voucherObjectSearchRequest.value,voucherObjectSearchRequest.status,
                                                                                               voucherObjectSearchRequest.date_start,null);
                setTotalPage(totalPage.data);
                setWhatAction("search");
            }else if(voucherObjectSearchRequest.date_start === "" && voucherObjectSearchRequest.date_end !== ""){
                const response=await VoucherAPI.searchVoucherPagingAPI(1,voucherObjectSearchRequest.code,voucherObjectSearchRequest.quantity,
                                                                                            voucherObjectSearchRequest.value,voucherObjectSearchRequest.status,
                                                                                            null,voucherObjectSearchRequest.date_end);
                if(response && response.status === 200){
                    dispatch(setListVoucher(response.data));
                    setLoading(false);
                }
                const totalPage=await VoucherAPI.getToTalPageSearchVoucher(voucherObjectSearchRequest.code,voucherObjectSearchRequest.quantity,
                                                                                                voucherObjectSearchRequest.value,voucherObjectSearchRequest.status,
                                                                                                null,voucherObjectSearchRequest.date_end);
                setTotalPage(totalPage.data);
                setWhatAction("search");
            }
        }catch (e){
            setLoading(false);
            console.log(e);
        }
    }

    const handleClearSearch=useCallback(()=>{
        const voucherObject={...voucherObjectSearchRequest};
        setVoucherObjectSearchRequest(voucherObject);
    },[])

    //handleOpen AddVoucher Modal
    const handleOpenAddVoucher=()=>{
        setOpenAddModal(true);
    }

    const handleOpenPutVoucher=(voucher_id)=>{
        setVoucher_id(voucher_id);
        setOpenPutModal(true);
    }

    const handleOpenDetailVoucher=(voucher_id)=>{
        setVoucher_id(voucher_id);
        setOpenDetailModal(true);
    }
    //OnChange
    const onChangeCodeSearch=(e)=>{
        const voucherObject={...voucherObjectSearchRequest};
        voucherObject.code=e.target.value;
        setVoucherObjectSearchRequest(voucherObject);
    }

    const onChangeQuantitySearch=(e)=>{
        const voucherObject={...voucherObjectSearchRequest};
        voucherObject.quantity=e.target.value;
        setVoucherObjectSearchRequest(voucherObject);
    }

    const onChangeDateStartSearch=(e)=>{
        const voucherObject={...voucherObjectSearchRequest};
        voucherObject.date_start=e.target.value;
        setVoucherObjectSearchRequest(voucherObject);
    }

    const onChangeDateEndSearch=(e)=>{
        const voucherObject={...voucherObjectSearchRequest};
        voucherObject.date_end=e.target.value;
        setVoucherObjectSearchRequest(voucherObject);
    }

    const onChangeValueSearch=(e)=>{
        const voucherObject={...voucherObjectSearchRequest};
        voucherObject.value=e.target.value;
        setVoucherObjectSearchRequest(voucherObject);
    }

    const onChangeStatusSearch=(e)=>{
        const voucherObject={...voucherObjectSearchRequest};
        voucherObject.status=e.target.value;
        setVoucherObjectSearchRequest(voucherObject);
    }


    return(
        <>
            {openAddModal && <AddVoucher setOpenAddModal={setOpenAddModal} callAPIGetAllVoucherPaging={callAPIGetAllVoucherPaging} callAPIGetToTalPage={callAPIGetToTalPage}/>}
            {openPutModal && <PutVoucher setOpenPutModal={setOpenPutModal} callAPIGetAllVoucherPaging={callAPIGetAllVoucherPaging} voucher_id={voucher_id}/>}
            {openDetailModal && <DetailVoucher setOpenDetailModal={setOpenDetailModal} voucher_id={voucher_id}/>}
            {(loading || isLoading) && <Loading/>}
            <Container>
                <div className="base-header">
                    <i className="fa-solid fa-box-open"></i>
                    <span>Quản Lý Phiếu Giảm Giá</span>
                </div>
                <div className="base-filter">
                    <div className="title-filter">
                        <i className="fa-solid fa-filter"></i>
                        <span>Bộ lọc</span>
                    </div>
                    <div className="filter-body">
                        <Row>
                            <Col lg={4} className="mb-4">
                                <Form.Group>
                                    <Form.Label>Mã khuyến mại</Form.Label>
                                    <Form.Control value={voucherObjectSearchRequest.code} onChange={onChangeCodeSearch} type="text" placeholder="Tìm kiếm"/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <Form.Group>
                                    <Form.Label>Số Lượng</Form.Label>
                                    <Form.Control value={voucherObjectSearchRequest.quantity} onChange={onChangeQuantitySearch} type="text" placeholder="Tìm kiếm"/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <Form.Group>
                                    <Form.Label>Từ ngày</Form.Label>
                                    <Form.Control value={voucherObjectSearchRequest.date_start} onChange={onChangeDateStartSearch} type="date"/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <Form.Group>
                                    <Form.Label>Giá trị giảm</Form.Label>
                                    <Form.Control value={voucherObjectSearchRequest.value} onChange={onChangeValueSearch} type="text" placeholder="Tìm kiếm"/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <Form.Group>
                                    <Form.Label>Trạng thái</Form.Label>
                                    <Form.Select value={voucherObjectSearchRequest.status} onChange={onChangeStatusSearch}>
                                        <option value="">Tất cả</option>
                                        <option value="SAP_AP_DUNG">Sắp Áp Dung</option>
                                        <option value="DANG_AP_DUNG">Đang Áp Dụng</option>
                                        <option value="NGUNG_AP_DUNG">Quá Hạn</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <Form.Group>
                                    <Form.Label>Đến ngày</Form.Label>
                                    <Form.Control value={voucherObjectSearchRequest.date_end} onChange={onChangeDateEndSearch} type="date"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} style={{textAlign: "center", marginTop: "20px"}}>
                                <button onClick={handleSearch} className="handleFilter">Tìm Kiếm</button>
                                <button onClick={handleClearSearch} className="handleClearFilter">Làm mới bộ lọc</button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="base-body">
                    <div className="base-body-title">
                        <div className={"base-body-title-left"}>
                            <i className="fa-solid fa-list"></i>
                            <span>Danh sách phiếu giảm giá</span>
                        </div>
                        <div className={"base-body-title-right"}>
                            <button onClick={handleOpenAddVoucher} className={"btn btn-primary"}>
                                <i className="fa-solid fa-plus"></i>
                                <span style={{marginLeft: "5px"}}>Thêm</span>
                            </button>
                        </div>
                    </div>
                    <Card style={{marginTop: "30px"}}>
                        <Card.Body style={{padding:"0"}}>
                            <Table style={{marginBottom:"0"}}>
                                <thead>
                                <tr style={{fontSize: "13px", fontWeight: "600"}}>
                                    <th style={{width: "5%", textAlign: "center"}}>STT</th>
                                    <th style={{width: "5%", textAlign: "center"}}>Mã</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Tên Khuyến Mãi</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Số Lượng Tồn</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Giá Trị Giảm</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Đơn Tối Thiểu</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Ngày Bắt Đầu</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Ngày Kết Thúc</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Ngày Cập Nhật</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Trạng Thái</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Hành Động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listVoucher.map((item,index)=>{
                                    return(
                                        <tr key={index} style={{fontSize: "11px"}}>
                                            <td style={{textAlign: "center"}}>1</td>
                                            <td style={{textAlign: "center"}}>{item.code}</td>
                                            <td style={{textAlign: "center"}}>{item.name}</td>
                                            <td style={{textAlign: "center"}}>{item.quantity}</td>
                                            <td style={{textAlign: "center"}}>{item.value.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</td>
                                            <td style={{textAlign: "center"}}>{item.minimum_Oder.toLocaleString("vi-VN",{style:"currency",currency:"VND"})}</td>
                                            <td style={{textAlign: "center"}}>{item.date_Start}</td>
                                            <td style={{textAlign: "center"}}>{item.date_End}</td>
                                            <td style={{textAlign: "center"}}>{moment(item.updated_At).format("YYYY-MM-DD hh:mm:ss")}</td>
                                            <td style={{textAlign: "center", justifyContent: "center", color: "#fff", borderRadius: "5px"}}>
                                                <span style={{backgroundColor: "#68ae6b", display:"block",padding:"6px 0", borderRadius: "5px"
                                                }}>{item.status === "SAP_AP_DUNG" ? "Sắp Áp Dụng" : item.status === "DANG_AP_DUNG" ? "Đang Áp Dụng" : item.status === "NGUNG_AP_DUNG" ? "Quá Hạn" : ""}</span>
                                            </td>
                                            <td style={{textAlign: "center"}}>
                                                <i onClick={()=>{handleOpenDetailVoucher(item.id)}} className="fa-regular fa-eye actionDetail"></i>
                                                <i onClick={()=>{handleOpenPutVoucher(item.id)}} className="fa-regular fa-pen-to-square actionEdit"></i>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor: "#fff"}}>
                            <Paging whatAction={whatAction} TotalPage={totalPage} APIPaging={handleAPIPaging} APISearchPaging={handleAPISearchPaging}/>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </>
    )
}
export default Voucher