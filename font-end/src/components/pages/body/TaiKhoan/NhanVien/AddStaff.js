
import "./AddStaff.css"
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useCallback, useEffect, useRef, useState} from "react";
import StaffAPI from "../../../../services/StaffAPI/StaffAPI";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../loading/Loading";
// import {CallApiGeoGraph} from "../../../../../redux/slices/APIVNSlice";
import {toastMessage} from "../../../../../redux/slices/ToastMsgSlice";
import LocationAPI from "../../../../services/LocationAPI/LocationAPI";


const AddStaff=()=>{
    //toastmsg
    const toastSuccess=useSelector(state => state.toastmsg.toastSuccess);
    const toastWarning=useSelector(state => state.toastmsg.toastWarning);
    //state PostStaffRequest
    const [postStaffRequest,setPostStaffRequest] = useState({
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
    // Touch
    const [touch,setTouch] = useState({
        name : false,
        gender : false,
        birthday : false,
        phone : false,
        email : false,
        cccd : false,
        status : false,
        address_province : false,
        address_district : false,
        address_ward : false,
        address_detail : false
    })
    // useRef
    const openUpload=useRef();
    const [errors,setErrors]=useState({
        name:undefined,
        cccd:undefined,
        email:undefined,
        address_province:undefined,
        address_district:undefined,
        address_ward:undefined,
        address_detail:undefined,
        birthday:undefined,
        phone:undefined,
        status:undefined,
        gender:undefined
    })
    // loading
    const nav=useNavigate();
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch();
    // const listCity=useSelector((state)=>state.geograph.listGeograph)
    const [listProvince,setListProvince]=useState([]);
    const [listDistrict,setListDistrict]=useState([])
    const [listWard,setListWard]=useState([])


    useEffect(() => {
        // dispatch(CallApiGeoGraph())
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

    const handlePostStaff= async ()=>{
        const formData=new FormData()
        formData.append("name",postStaffRequest.name)
        switch (postStaffRequest.gender){
            case '':
                formData.append("gender",'')
                break
            case 'true':
                formData.append("gender",true)
                break
            case 'false':
                formData.append("gender",false)
                break
            default:
                formData.append("gender",'')
        }
        formData.append("birthday",postStaffRequest.birthday)
        formData.append("phone",postStaffRequest.phone)
        formData.append("email",postStaffRequest.email)
        formData.append("cccd",postStaffRequest.cccd)
        switch (postStaffRequest.status){
            case '':
                formData.append("status",'')
                break
            case 'true':
                formData.append("status",true)
                break
            case 'false':
                formData.append("status",false)
                break
            default:
                formData.append("status",'')
        }
        formData.append("address_province",postStaffRequest.address_province)
        formData.append("address_district",postStaffRequest.address_district)
        formData.append("address_ward",postStaffRequest.address_ward)
        formData.append("address_detail",postStaffRequest.address_detail)
        formData.append("image",postStaffRequest.image)
        try {
            setLoading(true)
            const response= await StaffAPI.postStaff(formData);
            if(response && response.status===201){
                setLoading(false);
                const toastMsg={...toastSuccess};
                toastMsg.message="Thêm Nhân Viên Mới Thành Công!";
                dispatch(toastMessage(toastMsg));
                nav("/staff-management");
            }
        }catch (e){
            setLoading(false)
            console.log(e)
            const errorCopy={...errors}
            errorCopy.name=e.response.data.name;
            errorCopy.gender=e.response.data.gender;
            errorCopy.birthday=e.response.data.birthday;
            errorCopy.phone=e.response.data.phone;
            errorCopy.email=e.response.data.email;
            errorCopy.cccd=e.response.data.cccd;
            errorCopy.status=e.response.data.status;
            errorCopy.address_province=e.response.data.address_province;
            errorCopy.address_district=e.response.data.address_district;
            errorCopy.address_ward=e.response.data.address_ward;
            errorCopy.address_detail=e.response.data.address_detail;
            if(e.response.data.image==='Bạn Chưa Chọn Ảnh!'){
                const toastMsg={...toastWarning};
                toastMsg.message=e.response.data.image;
                dispatch(toastMessage(toastMsg));
            }
            setErrors(errorCopy);
        }
    }

    const handleScanQRCODE=()=>{

    }

    //start OnChange
    const onChangeName=(e)=>{
        const newPostStaffRequest = {...postStaffRequest};
        newPostStaffRequest.name = e.target.value;
        setPostStaffRequest(newPostStaffRequest);

        if(!touch.name){
            const newTouch = {...touch};
            newTouch.name = true;
            setTouch(newTouch);
        }

        if(errors.name !== undefined){
            const newError={...errors};
            newError.name = undefined;
            setErrors(newError);
        }
    }

    const onChangeGender=(e)=>{
        const newPostStaffRequest = {...postStaffRequest};
        newPostStaffRequest.gender = e.target.value;
        setPostStaffRequest(newPostStaffRequest);

        if(!touch.gender){
            const newTouch = {...touch};
            newTouch.gender = true;
            setTouch(newTouch);
        }

        if(errors.gender !== undefined){
            const newError={...errors};
            newError.gender = undefined;
            setErrors(newError);
        }
    }

    const onChangeBirthDay=(e)=>{
        const newPostStaffRequest = {...postStaffRequest};
        newPostStaffRequest.birthday = e.target.value;
        setPostStaffRequest(newPostStaffRequest);

        if(!touch.birthday){
            const newTouch = {...touch};
            newTouch.birthday = true;
            setTouch(newTouch);
        }

        if(errors.birthday !== undefined){
            const newError={...errors};
            newError.birthday = undefined;
            setErrors(newError);
        }
    }

    const onChangePhone=(e)=>{
        const newPostStaffRequest = {...postStaffRequest};
        newPostStaffRequest.phone = e.target.value;
        setPostStaffRequest(newPostStaffRequest);

        if(!touch.phone){
            const newTouch = {...touch};
            newTouch.phone = true;
            setTouch(newTouch);
        }

        if(errors.phone !== undefined){
            const newError={...errors};
            newError.phone = undefined;
            setErrors(newError);
        }
    }

    const onChangeEmail=(e)=>{
        const newPostStaffRequest = {...postStaffRequest};
        newPostStaffRequest.email = e.target.value;
        setPostStaffRequest(newPostStaffRequest);

        if(!touch.email){
            const newTouch = {...touch};
            newTouch.email = true;
            setTouch(newTouch);
        }

        if(errors.email !== undefined){
            const newError={...errors};
            newError.email = undefined;
            setErrors(newError);
        }
    }

    const onChangeCCCD=(e)=>{
        const newPostStaffRequest = {...postStaffRequest};
        newPostStaffRequest.cccd = e.target.value;
        setPostStaffRequest(newPostStaffRequest);

        if(!touch.cccd){
            const newTouch = {...touch};
            newTouch.cccd = true;
            setTouch(newTouch);
        }

        if(errors.cccd !== undefined){
            const newError={...errors};
            newError.cccd = undefined;
            setErrors(newError);
        }
    }

    const onChangeStatus=(e)=>{
        const newPostStaffRequest = {...postStaffRequest};
        newPostStaffRequest.status = e.target.value;
        setPostStaffRequest(newPostStaffRequest);

        if(!touch.status){
            const newTouch = {...touch};
            newTouch.status = true;
            setTouch(newTouch);
        }

        if(errors.status !== undefined){
            const newError={...errors};
            newError.status = undefined;
            setErrors(newError);
        }
    }

    const onChangeProvince=(e)=>{
        //set List Districts and Wards
        if(e.target.value.length === 0){
            const newPostStaffRequest = {...postStaffRequest};
            newPostStaffRequest.address_province = e.target.value;
            newPostStaffRequest.address_district="";
            newPostStaffRequest.address_ward="";

            setPostStaffRequest(newPostStaffRequest);
            setListDistrict([]);
            setListWard([]);
        }else{
            const newPostStaffRequest = {...postStaffRequest};
            newPostStaffRequest.address_province = e.target.value;
            setPostStaffRequest(newPostStaffRequest);
            getAllDistrictsByProvince_code(e.target.value);
        }

        if(!touch.address_province){
            const newTouch = {...touch};
            newTouch.address_province = true;
            setTouch(newTouch);
        }

        if(errors.address_province !== undefined){
            const newError={...errors};
            newError.address_province = undefined;
            setErrors(newError);
        }
    }
    const onChangeDistrict=(e)=>{

        if(e.target.value.length === 0){
            const newPostStaffRequest = {...postStaffRequest};
            newPostStaffRequest.address_district = e.target.value;
            newPostStaffRequest.address_ward="";

            setPostStaffRequest(newPostStaffRequest);
            setListWard([]);
        }else{
            const newPostStaffRequest = {...postStaffRequest};
            newPostStaffRequest.address_district = e.target.value;
            setPostStaffRequest(newPostStaffRequest);
            getAllWardsByDistrict_code(e.target.value);
        }

        if(!touch.address_district){
            const newTouch = {...touch};
            newTouch.address_district = true;
            setTouch(newTouch);
        }

        if(errors.address_district !== undefined){
            const newError={...errors};
            newError.address_district = undefined;
            setErrors(newError);
        }
    }
    const onChangeWard=(e)=>{
        const newPostStaffRequest = {...postStaffRequest};
        newPostStaffRequest.address_ward = e.target.value;
        setPostStaffRequest(newPostStaffRequest);

        if(!touch.address_ward){
            const newTouch = {...touch};
            newTouch.address_ward = true;
            setTouch(newTouch);
        }

        if(errors.address_ward !== undefined){
            const newError={...errors};
            newError.address_ward = undefined;
            setErrors(newError);
        }
    }

    const onChangeAddressDetail=(e)=>{
        const newPostStaffRequest = {...postStaffRequest};
        newPostStaffRequest.address_detail = e.target.value;
        setPostStaffRequest(newPostStaffRequest);

        if(!touch.address_detail){
            const newTouch = {...touch};
            newTouch.address_detail = true;
            setTouch(newTouch);
        }

        if(errors.address_detail !== undefined){
            const newError={...errors};
            newError.address_detail = undefined;
            setErrors(newError);
        }
    }

    //end OnChange

    const isValidEmail=useCallback((email)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },[])

    const handleChangeFile=(e)=>{
        const newPostStaffRequest = {...postStaffRequest};
        newPostStaffRequest.image = e.target.files[0];
        setPostStaffRequest(newPostStaffRequest);
        showImage(e.target.files[0])
    }

    //ShowImage
    const showImage=(file)=>{
        const img=document.querySelector(".my-image")
        const uploadtext=document.querySelector(".upload-text")
        let FileType;
        if(file){
            FileType=file.type;
        }
        const validExtentions=['image/jpeg','image/jpg',"image/png","img/webp"];
        if(validExtentions.includes(FileType)){
            const fileReader=new FileReader();
            fileReader.onload=()=>{
                const fileURL=fileReader.result;
                uploadtext.style.display="none"
                img.style.display="block"
                img.src=fileURL
            }
            fileReader.readAsDataURL(file)
        }
    }

    return(
        <>
            {loading && <Loading/>}
            <Container>
                <div className="addstaff-header">
                    <span>Thêm Nhân Viên</span>
                </div>
                <Row className="addstaff-content">
                    <Col lg={3}>
                        <div className="addstaff-content-left">
                            <span>Ảnh Đại Diện</span>
                            <div className="upload" onClick={(e) => {
                                openUpload.current.click()
                            }}>
                                <img style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover",display:"none"}} className="my-image"/>
                                <div>
                                    <div className="upload-text">
                                        <i className="fa-solid fa-plus"></i>
                                        <p>Upload</p>
                                    </div>
                                </div>
                            </div>
                            <input ref={openUpload} type="file" onChange={handleChangeFile} hidden/>
                        </div>
                    </Col>
                    <Col lg={9}> {/* Chiếm 9 cột (cỡ nhỏ) và thêm khoảng cách */}
                        <div className="addstaff-content-right">
                            <span className="title">Thông Tin Nhân Viên</span>
                            <div style={{width: "85%", margin: "0 auto"}}>
                                <div style={{display: "flex", justifyContent: "end"}}>
                                    <Button style={{padding: "7px 20px"}} onClick={handleScanQRCODE} type="submit">
                                        <i className="fa-solid fa-qrcode"></i>
                                        <span style={{marginLeft:"5px"}}>Quét QR</span>
                                    </Button>
                                </div>
                                <Row className="mb-3">
                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Tên nhân viên
                                            </Form.Label>
                                            <Form.Control required type="text" placeholder="Điền tên nhân viên!"
                                                          value={postStaffRequest.name} onChange={(e) => {
                                                onChangeName(e)
                                            }}
                                                          isInvalid={touch.name && postStaffRequest.name.length === 0 || errors.name!==undefined}
                                                          isValid={postStaffRequest.name.length > 5}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.name!==undefined ? errors.name : 'Bạn Chưa Điền Tên Nhân Viên!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Căn cước công dân
                                            </Form.Label>
                                            <Form.Control required type="text" placeholder="Điền căn cước công dân!"
                                                          value={postStaffRequest.cccd} onChange={(e) => {
                                                onChangeCCCD(e)
                                            }}
                                                          isInvalid={touch.cccd && postStaffRequest.cccd.length === 0 || errors.cccd!==undefined}
                                                          isValid={postStaffRequest.cccd.length === 12}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.cccd!==undefined ? errors.cccd : 'Bạn Chưa Điền CCCD!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Email </Form.Label>
                                            <Form.Control required type="email" placeholder="Điền email!"
                                                          onChange={(e) => {
                                                              onChangeEmail(e)
                                                          }}
                                                          isInvalid={touch.email && postStaffRequest.email.length === 0 || errors.email!==undefined}
                                                          isValid={isValidEmail(postStaffRequest.email)}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.email!==undefined ? errors.email : 'Bạn Chưa Điền Email!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Tỉnh/Thành Phố
                                            </Form.Label>
                                            <Form.Select value={postStaffRequest.address_province} required onChange={onChangeProvince}
                                                         isInvalid={touch.address_province && postStaffRequest.address_province === '' || errors.address_province!==undefined} isValid={postStaffRequest.address_province !== ''}>
                                                <option value="">--Chọn Tỉnh/Thành Phố--</option>
                                                {listProvince.map((item,index)=>{
                                                    return(
                                                        <option key={index} value={item.code}>{item.full_Name}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.address_province!==undefined ? errors.address_province : 'Bạn Chưa Chọn Tỉnh Thành Phố!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Xã/Phường </Form.Label>
                                            <Form.Select value={postStaffRequest.address_ward} required onChange={onChangeWard}
                                                         isInvalid={touch.address_ward && postStaffRequest.address_ward === '' || errors.address_ward!==undefined}
                                                         isValid={postStaffRequest.address_ward !== ''}>
                                                <option value="">--Chọn Xã/Phường--</option>
                                                {listWard.map((item,index)=>{
                                                    return(
                                                        <option key={index} value={item.code}>{item.full_Name}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.address_ward!==undefined ? errors.address_ward : 'Bạn Chưa Chọn Xã Phường!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Trạng Thái </Form.Label>
                                            <Form.Select required onChange={onChangeStatus}
                                                         isInvalid={touch.status && postStaffRequest.status === '' || errors.status!==undefined }
                                                         isValid={postStaffRequest.status !== ''}>
                                                <option value="">--Chọn Trạng Thái--</option>
                                                <option value="true">Đi làm</option>
                                                <option value="false">Tạm ngưng</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.status!==undefined ? errors.status : 'Bạn Chưa Chọn Trạng Thái!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Ngày sinh </Form.Label>
                                            <Form.Control required type="date" placeholder="Last name"
                                                          onChange={onChangeBirthDay}
                                                          isInvalid={touch.birthday && postStaffRequest.birthday === '' || errors.birthday!==undefined}
                                                          isValid={postStaffRequest.birthday !== ''}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.birthday!==undefined ? errors.birthday : 'Bạn Chưa Chọn Ngày Sinh!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Giới Tính </Form.Label>
                                            <br/>
                                            <Form.Check onChange={onChangeGender} style={{marginLeft: "5px"}} inline label="Nam" type="radio" name="gender" value="true" required
                                                            isInvalid={touch.gender && postStaffRequest.gender==='' || errors.gender!==undefined }
                                                            isValid={postStaffRequest.gender!==''}/>
                                            <Form.Check onChange={onChangeGender} style={{marginLeft: "5px"}} inline label="Nữ" type="radio" name="gender" value="false" required
                                                        isInvalid={touch.gender && postStaffRequest.gender==='' || errors.gender!==undefined }
                                                        isValid={postStaffRequest.gender!==''}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.gender!==undefined ? errors.gender : 'Bạn Chưa Chọn Giới Tính!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Số điện thoại
                                            </Form.Label>
                                            <Form.Control required type="number" placeholder="Điền số điện thoại!"
                                                          onChange={onChangePhone}
                                                          isInvalid={touch.phone && postStaffRequest.phone === '' || errors.phone!==undefined}
                                                          isValid={postStaffRequest.phone.length === 10}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.phone!==undefined ? errors.phone : 'Bạn Chưa Điền Số Điện Thoại!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Quận/Huyện </Form.Label>
                                            <Form.Select value={postStaffRequest.address_district} required onChange={onChangeDistrict}
                                                         isInvalid={touch.address_district && postStaffRequest.address_district === '' || errors.address_district!==undefined}
                                                         isValid={postStaffRequest.address_district !== ''}>
                                                <option value="">--Chọn Quận/Huyện--</option>
                                                {listDistrict.map((item,index)=>{
                                                    return(
                                                        <option key={index} value={item.code}>{item.full_Name}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.address_province!==undefined ? errors.address_province : 'Bạn Chưa Chọn Quận Huyện!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Số nhà/Ngõ/Đường
                                            </Form.Label>
                                            <Form.Control required type="text" placeholder="Điền số nhà/ngõ/đường!"
                                                          onChange={onChangeAddressDetail}
                                                          isInvalid={touch.address_detail && postStaffRequest.address_detail === '' || errors.address_detail!==undefined}
                                                          isValid={postStaffRequest.address_detail.length > 0}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.address_detail!==undefined ? errors.address_detail : 'Bạn Chưa Điền Số nhà/Ngõ/Đường!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div style={{display: "flex", justifyContent: "end",padding:"0 0 20px 0"}}>
                                    <Button style={{padding: "7px 30px"}} onClick={handlePostStaff}
                                            type="submit">Thêm</Button>
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

export default AddStaff