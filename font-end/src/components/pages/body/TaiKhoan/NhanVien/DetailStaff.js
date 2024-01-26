import "./AddStaff.css"
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useCallback, useEffect, useRef, useState} from "react";
import StaffAPI from "../../../../services/StaffAPI/StaffAPI";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../loading/Loading";
import {CallApiGeoGraph, CallApiVN} from "../../../../../redux/slices/APIVNSlice";


const DetailStaff=()=>{
    const [staff,setStaff]=useState({})
    // useRef
    const openUpload=useRef();
    // loading
    const nav=useNavigate();
    const {id}=useParams();


    useEffect(() => {
        getStaffById();
    }, []);

    const getStaffById= async ()=>{
        const response = await StaffAPI.getStaffById(id)
        setStaff(response.data)
        let nam=document.querySelector(`input[name="gender"][value="true"]`)
        let nu=document.querySelector(`input[name="gender"][value="false"]`)
        if(response.data.gender===true){
            nam.checked=true;
        }else{
            nu.checked=true;
        }
    }

    return(
        <>
            <Container>
                <div className="addstaff-header">
                    <span>Thêm Nhân Viên</span>
                </div>
                <Row className="addstaff-content">
                    <Col lg={3}>
                        <div className="addstaff-content-left">
                            <span>Ảnh Đại Diện</span>
                            <div className="upload">
                                <img src={staff.image_url} style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}} className="my-image"/>
                                <div hidden>
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
                                            <Form.Control required type="text" placeholder="Điền tên nhân viên!" value={staff.name}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Căn cước công dân
                                            </Form.Label>
                                            <Form.Control required type="text" placeholder="Điền căn cước công dân!" value={staff.cccd}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Email </Form.Label>
                                            <Form.Control value={staff.email} required type="email" placeholder="Điền email!"/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Tỉnh/Thành Phố
                                            </Form.Label>
                                            <Form.Select required>
                                                <option value="">{staff.address_city}</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Xã/Phường </Form.Label>
                                            <Form.Select required>
                                                <option value="">{staff.address_ward}</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Trạng Thái </Form.Label>
                                            <Form.Select required>
                                                <option value="">{staff.status ? "Đang Làm" : "Tạm Ngưng"}</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Ngày sinh </Form.Label>
                                            <Form.Control required type="date" value={staff.birthday}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Giới Tính </Form.Label>
                                            <br/>
                                            <Form.Check style={{marginLeft: "5px"}} className={"gender"} inline label="Nam" type="radio" name="gender" value="true" required/>
                                            <Form.Check style={{marginLeft: "5px"}} className={"gender"} inline label="Nữ" type="radio" name="gender" value="false" required/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Số điện thoại
                                            </Form.Label>
                                            <Form.Control required type="number" placeholder="Điền số điện thoại!" value={staff.phone}/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Quận/Huyện </Form.Label>
                                            <Form.Select required>
                                                <option value="">{staff.address_province}</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Số nhà/Ngõ/Đường
                                            </Form.Label>
                                            <Form.Control required type="text" value={staff.address_detail}/>
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
                                    }} onClick={()=>{nav("/staff-management")}} type="submit">Hủy</Button>
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