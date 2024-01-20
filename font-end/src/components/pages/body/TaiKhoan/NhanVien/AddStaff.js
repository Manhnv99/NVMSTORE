import "./AddStaff.css"
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useCallback, useRef, useState} from "react";
import StaffAPI from "../../../../services/StaffAPI/StaffAPI";


const AddStaff=()=>{
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
    const [image,setImage]=useState('')
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
    // useRef
    const openUpload=useRef();
    const [errors,setErrors]=useState({
        name:"",
        cccd:"",
        email:"",
        address_city:"",
        address_province:"",
        address_ward:"",
        address_detail:"",
        birthday:"",
        phone:"",
    })



    const handleAddStaff= async ()=>{
        const formData=new FormData()
        formData.append("name",name)
        formData.append("gender",gender==='true' ? true : false)
        formData.append("birthday",birth)
        formData.append("phone",phone)
        formData.append("email",email)
        formData.append("cccd",cccd)
        formData.append("status",status==='true' ? true : false)
        formData.append("address_city",city)
        formData.append("address_province",province)
        formData.append("address_ward",ward)
        formData.append("address_detail",address)
        formData.append("image",image)
        try {
            const response= await StaffAPI.createStaff(formData);
            console.log(response)
        }catch (e){
            const errorCopy={...errors}
            for(let i=1;i<e.response.data.errors.length;i++){
                if(e.response.data.errors[i].field==='name'){
                    errorCopy.name=e.response.data.errors[i].defaultMessage
                }
                if(e.response.data.errors[i].field==='address_city'){
                    errorCopy.address_city=e.response.data.errors[i].defaultMessage
                }
                if(e.response.data.errors[i].field==='address_province'){
                    errorCopy.address_province=e.response.data.errors[i].defaultMessage
                }
                if(e.response.data.errors[i].field==='address_ward'){
                    errorCopy.address_ward=e.response.data.errors[i].defaultMessage
                }
                if(e.response.data.errors[i].field==='address_detail'){
                    errorCopy.address_detail=e.response.data.errors[i].defaultMessage
                }
                if(e.response.data.errors[i].field==='cccd'){
                    errorCopy.cccd=e.response.data.errors[i].defaultMessage
                }
                if(e.response.data.errors[i].field==='birthday'){
                    errorCopy.birthday=e.response.data.errors[i].defaultMessage
                }
                if(e.response.data.errors[i].field==='email'){
                    errorCopy.email=e.response.data.errors[i].defaultMessage
                }
                if(e.response.data.errors[i].field==='phone'){
                    errorCopy.phone=e.response.data.errors[i].defaultMessage
                }
            }
            setErrors(errorCopy)
        }
    }

    const onChangeName=useCallback(e=>{
        setName(e.target.value)
        console.log(errors)
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
    const onChangeCity=useCallback(e=>{
        setCity(e.target.value)
        if(!touchCity){
            setTouchCity(true)
            setErrors({...errors})
        }
    },[])
    const onChangeProvice=useCallback(e=>{
        setProvice(e.target.value)
        if(!touchProvice){
            setTouchProvice(true)
            setErrors({...errors})
        }
    },[])
    const onChangeWard=useCallback(e=>{
        setWard(e.target.value)
        if(!touchWard){
            setTouchWard(true)
            setErrors({...errors})
        }
    },[])
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
                                    <Button style={{padding: "7px 20px"}} onClick={handleAddStaff} type="submit">
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
                                                          isInvalid={touchName && name.length === 0 || errors.name!==''}
                                                          isValid={name.length > 5}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.name!=='' ? errors.name : 'Bạn Chưa Điền Tên Nhân Viên!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Căn cước công dân
                                            </Form.Label>
                                            <Form.Control required type="text" placeholder="Điền căn cước công dân!"
                                                          value={cccd} onChange={(e) => {
                                                onChangeCCCD(e)
                                            }}
                                                          isInvalid={touchCCCD && cccd.length === 0 || errors.cccd!==''}
                                                          isValid={cccd.length === 12}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.cccd!=='' ? errors.cccd : 'Bạn Chưa Điền CCCD!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Email </Form.Label>
                                            <Form.Control required type="email" placeholder="Điền email!"
                                                          onChange={(e) => {
                                                              onChangeEmail(e)
                                                          }}
                                                          isInvalid={touchEmail && email.length === 0 || errors.email!==''}
                                                          isValid={isValidEmail(email)}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.email!=='' ? errors.email : 'Bạn Chưa Điền Email!'}
                                            </Form.Control.Feedback>
                                            {console.log(errors)}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Tỉnh/Thành Phố
                                            </Form.Label>
                                            <Form.Select required onChange={(e) => {
                                                onChangeCity(e)
                                            }}
                                                         isInvalid={touchCity && city === '' || errors.address_city!==''} isValid={city !== ''}>
                                                <option value="">--Chọn Tỉnh/Thành Phố--</option>
                                                <option value="1">One</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.address_city!=='' ? errors.address_city : 'Bạn Chưa Chọn Tỉnh Thành Phố!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Xã/Phường </Form.Label>
                                            <Form.Select required onChange={(e) => {
                                                onChangeWard(e)
                                            }}
                                                         isInvalid={touchWard && ward === '' || errors.address_ward!==''} isValid={ward !== ''}>
                                                <option value="">--Chọn Xã/Phường--</option>
                                                <option value="1">One</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.address_ward!=='' ? errors.address_ward : 'Bạn Chưa Chọn Xã Phường!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Trạng Thái </Form.Label>
                                            <Form.Select required onChange={(e) => {
                                                onChangeStatus(e)
                                            }}
                                                         isInvalid={touchStatus && status === '' }
                                                         isValid={status !== ''}>
                                                <option value="">--Chọn Trạng Thái--</option>
                                                <option value="true">Đi làm</option>
                                                <option value="false">Tạm ngưng</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type={"invalid"}>Bạn Chưa Chọn Trạng
                                                Thái!</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Ngày sinh </Form.Label>
                                            <Form.Control required type="date" placeholder="Last name"
                                                          onChange={(e) => {
                                                              onChangeBirth(e)
                                                          }}
                                                          isInvalid={touchBirth && birth === '' || errors.birthday!==''}
                                                          isValid={birth !== ''}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.birthday!=='' ? errors.birthday : 'Bạn Chưa Chọn Ngày Sinh!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Giới Tính </Form.Label>
                                            <br/>
                                            <Form.Check onChange={(e) => {
                                                setGender(e.target.value)
                                            }} style={{marginLeft: "5px"}} inline label="Nam" type="radio" name="gender"
                                                        value="true" required/>
                                            <Form.Check onChange={(e) => {
                                                setGender(e.target.value)
                                            }} style={{marginLeft: "5px"}} inline label="Nữ" type="radio" name="gender"
                                                        value="false" required/>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Số điện thoại
                                            </Form.Label>
                                            <Form.Control required type="number" placeholder="Điền số điện thoại!"
                                                          onChange={(e) => {
                                                              onChangePhone(e)
                                                          }}
                                                          isInvalid={touchPhone && phone === '' || errors.phone!==''}
                                                          isValid={phone.length === 10}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.phone!=='' ? errors.phone : 'Bạn Chưa Điền Số Điện Thoại!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Quận/Huyện </Form.Label>
                                            <Form.Select required onChange={(e) => {
                                                onChangeProvice(e)
                                            }}
                                                         isInvalid={touchProvice && province === '' || errors.address_province!==''}
                                                         isValid={province !== ''}>
                                                <option value="">--Chọn Quận/Huyện--</option>
                                                <option value="1">One</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.address_province!=='' ? errors.address_province : 'Bạn Chưa Chọn Quận Huyện!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><span style={{color: "red"}}>*</span> Số nhà/Ngõ/Đường
                                            </Form.Label>
                                            <Form.Control required type="text" placeholder="Điền số nhà/ngõ/đường!"
                                                          onChange={(e) => {
                                                              onChangeAddress(e)
                                                          }}
                                                          isInvalid={touchAddress && address === '' || errors.address_detail!==''}
                                                          isValid={address.length > 0}/>
                                            <Form.Control.Feedback type={"invalid"}>
                                                {errors.address_detail!=='' ? errors.address_detail : 'Bạn Chưa Điền Số nhà/Ngõ/Đường!'}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div style={{display: "flex", justifyContent: "end",padding:"0 0 20px 0"}}>
                                    <Button style={{padding: "7px 30px"}} onClick={handleAddStaff}
                                            type="submit">Thêm</Button>
                                    <Button style={{
                                        backgroundColor: "#fff",
                                        color: "#444",
                                        border: "1px solid #444",
                                        padding: "7px 25px",
                                        marginLeft: "10px"
                                    }} onClick={handleAddStaff} type="submit">Hủy</Button>
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