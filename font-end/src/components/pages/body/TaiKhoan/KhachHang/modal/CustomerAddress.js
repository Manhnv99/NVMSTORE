import "../style/CustomerAddress.css"
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import LocationAPI from "../../../../../services/LocationAPI/LocationAPI";
import {useDispatch, useSelector} from "react-redux";
import CustomerAddressAPI from "../../../../../services/CustomerAPI/CustomerAddressAPI/CustomerAddressAPI";
import {toastMessage} from "../../../../../../redux/slices/ToastMsgSlice";
import Loading from "../../../../loading/Loading";


const CustomerAddress = (props) =>{
    //state list post put
    const [whatAction,setWhatAction] = useState("list");
    const [customer_address_id,setCustomer_address_id] = useState(undefined);
    const [show,setShow] = useState(true);
    //state List
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch();
    // const listCity=useSelector((state)=>state.geograph.listGeograph)
    const [listProvince,setListProvince]=useState([]);
    const [listDistrict,setListDistrict]=useState([]);
    const [listWard,setListWard]=useState([]);
    const [listCustomerAddress,setListCustomerAddress] = useState([]);
    //state Object
    const [customerAddressRequest,setCustomerAddressRequest] = useState({
        name:"",
        phone:"",
        address_province_code:"",
        address_district_code:"",
        address_ward_code:"",
        address_detail:""
    })
    // Touch
    const [touch,setTouch] = useState({
        name:false,
        phone:false,
        address_province_code:false,
        address_district_code:false,
        address_ward_code:false,
        address_detail:false
    })
    // Error
    const [errors,setErrors]=useState({
        name:undefined,
        phone:undefined,
        address_province_code:undefined,
        address_district_code:undefined,
        address_ward_code:undefined,
        address_detail:undefined
    })
    //toast Msg
    const toastSuccess = useSelector(state => state.toastmsg.toastSuccess)
    const toastWarning = useSelector(state => state.toastmsg.toastWarning)
    const toastError = useSelector(state => state.toastmsg.toastError)

    useEffect(() => {
        getListCustomerAddress();
        getAllProvinces();
    }, []);



    //get Location

    const getListCustomerAddress = async ()=>{
        try {
            const response = await CustomerAddressAPI.listCustomerAddressByCustomerId(props.customer_id)
            if(response && response.status === 200){
                setListCustomerAddress(response.data);
            }
        }catch (e){
            console.log(e);
        }
    }

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

    //handle function
    const handleClose=()=>{
        setShow(false);
        setTimeout(()=>{
            props.setOpenCustomerAddressModal(false);
        },[200])
    }

    const handleClearField=()=>{
        const fieldClear={
            name:"",
            phone:"",
            address_province_code:"",
            address_district_code:"",
            address_ward_code:"",
            address_detail:""
        }
        const touchClear={
            name:false,
            phone:false,
            address_province_code:false,
            address_district_code:false,
            address_ward_code:false,
            address_detail:false
        }
        const errorClear={
            name:undefined,
            phone:undefined,
            address_province_code:undefined,
            address_district_code:undefined,
            address_ward_code:undefined,
            address_detail:undefined
        }
        setCustomerAddressRequest(fieldClear);
        setTouch(touchClear);
        setErrors(errorClear);
    }

    const getCustomer_AddressById= async (customer_address_id)=>{
        try{
            const response = await CustomerAddressAPI.getCustomer_AddressById(customer_address_id);
            if(response && response.status === 200){
                const data = response.data;
                const newCustomerAddressRequest= {...customerAddressRequest};
                newCustomerAddressRequest.name=data.name;
                newCustomerAddressRequest.phone=data.phone;
                newCustomerAddressRequest.address_province_code=data.address_province_code;
                newCustomerAddressRequest.address_district_code=data.address_district_code;
                newCustomerAddressRequest.address_ward_code=data.address_ward_code;
                newCustomerAddressRequest.address_detail=data.address_detail;

                getAllDistrictsByProvince_code(data.address_province_code);
                getAllWardsByDistrict_code(data.address_district_code);
                setCustomerAddressRequest(newCustomerAddressRequest);
            }
        }catch (e) {
            console.log(e);
        }
    }

    const handlePostCustomerAddress= async ()=>{
        setLoading(true);
        const newCustomerAddressRequest ={...customerAddressRequest};
        newCustomerAddressRequest.customer_id = props.customer_id;
        try {
            const response = await CustomerAddressAPI.postCustomerAddress(newCustomerAddressRequest);
            if(response && response.status === 201){
                setWhatAction("list");

                getListCustomerAddress();

                handleClearField();

                const toastMsg = {...toastSuccess};
                toastMsg.message = "Thêm mới địa chỉ thành công!"
                dispatch(toastMessage(toastMsg));

                setLoading(false);
            }
        }catch (e) {
            setLoading(false)
            const errorCopy={...errors}
            const data=e.response.data;
            errorCopy.name=data.name;
            errorCopy.phone=data.phone;
            errorCopy.address_province_code=data.address_province_code;
            errorCopy.address_district_code=data.address_district_code;
            errorCopy.address_ward_code=data.address_ward_code;
            errorCopy.address_detail=data.address_detail;

            if(data.duplicate !== undefined){
                const toastMsg = {...toastWarning};
                toastMsg.message = data.duplicate;
                dispatch(toastMessage(toastMsg));
            }

            setErrors(errorCopy);
        }
    }

    const handlePutCustomerAddress= async ()=>{
        setLoading(true);
        const newCustomerAddressRequest ={...customerAddressRequest};
        newCustomerAddressRequest.id = customer_address_id;
        newCustomerAddressRequest.customer_id = props.customer_id;
        try {
            const response = await CustomerAddressAPI.putCustomerAddress(newCustomerAddressRequest);
            if(response && response.status === 200){
                setWhatAction("list");

                getListCustomerAddress();

                handleClearField();

                const toastMsg = {...toastSuccess};
                toastMsg.message = "Cập Nhật địa chỉ thành công!"
                dispatch(toastMessage(toastMsg));

                setLoading(false);
            }
        }catch (e) {
            setLoading(false)
            const errorCopy={...errors}
            const data=e.response.data;
            errorCopy.name=data.name;
            errorCopy.phone=data.phone;
            errorCopy.address_province_code=data.address_province_code;
            errorCopy.address_district_code=data.address_district_code;
            errorCopy.address_ward_code=data.address_ward_code;
            errorCopy.address_detail=data.address_detail;

            if(data.duplicate !== undefined){
                const toastMsg = {...toastWarning};
                toastMsg.message = data.duplicate;
                dispatch(toastMessage(toastMsg));
            }

            setErrors(errorCopy);
        }
    }

    const handlePutAddressDefault= async (customer_address_id)=>{
        setLoading(true);
        try {
            const response = await CustomerAddressAPI.putAddressDefault(customer_address_id,props.customer_id);
            if(response && response.status === 200){
                getListCustomerAddress();

                const toastMsg = {...toastSuccess};
                toastMsg.message = "Cập Nhật địa chỉ mặc định thành công!"
                dispatch(toastMessage(toastMsg));

                setLoading(false);
            }
        }catch (e){
            setLoading(false);
            console.log(e);
        }
    }

    //onChange

    const onChangeName=(e)=>{
        const newCustomerAddressRequest = {...customerAddressRequest};
        newCustomerAddressRequest.name = e.target.value;
        setCustomerAddressRequest(newCustomerAddressRequest);

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

    const onChangePhone=(e)=>{
        const newCustomerAddressRequest = {...customerAddressRequest};
        newCustomerAddressRequest.phone = e.target.value;
        setCustomerAddressRequest(newCustomerAddressRequest);

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

    const onChangeAddress_Province=(e)=>{
        //set List Districts and Wards
        if(e.target.value.length === 0){
            const newCustomerAddressRequest = {...customerAddressRequest};
            newCustomerAddressRequest.address_province_code = e.target.value;
            newCustomerAddressRequest.address_district_code="";
            newCustomerAddressRequest.address_ward_code="";

            setCustomerAddressRequest(newCustomerAddressRequest);
            setListDistrict([]);
            setListWard([]);
        }else{
            const newCustomerAddressRequest = {...customerAddressRequest};
            newCustomerAddressRequest.address_province_code = e.target.value;
            setCustomerAddressRequest(newCustomerAddressRequest);
            getAllDistrictsByProvince_code(e.target.value);
        }

        if(!touch.address_province_code){
            const newTouch = {...touch};
            newTouch.address_province_code = true;
            setTouch(newTouch);
        }

        if(errors.address_province_code !== undefined){
            const newError={...errors};
            newError.address_province_code = undefined;
            setErrors(newError);
        }

    }

    const onChangeAddress_District=(e)=>{
        if(e.target.value.length === 0){
            const newCustomerAddressRequest = {...customerAddressRequest};
            newCustomerAddressRequest.address_district_code = e.target.value;
            newCustomerAddressRequest.address_ward_code="";

            setCustomerAddressRequest(newCustomerAddressRequest);
            setListWard([]);
        }else{
            const newCustomerAddressRequest = {...customerAddressRequest};
            newCustomerAddressRequest.address_district_code = e.target.value;
            setCustomerAddressRequest(newCustomerAddressRequest);
            getAllWardsByDistrict_code(e.target.value);
        }

        if(!touch.address_district_code){
            const newTouch = {...touch};
            newTouch.address_district_code = true;
            setTouch(newTouch);
        }

        if(errors.address_district_code !== undefined){
            const newError={...errors};
            newError.address_district_code = undefined;
            setErrors(newError);
        }
    }

    const onChangeAddress_Ward=(e)=>{
        const newCustomerAddressRequest = {...customerAddressRequest};
        newCustomerAddressRequest.address_ward_code = e.target.value;
        setCustomerAddressRequest(newCustomerAddressRequest);

        if(!touch.address_ward_code){
            const newTouch = {...touch};
            newTouch.address_ward_code = true;
            setTouch(newTouch);
        }

        if(errors.address_ward_code !== undefined){
            const newError={...errors};
            newError.address_ward_code = undefined;
            setErrors(newError);
        }
    }

    const onChangeAddress_Detail=(e)=>{
        const newCustomerAddressRequest = {...customerAddressRequest};
        newCustomerAddressRequest.address_detail = e.target.value;
        setCustomerAddressRequest(newCustomerAddressRequest);

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



    return(
        <>
            {loading && <Loading/>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {whatAction === "post" ?
                        <span>Thêm địa chỉ</span> :
                        whatAction === "put" ?
                        <span>Cập nhật địa chỉ</span> :
                        <span>Danh sách địa chỉ</span>}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{display:"flex",justifyContent:"end"}}>
                        <button className="customerAddress-btn">
                            <i className="fa-solid fa-plus"></i>
                            {whatAction === "post" || whatAction === "put" ?
                                <span onClick={()=>{setWhatAction("list")}}>Danh sách địa chỉ</span> :
                                <span onClick={()=>{setWhatAction("post")}}>Thêm mới địa chỉ</span>}
                        </button>
                    </div>
                    {whatAction === "post" || whatAction === "put" ?
                        <Col sm={12}>
                            <Form.Group className="mb-2">
                                <Form.Label><span style={{color: "red"}}>*</span> Tên người nhận</Form.Label>
                                <Form.Control value={customerAddressRequest.name} onChange={onChangeName} required
                                              isInvalid={touch.name && customerAddressRequest.name === "" || errors.name !== undefined}
                                              isValid={customerAddressRequest.name !== ''} type="text"
                                              placeholder="Điền tên người nhận!"/>
                                <Form.Control.Feedback type={"invalid"}>
                                    {errors.name !== undefined ? errors.name : "Bạn Chưa Điền Tên Người Nhận!"}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label><span style={{color: "red"}}>*</span> Số điện thoại người nhận</Form.Label>
                                <Form.Control value={customerAddressRequest.phone} onChange={onChangePhone} required
                                              isInvalid={touch.phone && customerAddressRequest.phone === "" || errors.phone !== undefined}
                                              isValid={customerAddressRequest.phone !== ''} type="text"
                                              placeholder="Điền số điện thoại người nhận!"/>
                                <Form.Control.Feedback type={"invalid"}>
                                    {errors.phone !== undefined ? errors.phone : "Bạn Chưa Điền Số Điện Thoại Người Nhận!"}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label><span style={{color: "red"}}>*</span> Tỉnh/Thành Phố</Form.Label>
                                <Form.Select value={customerAddressRequest.address_province_code}
                                             onChange={onChangeAddress_Province}
                                             isInvalid={touch.address_province_code && customerAddressRequest.address_province_code === "" || errors.address_province_code !== undefined}
                                             isValid={customerAddressRequest.address_province_code !== ''}>
                                    <option>--Chọn Tỉnh/Thành Phố--</option>
                                    {listProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.code}>{item.full_Name}</option>
                                        )
                                    })}
                                </Form.Select>
                                <Form.Control.Feedback type={"invalid"}>
                                    {errors.address_province_code !== undefined ? errors.address_province_code : "Bạn Chưa Chọn Tỉnh Thành Phố!"}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label><span style={{color: "red"}}>*</span> Quận/Huyện</Form.Label>
                                <Form.Select value={customerAddressRequest.address_district_code}
                                             onChange={onChangeAddress_District}
                                             isInvalid={touch.address_district_code && customerAddressRequest.address_district_code === "" || errors.address_district_code !== undefined}
                                             isValid={customerAddressRequest.address_district_code !== ''}>
                                    <option>--Chọn Quận/Huyện--</option>
                                    {listDistrict.map((item, index) => {
                                        return (
                                            <option key={index} value={item.code}>{item.full_Name}</option>
                                        )
                                    })}
                                </Form.Select>
                                <Form.Control.Feedback type={"invalid"}>
                                    {errors.address_district_code !== undefined ? errors.address_district_code : "Bạn Chưa Chọn Tỉnh Thành Phố!"}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label><span style={{color: "red"}}>*</span> Xã/Phường</Form.Label>
                                <Form.Select value={customerAddressRequest.address_ward_code} onChange={onChangeAddress_Ward}
                                             isInvalid={touch.address_ward_code && customerAddressRequest.address_ward_code === "" || errors.address_ward_code !== undefined}
                                             isValid={customerAddressRequest.address_ward_code !== ''}>
                                    <option>--Chọn Xã/Phường--</option>
                                    {listWard.map((item, index) => {
                                        return (
                                            <option key={index} value={item.code}>{item.full_Name}</option>
                                        )
                                    })}
                                </Form.Select>
                                <Form.Control.Feedback type={"invalid"}>
                                    {errors.address_ward_code !== undefined ? errors.address_ward_code : "Bạn Chưa Chọn Tỉnh Thành Phố!"}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label><span style={{color: "red"}}>*</span> Số nhà/Ngõ/Phường</Form.Label>
                                <Form.Control value={customerAddressRequest.address_detail}
                                              onChange={onChangeAddress_Detail} required
                                              isInvalid={touch.address_detail && customerAddressRequest.address_detail === "" || errors.address_detail !== undefined}
                                              isValid={customerAddressRequest.address_detail !== ''} type="text"
                                              placeholder="Điền số nhà/ngõ/phường!"/>
                                <Form.Control.Feedback type={"invalid"}>
                                    {errors.address_detail !== undefined ? errors.address_detail : "Bạn Chưa Điền Số nhà/Ngõ/Đường!"}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col> :
                        // list
                        <div style={{marginTop:"10px"}}>
                            <Container>
                                {listCustomerAddress.length >0 && listCustomerAddress.map((item,index)=>{
                                    if(item.address_default){
                                        return(
                                            <Row style={{padding:"20px 0",borderTop:"2px solid #999"}}>
                                                <Col sm={1}>
                                                    <input type="radio" name="list_address" checked/>
                                                </Col>
                                                <Col sm={8}>
                                                    <div>
                                                        <span style={{fontWeight:"600",fontSize:"15px"}}>{item.name}</span>
                                                        <span> | </span>
                                                        <span style={{fontSize:"14px"}}>{item.phone}</span>
                                                    </div>
                                                    <div style={{fontSize:"14px"}}>
                                                        <span>{item.address_detail},</span>
                                                        <span>{item.address_ward_code},</span>
                                                        <span>{item.address_district_code},</span>
                                                        <span>{item.address_province_code}.</span>
                                                    </div>
                                                    <div style={{marginTop:"5px"}}>
                                                        <span style={{border:"1px solid orange", color:"#da601a",fontSize:"14px"
                                                            ,padding:"4px 5px",cursor:"default"}}>Mặc định</span>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="text-center">
                                                        <button onClick={()=>{setWhatAction("put");setCustomer_address_id(item.id);getCustomer_AddressById(item.id)}} className="list_address-update-btn">Cập nhật</button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                    }else{
                                        return (
                                            <Row style={{padding:"20px 0",borderTop:"2px solid #999"}}>
                                                <Col sm={1}>
                                                    <input onClick={()=>{handlePutAddressDefault(item.id)}} type="radio" name="list_address"/>
                                                </Col>
                                                <Col sm={8}>
                                                    <div>
                                                        <span style={{fontWeight:"600",fontSize:"15px"}}>{item.name}</span>
                                                        <span> | </span>
                                                        <span style={{fontSize:"14px"}}>{item.phone}</span>
                                                    </div>
                                                    <div style={{fontSize:"14px"}}>
                                                        <span>{item.address_detail},</span>
                                                        <span>{item.address_ward_code},</span>
                                                        <span>{item.address_district_code},</span>
                                                        <span>{item.address_province_code}.</span>
                                                    </div>
                                                </Col>
                                                <Col sm={3}>
                                                    <div className="text-center">
                                                        <button onClick={()=>{setWhatAction("put");setCustomer_address_id(item.id);getCustomer_AddressById(item.id)}} className="list_address-update-btn">Cập nhật</button>
                                                    </div>
                                                </Col>
                                            </Row>
                                        )
                                    }
                                })}
                            </Container>

                        </div>

                        }
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} >Hủy</Button>
                {whatAction === "post" ?
                    <Button onClick={handlePostCustomerAddress} variant="primary" >Thêm</Button> :
                whatAction === "put" ?
                    <Button onClick={handlePutCustomerAddress} variant="primary" >Cập nhật</Button> :
                whatAction === "list" ?
                    <Button onClick={handleClose} variant="primary" >OK</Button> : ""}

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CustomerAddress