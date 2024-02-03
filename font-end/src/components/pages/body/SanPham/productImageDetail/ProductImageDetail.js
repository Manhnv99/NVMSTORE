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


const ProductImageDetail=(props)=>{
    // dispatch
    const dispatch=useDispatch();
    //state entity
    const [whatEntity,setWhatEntity]=useState(undefined);
    const [openModalEntity,setOpenModalEntity]=useState(false);
    const [openModalColor,setOpenModalColor]=useState(false);
    const [openModalSize,setOpenModalSize]=useState(false);
    //state
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [brand_id,setBrand_id]=useState('');
    const [material_id,setMaterial_id]=useState('');
    const [gender_id,setGender_id]=useState('');
    const [color_id,setColor_id]=useState('');
    const [status_id,setStatus_id]=useState('');
    const [sole_id,setSole_id]=useState('');
    const [category_id,setCategory_id]=useState('');
    const [size_id,setSize_id]=useState('');
    const [quantity,setQuantity]=useState('');
    const [sell_price,setSell_Price]=useState('');
    const [imageUrl,setImageUrl]=useState(undefined);
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
    const [touchName,setTouchName]=useState(false);
    const [touchDescription,setTouchDescription]=useState(false);
    const [touchBrand_id,setTouchBrand_id]=useState(false);
    const [touchMaterial_id,setTouchMaterial_id]=useState(false);
    const [touchGender_id,setTouchGender_id]=useState(false);
    const [touchColor_id,setTouchColor_id]=useState(false);
    const [touchQuantity,setTouchQuantity]=useState(false);
    const [touchStatus_id,setTouchStatus_id]=useState(false);
    const [touchSole_id,setTouchSole_id]=useState(false);
    const [touchCategory_id,setTouchCategory_id]=useState(false);
    const [touchSize_id,setTouchSize_id]=useState(false);
    const [touchSell_Price,setTouchSell_Price]=useState(false);
    //errors
    const [errors,setErrors]=useState({
        name:undefined,
        description:undefined,
        brand_id:undefined,
        material_id:undefined,
        gender_id:undefined,
        color_id:undefined,
        quantity:undefined,
        status_id:undefined,
        sole_id:undefined,
        category_id:undefined,
        size_id:undefined,
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
        console.log(response.data)
    }

    const getAllImage= async ()=>{
        const response= await ImageProductAPI.getAllImage(props.id_product_detail);
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
    const onChangeName=(e)=>{
        setName(e.target.value);
        const errorCopy={...errors};
        errorCopy.name=undefined;
        setErrors(errorCopy);
        if(!touchName){
            setTouchName(true);
        }
    }

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
        setBrand_id(e.target.value);
        const errorCopy={...errors};
        errorCopy.brand_id=undefined;
        setErrors(errorCopy);
        if(!touchBrand_id){
            setTouchBrand_id(true);
        }
    }

    const onChangeMaterial=(e)=>{
        setMaterial_id(e.target.value);
        const errorCopy={...errors};
        errorCopy.material_id=undefined;
        setErrors(errorCopy);
        if(!touchMaterial_id){
            setTouchMaterial_id(true);
        }
    }
    const onChangeGender=(e)=>{
        setGender_id(e.target.value);
        const errorCopy={...errors};
        errorCopy.gender_id=undefined;
        setErrors(errorCopy);
        if(!touchGender_id){
            setTouchGender_id(true);
        }
    }

    const onChangeColor=(e)=>{
        setColor_id(e.target.value);
        const errorCopy={...errors};
        errorCopy.color_id=undefined;
        setErrors(errorCopy);
        if(!touchColor_id){
            setTouchColor_id(true);
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
        setStatus_id(e.target.value);
        const errorCopy={...errors};
        errorCopy.status_id=undefined;
        setErrors(errorCopy);
        if(!touchStatus_id){
            setTouchStatus_id(true);
        }
    }

    const onChangeSole=(e)=>{
        setSole_id(e.target.value);
        const errorCopy={...errors};
        errorCopy.sole_id=undefined;
        setErrors(errorCopy);
        if(!touchSole_id){
            setTouchSole_id(true);
        }
    }
    const onChangeCategory=(e)=>{
        setCategory_id(e.target.value);
        const errorCopy={...errors};
        errorCopy.category_id=undefined;
        setErrors(errorCopy);
        if(!touchCategory_id){
            setTouchCategory_id(true);
        }
    }

    const onChangeSize=(e)=>{
        setSize_id(e.target.value);
        const errorCopy={...errors};
        errorCopy.size_id=undefined;
        setErrors(errorCopy);
        if(!touchSize_id){
            setTouchSize_id(true);
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

    const test=()=>{
        const brand_DOC=document.querySelector('.brand_DOC');
        console.log(brand_DOC.value);
    }

    const fillInput= async ()=>{
        //start DOC
        const brand_DOC=document.querySelectorAll('.brand_DOC');
        const material_DOC=document.querySelectorAll('.material_DOC');
        const gender_DOC=document.querySelectorAll('.gender_DOC');
        const color_DOC=document.querySelectorAll('.color_DOC');
        const status_DOC=document.querySelectorAll('.status_DOC');
        const sole_DOC=document.querySelectorAll('.sole_DOC');
        const category_DOC=document.querySelectorAll('.category_DOC');
        const size_DOC=document.querySelectorAll('.size_DOC');
        //end DOC
        const response = await ImageProductAPI.getProductDetailImage(props.id_product_detail);
        const data=response.data;
        //setValue
        setName(data.product_name);
        setDescription(data.product_description);
        setBrand_id(data.product_detail_brand_id);
        setMaterial_id(data.product_detail_material_id);
        setGender_id(data.product_detail_gender_id);
        setColor_id(data.product_detail_color_id);
        setStatus_id(data.product_detail_status_id);
        setSole_id(data.product_detail_sole_id);
        setCategory_id(data.product_detail_category_id);
        setSize_id(data.product_detail_size_id);
        setSell_Price(data.product_detail_sell_price);
        setQuantity(data.product_detail_quantity);
        //setValueSelect
        setValueInput(brand_DOC,data.product_detail_brand_id);
        setValueInput(material_DOC,data.product_detail_material_id);
        setValueInput(gender_DOC,data.product_detail_gender_id);
        setValueInput(color_DOC,data.product_detail_color_id);
        setValueInput(status_DOC,data.product_detail_status_id);
        setValueInput(sole_DOC,data.product_detail_sole_id);
        setValueInput(category_DOC,data.product_detail_category_id);
        setValueInput(size_DOC,data.product_detail_size_id);
    }
    const setValueInput=(arr,id)=>{
        arr.forEach(item=>{
            if(id===Number(item.value)){
                item.selected=true
            }
        })
    }

    return(
        <>
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
                                            <Form.Control value={name} onChange={onChangeName} required type="text" placeholder="Nhập tên sản phẩm!"
                                                          isValid={name.length>=5}
                                                          isInvalid={touchName && name==='' || errors.name!==undefined}/>
                                        </div>
                                        {touchName && name === '' ?
                                            <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>Bạn Chưa Điền Tên Sản Phẩm!</span> :
                                            errors.name !== undefined ?
                                                <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>{errors.name}</span>:''
                                        }
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
                                            <Form.Select onChange={onChangeBrand} style={{width:"50%"}} required
                                                         isValid={brand_id!==''}
                                                         isInvalid={touchBrand_id && brand_id==='' || errors.brand_id!==undefined}>
                                                <option value="">--Chọn thương hiệu--</option>
                                                {listBrand.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option className="brand_DOC" key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenBrandModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchBrand_id && brand_id === '' ?
                                            <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>Bạn Chưa Chọn Thương Hiệu!</span> :
                                            errors.brand_id !== undefined ?
                                                <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>{errors.brand_id}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Chất liệu:</Form.Label>
                                            <Form.Select onChange={onChangeMaterial} style={{width:"50%"}} required
                                                         isValid={material_id!==''}
                                                         isInvalid={touchMaterial_id && material_id==='' || errors.material_id!==undefined}>
                                                <option value="">--Chọn chất liệu--</option>
                                                {listMaterial.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option className="material_DOC" key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenMaterialModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchMaterial_id && material_id === '' ?
                                            <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>Bạn Chưa Chọn Chất Liệu!</span> :
                                            errors.material_id !== undefined ?
                                                <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>{errors.material_id}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Giới tính:</Form.Label>
                                            <Form.Select onChange={onChangeGender} style={{width:"50%"}} required
                                                         isValid={gender_id!==''}
                                                         isInvalid={touchGender_id && gender_id==='' || errors.gender_id!==undefined}>
                                                <option value="">--Chọn giới tính--</option>
                                                {listGender.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option className="gender_DOC" key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenGenderModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchGender_id && gender_id==='' ?
                                            <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>Bạn Chưa Chọn Giới Tính!</span>:
                                            errors.gender_id!==undefined ?
                                                <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>{errors.gender_id}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Màu Sắc:</Form.Label>
                                            <Form.Select onChange={onChangeColor} style={{width:"50%"}} required
                                                         isValid={color_id!==''}
                                                         isInvalid={touchColor_id && color_id==='' || errors.color_id!==undefined}>
                                                <option value="">--Chọn màu sắc--</option>
                                                {listColor.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option className="color_DOC" key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={()=>{setOpenModalColor(true)}} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchColor_id && color_id==='' ?
                                            <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>Bạn Chưa Chọn Màu Sắc!</span>:
                                            errors.color_id!==undefined ?
                                                <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>{errors.color_id}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Số Lượng:</Form.Label>
                                            <Form.Control value={quantity} onChange={onChangeQuantity} style={{width:"50%"}} required type="number" placeholder="Nhập số lượng đang bán!"
                                                          isValid={quantity!==""}
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
                                            <Form.Select onChange={onChangeStatus} style={{width:"50%"}} required
                                                         isValid={status_id!==''}
                                                         isInvalid={touchStatus_id && status_id==='' || errors.status_id!==undefined}>
                                                <option value="">--Chọn trạng thái--</option>
                                                {listStatusProductDetail.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option className="status_DOC" key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenStatusProductDetailModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchStatus_id && status_id===''?
                                            <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>Bạn Chưa Chọn Trạng Thái!</span>:
                                            errors.status_id!==undefined ?
                                                <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>{errors.status_id}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Đế giày:</Form.Label>
                                            <Form.Select onChange={onChangeSole} style={{width:"50%"}} required
                                                         isValid={sole_id!==''}
                                                         isInvalid={touchSole_id && sole_id==='' || errors.sole_id!==undefined}>
                                                <option value="">--Chọn đế giày--</option>
                                                {listSole.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option className="sole_DOC" key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenSoleModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchSole_id && sole_id===''?
                                            <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>Bạn Chưa Chọn Đế Giày!</span>:
                                            errors.sole_id!==undefined ?
                                                <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>{errors.sole_id}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Thể loại:</Form.Label>
                                            <Form.Select onChange={onChangeCategory} style={{width:"50%"}} required
                                                         isValid={category_id!==''}
                                                         isInvalid={touchCategory_id && category_id==='' || errors.category_id!==undefined}>
                                                <option value="">--Chọn thể loại--</option>
                                                {listCategory.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option className="category_DOC" key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenCategoryModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchCategory_id && category_id === '' ?
                                            <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>Bạn Chưa Chọn Thể Loại!</span> :
                                            errors.category_id !== undefined ?
                                                <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>{errors.category_id}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Kích Cỡ:</Form.Label>
                                            <Form.Select onChange={onChangeSize} style={{width:"50%"}} required
                                                         isValid={size_id!==''}
                                                         isInvalid={touchSize_id && size_id==='' || errors.size_id!==undefined}>
                                                <option value="">--Chọn kích cỡ--</option>
                                                {listSize.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option className="size_DOC" key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={()=>{setOpenModalSize(true)}} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        {touchSize_id && size_id==='' ?
                                            <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>Bạn Chưa Chọn Kích Cỡ!</span>:
                                            errors.size_id!==undefined ?
                                                <span style={{marginLeft:"120px",color:"#dc3545",fontSize:"14px"}}>{errors.size_id}</span>:''
                                        }
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Giá Bán:</Form.Label>
                                            <Form.Control value={sell_price} onChange={onChangeSell_Price} style={{width:"50%"}} required type="number" placeholder="Nhập giá bán!"
                                                          isValid={sell_price!==""}
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
                                <input className="input_upload" type="file" multiple style={{display:"none"}}/>
                                <div className="pid-list_image">
                                    <h1>Ảnh Sản Phẩm</h1>
                                </div>
                                {listImage.map(image=>(
                                    <Col sm={1}>
                                        <img style={{width:"100%",height:"100px",objectFit:"contain",border:"1px solid #999",borderRadius:"5px"}} src={image.imageURL} alt=""/>
                                    </Col>
                                ))}
                                <Col sm={1}>
                                    <div onClick={handleOpenFileUpLoad} className="pid_upload">
                                        <div style={{textAlign: "center"}}>
                                            <i className="fa-solid fa-plus"></i>
                                            <p>Upload</p>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="pid_footer">
                            <button onClick={handleClose} className="pid_cancel">Hủy</button>
                            <button onClick={test} className="pid_edit">Chỉnh Sửa</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(ProductImageDetail)