import "./ProductImageDetail.css"
import {Button, Col, Form, Row} from "react-bootstrap";
import {memo, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import brandAPI from "../../../../services/BrandAPI/BrandAPI";
import {setListBrand} from "../../../../../redux/slices/BrandSlice";
import materialAPI from "../../../../services/MaterialAPI/MaterialAPI";
import {setListMaterial} from "../../../../../redux/slices/MaterialSlice";
import soleAPI from "../../../../services/SoleAPI/SoleAPI";
import {setListSole} from "../../../../../redux/slices/SoleSlice";
import categoryAPI from "../../../../services/CategoryAPI/CategoryAPI";
import {setListCategory} from "../../../../../redux/slices/CategorySlice";
import {getAllGender} from "../../../../../redux/slices/GenderSlice";
import {getAllStatusProductDetail} from "../../../../../redux/slices/StatusProductDetailSlice";
import ModalEntity from "../ModalEntity";
import ModalSize_PID from "./modal/ModalSize_PID";
import {getAllSize} from "../../../../../redux/slices/SizeSlice";
import {getAllColor} from "../../../../../redux/slices/ColorSlice";
import ModalColor_PID from "./modal/ModalColor_PID";
import ImageProductAPI from "../../../../services/ProductAPI/Image_Product_API/ImageProductAPI";
import productDetailAPI from "../../../../services/ProductAPI/Product_Detail_API/ProductDetailAPI";
import {getAllProductDetailByProduct_id} from "../../../../../redux/slices/product/ProductDetailSlice";
import {toastMessage} from "../../../../../redux/slices/ToastMsgSlice";
import Loading from "../../../loading/Loading";
import Confirm from "../../../../utils/Confirm";
import imageProductAPI from "../../../../services/ProductAPI/Image_Product_API/ImageProductAPI";
import axios from "axios";


const ProductImageDetail=(props)=>{
    // dispatch
    const dispatch=useDispatch();
    //toastMSG
    const toastError=useSelector(state => state.toastmsg.toastError);
    const toastWarning=useSelector(state => state.toastmsg.toastWarning);
    //state entity
    const [whatEntity,setWhatEntity]=useState(undefined);
    const [openModalEntity,setOpenModalEntity]=useState(false);
    const [openModalColor,setOpenModalColor]=useState(false);
    const [openModalSize,setOpenModalSize]=useState(false);
    //state
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [brand_name,setBrand_name]=useState('');
    const [material_name,setMaterial_name]=useState('');
    const [gender_name,setGender_name]=useState('');
    const [color_name,setColor_name]=useState('');
    const [status_name,setStatus_name]=useState('');
    const [sole_name,setSole_name]=useState('');
    const [category_name,setCategory_name]=useState('');
    const [size_name,setSize_name]=useState('');
    const [quantity,setQuantity]=useState('');
    const [sell_price,setSell_Price]=useState('');
    const [imageUrl,setImageUrl]=useState([]);
    //loading
    const [loading,setLoading]=useState(false);
    //openConfirm
    const [openConfirm,setOpenConfirm]=useState(false);
    const [whatActionConfirm,setWhatActionConfirm]=useState(false);
    const [message,setMessage]=useState("");

    const [idImageProductDetail,setIdImageProductDetail]=useState(undefined);
    const [image_id,setImage_Id]=useState(undefined);

    //list state to map
    const listBrand=useSelector(state => state.brand.listBrand);
    const listMaterial=useSelector(state => state.material.listMaterial);
    const listSole=useSelector(state => state.sole.listSole);
    const listCategory=useSelector(state => state.category.listCategory);
    const listGender=useSelector(state => state.gender.listGender);
    const listStatusProductDetail=useSelector(state => state.status_product_detail.listStatusProductDetail);
    const listColor=useSelector(state => state.color.listColor);
    const listSize=useSelector(state => state.size.listSize);
    const [listImage,setListImage]=useState([]);
    //touch
    const [touchDescription,setTouchDescription]=useState(false);
    const [touchBrand_name,setTouchBrand_name]=useState(false);
    const [touchMaterial_name,setTouchMaterial_name]=useState(false);
    const [touchGender_name,setTouchGender_name]=useState(false);
    const [touchColor_name,setTouchColor_name]=useState(false);
    const [touchQuantity,setTouchQuantity]=useState(false);
    const [touchStatus_name,setTouchStatus_name]=useState(false);
    const [touchSole_name,setTouchSole_name]=useState(false);
    const [touchCategory_name,setTouchCategory_name]=useState(false);
    const [touchSize_name,setTouchSize_name]=useState(false);
    const [touchSell_Price,setTouchSell_Price]=useState(false);
    //errors
    const [errors,setErrors]=useState({
        description:undefined,
        brand_name:undefined,
        material_name:undefined,
        gender_name:undefined,
        color_name:undefined,
        quantity:undefined,
        status_name:undefined,
        sole_name:undefined,
        category_name:undefined,
        size_name:undefined,
        sell_price:undefined,
    });


    useEffect( () => {
        CallAPIGetAll();
    }, []);
    const CallAPIGetAll=async ()=>{
        await getQRCodeImage();
        await getAllBrand();
        await getAllMaterial();
        await getAllSole();
        await getAllCategory();
        await getAllImage();
        await dispatch(getAllSize());
        await dispatch(getAllColor());
        await dispatch(getAllGender());
        await dispatch(getAllStatusProductDetail());
        await fillInput();
    }

    const getQRCodeImage= async ()=>{
        const response= await ImageProductAPI.getQRCodeImage(props.id_product_detail);
        setImageUrl(response.data);
    }

    const getAllImage= async ()=>{
        const response= await ImageProductAPI.getAllImageById(props.id_product_detail);
        setListImage(response.data)
    }

    const getAllBrand = async ()=>{
        const res=await brandAPI.getAll();
        dispatch(setListBrand(res.data));
    }
    const getAllMaterial = async ()=>{
        const res=await materialAPI.getAll();
        dispatch(setListMaterial(res.data));
    }
    const getAllSole = async ()=>{
        const res=await soleAPI.getAll();
        dispatch(setListSole(res.data));
    }
    const getAllCategory= async ()=>{
        const res=await categoryAPI.getAll();
        dispatch(setListCategory(res.data));
    }



    //onChange

    const onChangeDescription=(e)=>{
        setDescription(e.target.value);
        const errorCopy={...errors};
        errorCopy.description=undefined;
        setErrors(errorCopy);
        if(!touchDescription){
            setTouchDescription(true);
        }
    }

    const onChangeBrand=(e)=>{
        setBrand_name(e.target.value);
        const errorCopy={...errors};
        errorCopy.brand_id=undefined;
        setErrors(errorCopy);
        if(!touchBrand_name){
            setTouchBrand_name(true);
        }
    }

    const onChangeMaterial=(e)=>{
        setMaterial_name(e.target.value);
        const errorCopy={...errors};
        errorCopy.material_id=undefined;
        setErrors(errorCopy);
        if(!touchMaterial_name){
            setTouchMaterial_name(true);
        }
    }
    const onChangeGender=(e)=>{
        setGender_name(e.target.value);
        const errorCopy={...errors};
        errorCopy.gender_id=undefined;
        setErrors(errorCopy);
        if(!touchGender_name){
            setTouchGender_name(true);
        }
    }

    const onChangeColor=(e)=>{
        setColor_name(e.target.value);
        const errorCopy={...errors};
        errorCopy.color_id=undefined;
        setErrors(errorCopy);
        if(!touchColor_name){
            setTouchColor_name(true);
        }
    }

    const onChangeQuantity=(e)=>{
        setQuantity(e.target.value);
        const errorCopy={...errors};
        errorCopy.quantity=undefined;
        setErrors(errorCopy);
        if(!touchQuantity){
            setTouchQuantity(true);
        }
    }

    const onChangeStatus=(e)=>{
        setStatus_name(e.target.value);
        const errorCopy={...errors};
        errorCopy.status_id=undefined;
        setErrors(errorCopy);
        if(!touchStatus_name){
            setTouchStatus_name(true);
        }
    }

    const onChangeSole=(e)=>{
        setSole_name(e.target.value);
        const errorCopy={...errors};
        errorCopy.sole_id=undefined;
        setErrors(errorCopy);
        if(!touchSole_name){
            setTouchSole_name(true);
        }
    }
    const onChangeCategory=(e)=>{
        setCategory_name(e.target.value);
        const errorCopy={...errors};
        errorCopy.category_id=undefined;
        setErrors(errorCopy);
        if(!touchCategory_name){
            setTouchCategory_name(true);
        }
    }

    const onChangeSize=(e)=>{
        setSize_name(e.target.value);
        const errorCopy={...errors};
        errorCopy.size_id=undefined;
        setErrors(errorCopy);
        if(!touchSize_name){
            setTouchSize_name(true);
        }
    }

    const onChangeSell_Price=(e)=>{
        setSell_Price(e.target.value);
        const errorCopy={...errors};
        errorCopy.sell_price=undefined;
        setErrors(errorCopy);
        if(!touchSell_Price){
            setTouchSell_Price(true);
        }
    }

    //handle Open
    const handleOpenBrandModal=()=>{
        setWhatEntity('brand')
        setOpenModalEntity(true)
    }
    const handleOpenMaterialModal=()=>{
        setWhatEntity('material')
        setOpenModalEntity(true)
    }
    const handleOpenSoleModal=()=>{
        setWhatEntity('sole')
        setOpenModalEntity(true)
    }
    const handleOpenCategoryModal=()=>{
        setWhatEntity('category')
        setOpenModalEntity(true)
    }
    const handleOpenGenderModal=()=>{
        setWhatEntity('gender')
        setOpenModalEntity(true)
    }

    const handleOpenStatusProductDetailModal=()=>{
        setWhatEntity('status_product_detail')
        setOpenModalEntity(true)
    }
    //handle
    const handleOpenFileUpLoad=()=>{
        document.querySelector(".input_upload").click();
    }

    const handleClose=()=>{
        const pid_content=document.querySelector('.pid_content');
        const pid_modal=document.querySelector('.pid_modal');
        pid_content.style.animation="unShowModal 0.3s ease-in-out";
        setTimeout(()=>{
            props.setOpenModalPid(false);
            pid_modal.style.display="none";
        },280)
    }

    const fillInput= async ()=>{
        const response = await ImageProductAPI.getProductDetailImage(props.id_product_detail);
        const data=response.data;
        console.log(data);
        //setValue
        setName(data.product_name);
        setDescription(data.product_description);
        setBrand_name(data.product_detail_brand_name);
        setMaterial_name(data.product_detail_material_name);
        setGender_name(data.product_detail_gender_name);
        setColor_name(data.product_detail_color_name);
        setStatus_name(data.product_detail_status_name);
        setSole_name(data.product_detail_sole_name);
        setCategory_name(data.product_detail_category_name);
        setSize_name(data.product_detail_size_name);
        setSell_Price(data.product_detail_sell_price);
        setQuantity(data.product_detail_quantity);
    }

    const handleUpdateProductDetail= async ()=>{
        const updateProductDetailRequest={
            product_detail_id:props.id_product_detail,
            description:description,
            quantity:quantity,
            sell_price:sell_price,
            brand_name:brand_name,
            material_name:material_name,
            gender_name:gender_name,
            color_name:color_name,
            status_name:status_name,
            sole_name:sole_name,
            category_name:category_name,
            size_name:size_name
        };
        try {
            setLoading(true)
            const response= await productDetailAPI.updateProductDetail(updateProductDetailRequest);
            if(response && response.status===200){
                const param={
                    product_id:props.product_id,
                    page:1
                }
                dispatch(getAllProductDetailByProduct_id(param));
                setLoading(false);
                handleClose();
            }
        }catch (e) {
            setLoading(false)
            const errorResponse=e.response.data;
            const errorCopy={...errors}
            errorCopy.description=errorResponse.description;
            errorCopy.brand_id=errorResponse.brand_id;
            errorCopy.category_id=errorResponse.category_id;
            errorCopy.color_id=errorResponse.color_id;
            errorCopy.gender_id=errorResponse.gender_id;
            errorCopy.material_id=errorResponse.material_id;
            errorCopy.quantity=errorResponse.quantity;
            errorCopy.sell_price=errorResponse.sell_price;
            errorCopy.size_id=errorResponse.size_id;
            errorCopy.sole_id=errorResponse.sole_id;
            errorCopy.status_id=errorResponse.status_id;
            setErrors(errorCopy);
            if(errorResponse.toastMsg!==undefined){
                const toastMsg={...toastError}
                toastMsg.message=errorResponse.toastMsg
                dispatch(toastMessage(toastMsg));
            }
        }
    }

    const handleOpenConfirmUpdateProductDetail=()=>{
        setOpenConfirm(true);
        setWhatActionConfirm("updateProductDetail");
        setMessage("Bạn có chắc muốn sửa sản phẩm này!");
    }

    const handleOpenConfirmDeleteImageProductDetail=(image_product_id,image_id)=>{
        setIdImageProductDetail(image_product_id);
        setImage_Id(image_id);
        setOpenConfirm(true);
        setWhatActionConfirm("deleteImageProductDetail");
        setMessage("Bạn có chắc muốn xóa ảnh này!");
    }
    const handleRemoveImageProductDetail= async ()=>{
        setLoading(true);
        try {
            const response = await imageProductAPI.removeImageProduct(idImageProductDetail,image_id);
            if(response && response.status===200){
                setLoading(false);
                await getAllImage();
            }
        }catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    const handleAddImageProductDetail= async (e)=>{
        const files=e.target.files;
        if(listImage.length+files.length>12){
            const toastMsg={...toastWarning}
            toastMsg.message="Không Thể Thêm Quá 12 Ảnh!";
            dispatch(toastMessage(toastMsg));
        }else{
            if(files.length>0){
                setLoading(true);
                const CLOUD_NAME="dbxajsljz";
                const PRESET_NAME="nvmstore";
                const FOLDER_NAME="nvmstoreimage";
                const API=`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
                const formData=new FormData();
                formData.append("upload_preset",PRESET_NAME);
                formData.append("folder",FOLDER_NAME);
                for(const file of files){
                    formData.append("file",file);
                    axios.post(API,formData,{
                        headers:{
                            "Content-Type":"multipart/form-data",
                        }
                    }).then(response=>{
                        let imageProductRequest={
                            product_detail_id:props.id_product_detail,
                            image_id:response.data.public_id,
                            image_url:response.data.url
                        }
                        //add Image Product
                        addImageProduct(imageProductRequest);
                    }).catch(e=>{
                        setLoading(false);
                        console.log(e);
                    })
                }
                if(files.length<=3){
                    setTimeout(async ()=>{
                        await getAllImage();
                        setLoading(false);
                    },2000)
                }else if(files.length>3 && files.length <7){
                    setTimeout(async ()=>{
                        await getAllImage();
                        setLoading(false);
                    },4000)
                }else if(files.length>7){
                    setTimeout(async ()=>{
                        await getAllImage();
                        setLoading(false);
                    },6000)
                }
            }
        }
    }

    const addImageProduct=async (imageProductRequest)=>{
        try{
            await ImageProductAPI.addImageProduct(imageProductRequest)
        }catch (e) {
            setLoading(false)
            console.log(e)
        }
    }


    return(
        <>
            {openConfirm && <Confirm whatActionConfirm={whatActionConfirm}
                                     setOpenConfirm={setOpenConfirm}
                                     handleRemoveImageProductDetail={handleRemoveImageProductDetail}
                                     handleUpdateProductDetail={handleUpdateProductDetail}
                                     message={message}/>}
            {loading && <Loading/>}
            {openModalColor && <ModalColor_PID setOpenModalColor={setOpenModalColor}/>}
            {openModalSize && <ModalSize_PID setOpenModalSize={setOpenModalSize}/>}
            {openModalEntity && <ModalEntity setOpenModalEntity={setOpenModalEntity} whatEntity={whatEntity}/>}
            <div className="pid_modal">
                <div className="pid_container">
                    <div className="pid_content">
                        <div className="pid_header">
                            <div style={{display:"flex",width:"60%",justifyContent:"end"}}>
                                <h1>Thông Tin Sản Phẩm</h1>
                            </div>
                            <div style={{display:"flex",width:"40%",justifyContent:"end"}}>
                                <span><i onClick={handleClose} className="fa-solid fa-x"></i></span>
                            </div>
                        </div>
                        <div className="pid_body">
                            <Row>
                                <Col lg={12}>
                                    <Form.Group >
                                        <div style={{ display: 'flex', alignItems: 'start' }}>
                                            <Form.Label style={{width:"140px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Tên sản phẩm:</Form.Label>
                                            <Form.Control value={name} type="text" placeholder="Nhập tên sản phẩm!" disabled/>
                                        </div>
                                    </Form.Group>
                                </Col>
                                {/*Mô Tả*/}
                                <Col lg={12} style={{marginTop:"20px"}}>
                                    <Form.Group>
                                        <div style={{ display: 'flex', alignItems: 'start' }}>
                                            <Form.Label style={{width:"130px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Mô tả:</Form.Label>
                                            <textarea value={description} onChange={onChangeDescription} style={{width:"100%",height:"100px",border:"1px solid #999",borderRadius:"5px",outline:"none",padding:"5px 10px 10px 10px"}}></textarea>
                                        </div>
                                        {touchDescription && description === '' ?
                                            <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>Bạn Chưa Điền Mô Tả!</span> :
                                            errors.description !== undefined ?
                                                <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>{errors.description}</span>:''
                                        }
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{marginTop:"20px"}}>
                                <Col lg={6}>
                                    {/**/}
                                    <Form.Group>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Thương hiệu:</Form.Label>
                                            <Form.Select value={brand_name} onChange={onChangeBrand} style={{width:"50%"}} required
                                                         isValid={brand_name!==''}
                                                         isInvalid={touchBrand_name && brand_name==='' || errors.brand_name!==undefined}>
                                                <option value="">--Chọn thương hiệu--</option>
                                                {listBrand.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option key={index} value={item.name}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenBrandModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchBrand_name && brand_name === '' ?
                                            <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>Bạn Chưa Chọn Thương Hiệu!</span> :
                                            errors.brand_name !== undefined ?
                                                <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>{errors.brand_name}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Chất liệu:</Form.Label>
                                            <Form.Select value={material_name} onChange={onChangeMaterial} style={{width:"50%"}} required
                                                         isValid={material_name!==''}
                                                         isInvalid={touchMaterial_name && material_name==='' || errors.material_name!==undefined}>
                                                <option value="">--Chọn chất liệu--</option>
                                                {listMaterial.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option key={index} value={item.name}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenMaterialModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchMaterial_name && material_name === '' ?
                                            <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>Bạn Chưa Chọn Chất Liệu!</span> :
                                            errors.material_name !== undefined ?
                                                <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>{errors.material_name}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Giới tính:</Form.Label>
                                            <Form.Select value={gender_name} onChange={onChangeGender} style={{width:"50%"}} required
                                                         isValid={gender_name!==''}
                                                         isInvalid={touchGender_name && gender_name==='' || errors.gender_name!==undefined}>
                                                <option value="">--Chọn giới tính--</option>
                                                {listGender.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option key={index} value={item.name}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenGenderModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchGender_name && gender_name==='' ?
                                            <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>Bạn Chưa Chọn Giới Tính!</span>:
                                            errors.gender_name!==undefined ?
                                                <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>{errors.gender_name}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Màu Sắc:</Form.Label>
                                            <Form.Select value={color_name} onChange={onChangeColor} style={{width:"50%"}} required
                                                         isValid={color_name!==''}
                                                         isInvalid={touchColor_name && color_name==='' || errors.color_name!==undefined}>
                                                <option value="">--Chọn màu sắc--</option>
                                                {listColor.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option key={index} value={item.name}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={()=>{setOpenModalColor(true)}} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchColor_name && color_name==='' ?
                                            <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>Bạn Chưa Chọn Màu Sắc!</span>:
                                            errors.color_name!==undefined ?
                                                <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>{errors.color_name}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Số Lượng:</Form.Label>
                                            <Form.Control value={quantity} onChange={onChangeQuantity} style={{width:"50%"}} required type="number" placeholder="Nhập số lượng đang bán!"
                                                          isValid={quantity!=="" && quantity>0 && quantity<=10000000}
                                                          isInvalid={touchQuantity && quantity==='' || errors.quantity!==undefined}/>
                                        </div>
                                        {touchQuantity && quantity==='' ?
                                            <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>Bạn Chưa Điền Số Lượng Đang Bán!</span>:
                                            errors.quantity!==undefined ?
                                                <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>{errors.quantity}</span>:''
                                        }
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    {/**/}
                                    <Form.Group>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Trạng thái:</Form.Label>
                                            <Form.Select value={status_name} onChange={onChangeStatus} style={{width:"50%"}} required
                                                         isValid={status_name!==''}
                                                         isInvalid={touchStatus_name && status_name==='' || errors.status_name!==undefined}>
                                                <option value="">--Chọn trạng thái--</option>
                                                {listStatusProductDetail.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option key={index} value={item.name}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenStatusProductDetailModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchStatus_name && status_name===''?
                                            <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>Bạn Chưa Chọn Trạng Thái!</span>:
                                            errors.status_name!==undefined ?
                                                <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>{errors.status_name}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Đế giày:</Form.Label>
                                            <Form.Select value={sole_name} onChange={onChangeSole} style={{width:"50%"}} required
                                                         isValid={sole_name!==''}
                                                         isInvalid={touchSole_name && sole_name==='' || errors.sole_name!==undefined}>
                                                <option value="">--Chọn đế giày--</option>
                                                {listSole.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option className="sole_DOC" key={index} value={item.name}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenSoleModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchSole_name && sole_name===''?
                                            <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>Bạn Chưa Chọn Đế Giày!</span>:
                                            errors.sole_name!==undefined ?
                                                <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>{errors.sole_name}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Thể loại:</Form.Label>
                                            <Form.Select value={category_name} onChange={onChangeCategory} style={{width:"50%"}} required
                                                         isValid={category_name!==''}
                                                         isInvalid={touchCategory_name && category_name==='' || errors.category_name!==undefined}>
                                                <option value="">--Chọn thể loại--</option>
                                                {listCategory.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option className="category_DOC" key={index} value={item.name}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenCategoryModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchCategory_name && category_name === '' ?
                                            <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>Bạn Chưa Chọn Thể Loại!</span> :
                                            errors.category_name !== undefined ?
                                                <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>{errors.category_name}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Kích Cỡ:</Form.Label>
                                            <Form.Select value={size_name} onChange={onChangeSize} style={{width:"50%"}} required
                                                         isValid={size_name!==''}
                                                         isInvalid={touchSize_name && size_name==='' || errors.size_name!==undefined}>
                                                <option value="">--Chọn kích cỡ--</option>
                                                {listSize.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option key={index} value={item.name}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={()=>{setOpenModalSize(true)}} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchSize_name && size_name==='' ?
                                            <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>Bạn Chưa Chọn Kích Cỡ!</span>:
                                            errors.size_name!==undefined ?
                                                <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>{errors.size_name}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Giá Bán:</Form.Label>
                                            <Form.Control value={sell_price} onChange={onChangeSell_Price} style={{width:"50%"}} required type="number" placeholder="Nhập giá bán!"
                                                          isValid={sell_price!=="" && sell_price>0 && sell_price<=1000000000}
                                                          isInvalid={touchSell_Price && sell_price==='' || errors.sell_price!==undefined}/>
                                        </div>
                                        {touchSell_Price && sell_price==='' ?
                                            <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>Bạn Chưa Điền Giá Bán!</span>:
                                            errors.sell_price!==undefined ?
                                                <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>{errors.sell_price}</span>:''
                                        }
                                    </Form.Group>
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'start' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> QRCode:</Form.Label>
                                            <img style={{width:"200px",height:"200px"}} src={imageUrl} alt=""/>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{margin:"40px 0 20px 0"}}>
                                <input onChange={handleAddImageProductDetail} className="input_upload" type="file" multiple style={{display:"none"}}/>
                                <div className="pid-list_image">
                                    <h1>Ảnh Sản Phẩm</h1>
                                </div>
                                {listImage.map(image=>(
                                    <Col sm={1}>
                                        <div className="pid_image_container">
                                            <img className="pid_list_image" src={image.imageURL} alt=""/>
                                            <div className="pid_coating">
                                                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
                                                    <i onClick={()=>{handleOpenConfirmDeleteImageProductDetail(image.image_Product_id,image.image_id)}} style={{cursor:"pointer"}} className="fa-solid fa-trash"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                                <Col sm={1}>
                                    {listImage.length<12 ?
                                        <div onClick={handleOpenFileUpLoad} className="pid_upload">
                                            <div style={{textAlign: "center"}}>
                                                <i className="fa-solid fa-plus"></i>
                                                <p>Upload</p>
                                            </div>
                                        </div> : <></>
                                    }
                                </Col>
                            </Row>
                        </div>
                        <div className="pid_footer">
                            <button onClick={handleClose} className="pid_cancel">Hủy</button>
                            <button onClick={handleOpenConfirmUpdateProductDetail} className="pid_edit">Chỉnh Sửa</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(ProductImageDetail)