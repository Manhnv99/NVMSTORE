import "./AddStaff.css"
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useCallback, useEffect, useRef, useState} from "react";
import StaffAPI from "../../../../services/StaffAPI/StaffAPI";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../loading/Loading";
import {toastMessage} from "../../../../../redux/slices/ToastMsgSlice";
import LocationAPI from "../../../../services/LocationAPI/LocationAPI";


const DetailStaff=()=>{
    //toastmsg
    const toastSuccess=useSelector(state => state.toastmsg.toastSuccess);
    const toastWarning=useSelector(state => state.toastmsg.toastWarning);
    //state PutStaffRequest
    const [putStaffRequest,setPutStaffRequest] = useState({
        name : "",
        gender : "",
        birthday : "",
        phone : "",
        email : "",
        cccd : "",
        status : "",
        address_province : "",
        address_district : "",
        address_ward : "",
        address_detail : "",
        image : new File([] , "empty-file")
    })

    const [imageShow,setImageShow]=useState('')

    // useRef
    const openUpload=useRef();
    // loading
    const {id}=useParams();
    const nav=useNavigate();
    //loading
    const [loading,setLoading]=useState(false)
    //dispatch
    const dispatch = useDispatch();
    //List Locaiton
    const [listProvince,setListProvince]=useState([]);
    const [listDistrict,setListDistrict]=useState([])
    const [listWard,setListWard]=useState([])



    useEffect(() => {
        getStaffById(id);
        getAllProvinces();
    }, []);

    //start handle call Location
    const getAllProvinces = async ()=>{
        const response = await LocationAPI.getAllProvinces();
        setListProvince(response.data);
    }

    const getAllDistrictsByProvince_code = async (province_code) =>{
        const response = await LocationAPI.getAllDistrictsByCode(province_code);
        setListDistrict(response.data);
    }

    const getAllWardsByDistrict_code = async (district_code) =>{
        const response = await LocationAPI.getAllWardsByCode(district_code);
        setListWard(response.data);
    }
    //end handle call Location

    const getStaffById=async (id)=>{
        try {
            const res= await StaffAPI.getById(id);
            const data=res.data;
            putStaffRequest.name = data.name;
            putStaffRequest.gender = data.gender;
            putStaffRequest.birthday = data.birthday;
            putStaffRequest.phone = data.phone;
            putStaffRequest.email = data.email;
            putStaffRequest.cccd = data.cccd;
            putStaffRequest.status = data.status;
            putStaffRequest.address_province = data.address_province;
            putStaffRequest.address_district = data.address_district;
            putStaffRequest.address_ward = data.address_ward;
            putStaffRequest.address_detail = data.address_detail;
            getAllDistrictsByProvince_code(data.address_province);
            getAllWardsByDistrict_code(data.address_district);
            console.log(res)
            setImageShow(data.image_url)
        }catch (e) {
            console.log(e)
        }
    }

    return(
        <>
            <Container>
                <div className="addstaff-header">
                    <span>Chi Tiết Nhân Viên</span>
                </div>
                <Row className="addstaff-content">
                    <Col lg={3}>
                        <div className="addstaff-content-left">
                            <span>Ảnh Đại Diện</span>
                            <div className="upload" style={{cursor:"default"}}>
                                <img src={imageShow} style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}} className="my-image"/>
                                <div style={{display:"none"}}>
                                    <div className="upload-text">
                                        <i className="fa-solid fa-plus"></i>
                                        <p>Upload</p>
                                    </div>
                                </div>
                            </div>
                            <input ref={openUpload} type="file" hidden/>
                        </div>
                    </Col>
                    <Col lg={9}> {/* Chiếm 9 cột (cỡ nhỏ) và thêm khoảng cách */}
                        <div className="addstaff-content-right">
                            <span className="title">Thông Tin Nhân Viên</span>
                            <div style={{width: "85%", margin: "0 auto"}}>
                                <Row className="mb-3">
                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Tên nhân viên
                                            </Form.Label>
                                            <Form.Control required type="text" placeholder="Điền tên nhân viên!"
                                                          value={putStaffRequest.name} disabled/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Căn cước công dân
                                            </Form.Label>
                                            <Form.Control required type="text" placeholder="Điền căn cước công dân!"
                                                          value={putStaffRequest.cccd} disabled/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Email </Form.Label>
                                            <Form.Control value={putStaffRequest.email} required type="email" placeholder="Điền email!" disabled/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Tỉnh/Thành Phố
                                            </Form.Label>
                                            <Form.Select value={putStaffRequest.address_province} disabled>
                                                {listProvince.map((item,index)=>{
                                                    return(
                                                        <option key={index} value={item.code}>{item.full_Name}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Xã/Phường </Form.Label>
                                            <Form.Select value={putStaffRequest.address_ward} disabled>
                                                {listWard.map((item,index)=>{
                                                    return(
                                                        <option key={index} value={item.code}>{item.full_Name}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Trạng Thái </Form.Label>
                                            <Form.Select value={putStaffRequest.status} disabled>
                                                <option value="">--Chọn Trạng Thái--</option>
                                                <option value="true">Đi làm</option>
                                                <option value="false">Tạm ngưng</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group>
                                        <Form.Label><span style={{color: "red"}}>*</span> Ngày sinh </Form.Label>
                                            <Form.Control value={putStaffRequest.birthday} type="date" placeholder="Last name" disabled/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Giới Tính </Form.Label>
                                            <br/>
                                            <Form.Check checked={putStaffRequest.gender === true || putStaffRequest.gender === "true" } style={{marginLeft: "5px"}} inline label="Nam" type="radio" name="gender" value="true" disabled/>
                                            <Form.Check checked={putStaffRequest.gender === false || putStaffRequest.gender === "false"} inline label="Nữ" type="radio" name="gender" value="false" disabled/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Số điện thoại
                                            </Form.Label>
                                            <Form.Control value={putStaffRequest.phone} type="number" placeholder="Điền số điện thoại!" disabled/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Quận/Huyện </Form.Label>
                                            <Form.Select value={putStaffRequest.address_district} disabled>
                                                {listDistrict.map((item,index)=>{
                                                    return(
                                                        <option key={index} value={item.code}>{item.full_Name}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Số nhà/Ngõ/Đường
                                            </Form.Label>
                                            <Form.Control value={putStaffRequest.address_detail} type="text" placeholder="Điền số nhà/ngõ/đường!" disabled/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div style={{display: "flex", justifyContent: "end",padding:"0 0 20px 0"}}>
                                    <Button style={{
                                        backgroundColor: "#fff",
                                        color: "#444",
                                        border: "1px solid #444",
                                        padding: "7px 25px",
                                        marginLeft: "10px"
                                    }} onClick={()=>{nav("/staff-management")}} type="submit">Quay Lại</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DetailStaff