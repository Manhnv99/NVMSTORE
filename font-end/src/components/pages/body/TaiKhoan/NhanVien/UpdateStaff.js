import "./AddStaff.css"
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useCallback, useEffect, useRef, useState} from "react";
import StaffAPI from "../../../../services/StaffAPI/StaffAPI";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../../../loading/Loading";
import {CallApiGeoGraph, CallApiVN} from "../../../../../redux/slices/APIVNSlice";
import {toastMessage} from "../../../../../redux/slices/ToastMsgSlice";


const UpdateStaff=()=>{
    const [name,setName]=useState('')
    const [cccd,setCCCD]=useState('')
    const [city,setCity]=useState('')
    const [province,setProvice]=useState('')
    const [ward,setWard]=useState('')
    const [address,setAddress]=useState('')
    const [status,setStatus]=useState('')
    const [phone,setPhone]=useState('')
    const [email,setEmail]=useState('')
    const [birth,setBirth]=useState('')
    const [gender,setGender]=useState('')
    const [image,setImage]=useState(new File([],'empty-file'))
    const [imageShow,setImageShow]=useState('')
    // Touch
    const [touchName,setTouchName]=useState(false)
    const [touchCCCD,setTouchCCCD]=useState(false)
    const [touchCity,setTouchCity]=useState(false)
    const [touchProvice,setTouchProvice]=useState(false)
    const [touchWard,setTouchWard]=useState(false)
    const [touchAddress,setTouchAddress]=useState(false)
    const [touchStatus,setTouchStatus]=useState(false)
    const [touchPhone,setTouchPhone]=useState(false)
    const [touchEmail,setTouchEmail]=useState(false)
    const [touchBirth,setTouchBirth]=useState(false)
    const [touchGender,setTouchGender]=useState(false)
    // useRef
    const openUpload=useRef();
    const [errors,setErrors]=useState({
        name:undefined,
        cccd:undefined,
        email:undefined,
        address_city:undefined,
        address_province:undefined,
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
    const listCity=useSelector((state)=>state.geograph.listGeograph)
    const [listDistrict,setListDistrict]=useState([])
    const [listWard,setListWard]=useState([])
    const {id}=useParams();



    useEffect(() => {
        getStaffById(id);
        dispatch(CallApiGeoGraph())
    }, []);

    const getStaffById=async (id)=>{
        try {
            const res= await StaffAPI.getStaffById(id);
            const data=res.data;
            setName(data.name)
            setCCCD(data.cccd)
            setCity(data.address_city)
            setProvice(data.address_province)
            setWard(data.address_ward)
            setAddress(data.address_detail)
            setStatus(data.status+"")
            setPhone(data.phone)
            setEmail(data.email)
            setBirth(data.birthday)
            setGender(data.gender+"")
            setImageShow(data.image_url)
            let nam=document.querySelector(`input[name="gender"][value="true"]`)
            let nu=document.querySelector(`input[name="gender"][value="false"]`)
            if(data.gender===true){
                nam.checked=true;
            }else{
                nu.checked=true;
            }
            let statusDOC=document.querySelectorAll('.statusDOC option')
            if (data.status===true){
                // eslint-disable-next-line no-unused-expressions
                statusDOC[1].selected=true
            }else{
                // eslint-disable-next-line no-unused-expressions
                statusDOC[2].selected=true
            }
        }catch (e) {
            console.log(e)
        }
    }


    const handleUpdateStaff= async ()=>{
        const formData=new FormData();
        formData.append("name",name)
        switch (gender){
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
        formData.append("birthday",birth)
        formData.append("phone",phone)
        formData.append("email",email)
        formData.append("cccd",cccd)
        switch (status){
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
        formData.append("address_city",city)
        formData.append("address_province",province)
        formData.append("address_ward",ward)
        formData.append("address_detail",address)
        formData.append("image",image)
        try {
            setLoading(true)
            const response= await StaffAPI.updateStaff(id,formData);
            if(response && response.status===200){
                setLoading(false)
                dispatch(toastMessage("Cập nhật nhân viên thành công!"))
                nav("/staff-management")
            }
        }catch (e){
            setLoading(false)
            const errorCopy={...errors}
            errorCopy.name=e.response.data.name
            errorCopy.cccd=e.response.data.cccd
            errorCopy.email=e.response.data.email
            errorCopy.address_city=e.response.data.address_city
            errorCopy.address_province=e.response.data.address_province
            errorCopy.address_ward=e.response.data.address_ward
            errorCopy.address_detail=e.response.data.address_detail
            errorCopy.phone=e.response.data.phone
            errorCopy.birthday=e.response.data.birthday
            errorCopy.status=e.response.data.status
            errorCopy.gender=e.response.data.gender
            setErrors(errorCopy)
        }
    }
    const handleScanQRCODE=()=>{

    }

    const onChangeName=useCallback(e=>{
        setName(e.target.value)
        if(!touchName){
            setTouchName(true)
            setErrors({...errors})
        }
    },[])
    const onChangeCCCD=useCallback(e=>{
        setCCCD(e.target.value)
        if(!touchCCCD){
            setTouchCCCD(true)
            setErrors({...errors})
        }
    },[])
    const onChangeCity=(e)=>{
        if(e.target.value===""){
            setCity("")
        }else{
            let cityChoose=listCity[e.target.value] //get index
            setCity(cityChoose.name)
            setListDistrict(cityChoose.districts)
            if(!touchCity){
                setTouchCity(true)
                setErrors({...errors})
            }
        }
    }
    const onChangeProvice=(e)=>{
        if(e.target.value===""){
            setProvice("")
        }else{
            let districtChoose=listDistrict[e.target.value]
            setProvice(districtChoose.name)
            setListWard(districtChoose.wards)
            if(!touchProvice){
                setTouchProvice(true)
                setErrors({...errors})
            }
        }
    }
    const onChangeWard=(e)=>{
        setWard(e.target[Number(e.target.value)+1].innerText)
        if(!touchWard){
            setTouchWard(true)
            setErrors({...errors})
        }
    }
    const onChangeAddress=useCallback(e=>{
        setAddress(e.target.value)
        if(!touchAddress){
            setTouchAddress(true)
            setErrors({...errors})
        }
    },[])
    const onChangeStatus=useCallback(e=>{
        setStatus(e.target.value)
        if(!touchStatus){
            setTouchStatus(true)
            setErrors({...errors})
        }
    },[])
    const onChangeGender=useCallback(e=>{
        setGender(e.target.value)
        if(!touchGender){
            setTouchGender(true)
            setErrors({...errors})
        }
    },[])
    const onChangePhone=useCallback(e=>{
        setPhone(e.target.value)
        if(!touchPhone){
            setTouchPhone(true)
            setErrors({...errors})
        }
    },[])
    const onChangeBirth=useCallback(e=>{
        setBirth(e.target.value)
        if(!touchBirth){
            setTouchBirth(true)
            setErrors({...errors})
        }
    },[])
    const onChangeEmail=useCallback(e=>{
        setEmail(e.target.value)
        if(!touchEmail){
            setTouchEmail(true)
            setErrors({...errors})
        }
    },[])
    const isValidEmail=useCallback((email)=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },[])

    const handleChangeFile=(e)=>{
        setImage(e.target.files[0])
        showImage(e.target.files[0])
    }


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
                            <div className="upload" onClick={(e) => {openUpload.current.click()}}>
                                <img src={imageShow} style={{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover"}} className="my-image"/>
                                <div style={{display:"none"}}>
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
                                                          value={name} onChange={(e) => {
                                                onChangeName(e)
                                            }}
                                                          isInvalid={touchName && name.length === 0 || errors.name!==undefined}
                                                          isValid={name.length > 5}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.name!==undefined ? errors.name : 'Bạn Chưa Điền Tên Nhân Viên!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Căn cước công dân
                                            </Form.Label>
                                            <Form.Control required type="text" placeholder="Điền căn cước công dân!"
                                                          value={cccd} onChange={(e) => {
                                                onChangeCCCD(e)
                                            }}
                                                          isInvalid={touchCCCD && cccd.length === 0 || errors.cccd!==undefined}
                                                          isValid={cccd.length === 12}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.cccd!==undefined ? errors.cccd : 'Bạn Chưa Điền CCCD!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Email </Form.Label>
                                            <Form.Control value={email} required type="email" placeholder="Điền email!"
                                                          onChange={(e) => {
                                                              onChangeEmail(e)
                                                          }}
                                                          isInvalid={touchEmail && email.length === 0 || errors.email!==undefined}
                                                          isValid={isValidEmail(email)}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.email!==undefined ? errors.email : 'Bạn Chưa Điền Email!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Tỉnh/Thành Phố
                                            </Form.Label>
                                            <Form.Select required onChange={(e) => {onChangeCity(e)}}
                                                         isInvalid={touchCity && city === '' || errors.address_city!==undefined} isValid={city !== ''}>
                                                <option value="">--Chọn Tỉnh/Thành Phố--</option>
                                                {listCity.map((item,index)=>{
                                                    return(
                                                        <option key={index} value={index}>{item.name}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.address_city!==undefined ? errors.address_city : 'Bạn Chưa Chọn Tỉnh Thành Phố!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Xã/Phường </Form.Label>
                                            <Form.Select required onChange={(e) => {onChangeWard(e)}}
                                                         isInvalid={touchWard && ward === '' || errors.address_ward!==undefined}
                                                         isValid={ward !== ''}>
                                                <option value="">--Chọn Xã/Phường--</option>
                                                {listWard.map((item,index)=>{
                                                    return(
                                                        <option key={index} value={index}>{item.name}</option>
                                                    )
                                                })}
                                            </Form.Select>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.address_ward!==undefined ? errors.address_ward : 'Bạn Chưa Chọn Xã Phường!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Trạng Thái </Form.Label>
                                            <Form.Select className={"statusDOC"} required onChange={onChangeStatus}
                                                         isInvalid={touchStatus && status === '' || errors.status!==undefined }
                                                         isValid={status !== ''}>
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
                                            <Form.Control value={birth} required type="date" placeholder="Last name"
                                                          onChange={onChangeBirth}
                                                          isInvalid={touchBirth && birth === '' || errors.birthday!==undefined}
                                                          isValid={birth !== ''}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.birthday!==undefined ? errors.birthday : 'Bạn Chưa Chọn Ngày Sinh!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Giới Tính </Form.Label>
                                            <br/>
                                            <Form.Check onChange={onChangeGender} style={{marginLeft: "5px"}} inline label="Nam" type="radio" name="gender" value="true" required
                                                        isInvalid={touchGender && gender==='' || errors.gender!==undefined }
                                                        isValid={gender!==''}/>
                                            <Form.Check onChange={onChangeGender} style={{marginLeft: "5px"}} inline label="Nữ" type="radio" name="gender" value="false" required
                                                        isInvalid={touchGender && gender==='' || errors.gender!==undefined }
                                                        isValid={gender!==''}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.gender!==undefined ? errors.gender : 'Bạn Chưa Chọn Giới Tính!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Số điện thoại
                                            </Form.Label>
                                            <Form.Control value={phone} required type="number" placeholder="Điền số điện thoại!"
                                                          onChange={onChangePhone}
                                                          isInvalid={touchPhone && phone === '' || errors.phone!==undefined}
                                                          isValid={phone.length === 10}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.phone!==undefined ? errors.phone : 'Bạn Chưa Điền Số Điện Thoại!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Quận/Huyện </Form.Label>
                                            <Form.Select required onChange={onChangeProvice}
                                                         isInvalid={touchProvice && province === '' || errors.address_province!==undefined}
                                                         isValid={province !== ''}>
                                                <option value="">--Chọn Quận/Huyện--</option>
                                                {listDistrict.map((item,index)=>{
                                                    return(
                                                        <option key={index} value={index}>{item.name}</option>
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
                                            <Form.Control value={address} required type="text" placeholder="Điền số nhà/ngõ/đường!"
                                                          onChange={onChangeAddress}
                                                          isInvalid={touchAddress && address === '' || errors.address_detail!==undefined}
                                                          isValid={address.length > 0}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.address_detail!==undefined ? errors.address_detail : 'Bạn Chưa Điền Số nhà/Ngõ/Đường!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div style={{display: "flex", justifyContent: "end",padding:"0 0 20px 0"}}>
                                    <Button style={{padding: "7px 30px"}} onClick={handleUpdateStaff}
                                            type="submit">Cập Nhật</Button>
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

export default UpdateStaff