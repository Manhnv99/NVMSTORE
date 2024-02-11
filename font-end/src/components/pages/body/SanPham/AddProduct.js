import "./style/AddProduct.css"
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setListBrand} from "../../../../redux/slices/BrandSlice";
import brandAPI from "../../../services/BrandAPI/BrandAPI";
import materialAPI from "../../../services/MaterialAPI/MaterialAPI";
import soleAPI from "../../../services/SoleAPI/SoleAPI";
import categoryAPI from "../../../services/CategoryAPI/CategoryAPI";
import {setListMaterial} from "../../../../redux/slices/MaterialSlice";
import {setListSole} from "../../../../redux/slices/SoleSlice";
import {setListCategory} from "../../../../redux/slices/CategorySlice";
import ModalEntity from "./ModalEntity";
import {getAllGender} from "../../../../redux/slices/GenderSlice";
import {getAllStatusProductDetail} from "../../../../redux/slices/StatusProductDetailSlice";
import ModalSize from "./ModalSize";
import ModalColor from "./ModelColor";
import {toastMessage} from "../../../../redux/slices/ToastMsgSlice";
import ModalEditProduct from "./ModalEditProduct";
import ModalDetailImage from "./ModalDetailImage";
import productAPI from "../../../services/ProductAPI/ProductAPI";
import ProductDetailAPI from "../../../services/ProductAPI/Product_Detail_API/ProductDetailAPI";
import ImageProductAPI from "../../../services/ProductAPI/Image_Product_API/ImageProductAPI";
import {useNavigate} from "react-router-dom";
import Loading from "../../loading/Loading";
import {NumericFormat} from "react-number-format";
import axios from "axios";


const AddProduct=()=>{
    //toastMessage
    const toastSuccess=useSelector(state => state.toastmsg.toastSuccess);
    const toastWarning=useSelector(state => state.toastmsg.toastWarning);
    const toastError=useSelector(state => state.toastmsg.toastError);
    // dispatch
    const dispatch=useDispatch();
    //state entity
    const [whatEntity,setWhatEntity]=useState(undefined)
    const [openModalEntity,setOpenModalEntity]=useState(false)
    const [openModalColor,setOpenModalColor]=useState(false)
    const [openModalSize,setOpenModalSize]=useState(false)
    const [openModalEdit,setOpenModalEdit]=useState(false)
    const [openModalImageDetail,setOpenModalImageDetail]=useState(false)
    // state
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    const [brand_id,setBrand_id]=useState('')
    const [material_id,setMaterial_id]=useState('')
    const [gender_id,setGender_id]=useState('')
    const [sole_id,setSole_id]=useState('')
    const [category_id,setCategory_id]=useState('')
    const [status_id,setStatus_id]=useState('')
    const [imageDetail,setImageDetail]=useState(undefined)
    const [checkAll,setCheckAll]=useState(false)
    // touch
    const [touchName,setTouchName]=useState(false)
    const [touchBrand_id,setTouchBrand_id]=useState(false)
    const [touchMaterial_id,setTouchMaterial_id]=useState(false)
    const [touchGender_id,setTouchGender_id]=useState(false)
    const [touchSole_id,setTouchSole_id]=useState(false)
    const [touchCategory_id,setTouchCategory_id]=useState(false)
    const [touchStatus_id,setTouchStatus_id]=useState(false)
    const [touchDescription,setTouchDescription]=useState(false)
    // list Size Choosed
    const [listSizeChoosed,setListSizeChoosed]=useState([])
    const [listColorChoosed,setListColorChoosed]=useState([])
    // list Product
    const [listProduct,setListProduct]=useState([])
    const [listImageChoose,setListImageChoose]=useState([])
    const [listProductToEdit,setListProductToEdit]=useState([])
    const [whatColorUpload,setWhatColorUpload]=useState('')
    const [listNameProduct,setListNameProduct]=useState([])
    // redux
    const listBrand=useSelector(state => state.brand.listBrand)
    const listMaterial=useSelector(state => state.material.listMaterial)
    const listSole=useSelector(state => state.sole.listSole)
    const listCategory=useSelector(state => state.category.listCategory)
    const listGender=useSelector(state => state.gender.listGender)
    const listStatusProductDetail=useSelector(state => state.status_product_detail.listStatusProductDetail)
    //error
    const [errors,setErrors]=useState({
        name:undefined,
        description:undefined,
        brand_id:undefined,
        material_id:undefined,
        gender_id:undefined,
        status_id:undefined,
        sole_id:undefined,
        category_id:undefined,
    })
    //nav
    const nav=useNavigate();
    //loading
    const [loading,setLoading]=useState(false)


    useEffect(()=>{
        if(name!=='' && description !==''&& brand_id!=='' && material_id!=='' && gender_id!==''&& status_id!=='' && sole_id!=='' && category_id!=='' && listSizeChoosed.length!==0 && listColorChoosed.length!==0){
            let myArr=[]
            listColorChoosed.forEach(color=>{
                listSizeChoosed.forEach(size=>{
                    const listProductRequest={
                        name:`${name} [${size}-${color.name}]`,
                        description:description,
                        brand_id:brand_id,
                        material_id:material_id,
                        gender_id:gender_id,
                        status_id:status_id,
                        sole_id:sole_id,
                        category_id:category_id,
                        color_name:color.name,
                        size_name:size,
                        quantity:1,
                        sell_price:1000000
                    }
                    myArr.push(listProductRequest);
                })
            })
            setListProduct(myArr);
        }else{
            setListProduct([])
        }
    },[name,description,brand_id,material_id,gender_id,status_id,sole_id,category_id,listSizeChoosed.length,listColorChoosed.length])


    useEffect(()=>{
        getAllBrand();
        getAllMaterial();
        getAllSole();
        getAllCategory();
        getAllProduct();
        dispatch(getAllGender())
        dispatch(getAllStatusProductDetail())
    },[])

    const getAllProduct= async ()=>{
        const res= await productAPI.getAllProduct();
        setListNameProduct(res.data);
    }

    const getAllBrand= async ()=>{
        const res=await brandAPI.getAll();
        dispatch(setListBrand(res.data))
    }
    const getAllMaterial= async ()=>{
        const res=await materialAPI.getAll();
        dispatch(setListMaterial(res.data))
    }
    const getAllSole= async ()=>{
        const res=await soleAPI.getAll();
        dispatch(setListSole(res.data))
    }
    const getAllCategory= async ()=>{
        const res=await categoryAPI.getAll();
        dispatch(setListCategory(res.data))
    }

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

    //setListSize
    const handleSetListSize=(listSizeAdd)=>{
        listSizeAdd.forEach(item=>{
            if(!listSizeChoosed.includes(item)){
                listSizeChoosed.push(item)
            }
        })
        setListSizeChoosed(listSizeChoosed.sort((a,b)=>{
            return a-b;
        }))
    }

    const handleSetListColor=(listColorAdd)=>{
        const storeCode=[]
        //loop listColorChoosed to push code into storeCode
        listColorChoosed.forEach(item=>{
            storeCode.push(item.code)
        })
        //so that I can use this store code to check it is include or not.
        listColorAdd.forEach(item=>{
            if(!storeCode.includes(item.code)){
                listColorChoosed.push(item)
            }
        })
        setListColorChoosed(listColorChoosed)
    }

    // OnChange

    const onChangeName=(e)=>{
        setName(e.target.value)
        const errorCopy={...errors}
        errorCopy.name=undefined
        setErrors(errorCopy)
        if(!touchName){
            setTouchName(true)
        }
        const listName=document.querySelector('.listProduct');
        listName.style.display="none";
    }
    const onChangeMaterial=(e)=>{
        setMaterial_id(e.target.value)
        const errorCopy={...errors}
        errorCopy.material_id=undefined
        setErrors(errorCopy)
        if(!touchMaterial_id){
            setTouchMaterial_id(true)
        }
    }
    const onChangeGender=(e)=>{
        setGender_id(e.target.value)
        const errorCopy={...errors}
        errorCopy.gender_id=undefined
        setErrors(errorCopy)
        if(!touchGender_id){
            setTouchGender_id(true)
        }
    }
    const onChangeStatus=(e)=>{
        setStatus_id(e.target.value)
        const errorCopy={...errors}
        errorCopy.status_id=undefined
        setErrors(errorCopy)
        if(!touchStatus_id){
            setTouchStatus_id(true)
        }
    }
    const onChangeSole=(e)=>{
        setSole_id(e.target.value)
        const errorCopy={...errors}
        errorCopy.sole_id=undefined
        setErrors(errorCopy)
        if(!touchSole_id){
            setTouchSole_id(true)
        }
    }
    const onChangeCategory=(e)=>{
        setCategory_id(e.target.value)
        const errorCopy={...errors}
        errorCopy.category_id=undefined
        setErrors(errorCopy)
        if(!touchCategory_id){
            setTouchCategory_id(true)
        }
    }

    const onChangeBrand=(e)=>{
        setBrand_id(e.target.value)
        const errorCopy={...errors}
        errorCopy.brand_id=undefined
        setErrors(errorCopy)
        if(!touchBrand_id){
            setTouchBrand_id(true)
        }
    }

    const onChangeDescription=(e)=>{
        setDescription(e.target.value)
        const errorCopy={...errors}
        errorCopy.description=undefined
        setErrors(errorCopy)
        if(!touchDescription){
            setTouchDescription(true)
        }
    }

    const handleOpenUploadFile=(name)=>{
        const file=document.querySelector(".input_upload")
        file.click();
        setWhatColorUpload(name)
    }

    const handleChooseFile=(e)=>{
        const files=e.target.files
        const imagesArray = [];
        for(let i=0;i<files.length;i++){
            let fileReader=new FileReader()
            const file=files[i]
            let myarray=[...listImageChoose]
            fileReader.onload=(event)=>{
                imagesArray.push({
                    file:file,
                    url:event.target.result,
                    color:whatColorUpload
                })
                //đảm bảo chạy xong vòng lặp
                if(imagesArray.length===files.length){
                    for(let i=0;i<imagesArray.length;i++){
                        myarray.push(imagesArray[i])
                    }
                    if(myarray.filter(item=>item.color===whatColorUpload).length<=6){
                        setListImageChoose(myarray);
                    }else{
                        const toastMsg={...toastWarning};
                        toastMsg.message="Không được thêm quá 6 ảnh!";
                        dispatch(toastMessage(toastMsg));
                    }
                }
            }
            fileReader.readAsDataURL(file);
        }
    }

    const handleRemoveProduct=(name,color)=> {
        setListProduct(listProduct.filter(item => item.name !== name))
        const listProductForColor=listProduct.filter(item=>item.color_name===color)
        if(listProductForColor.length===1){
            setListColorChoosed(listColorChoosed.filter(item=>item.name!==color))
            setListImageChoose(listImageChoose.filter(item=>item.color!==color))
        }
    }

    const handleRemoveColor=(codeColor,nameColor)=>{
        setListColorChoosed(listColorChoosed.filter(color=>color.code!==codeColor))
        setListImageChoose(listImageChoose.filter(item=>item.color!==nameColor))
    }

    const handleChangePrice=(e,name)=>{
        const listProductCopy=[...listProduct]
        listProductCopy.forEach(item=>{
            if(item.name===name){
                item.sell_price=e.target.value
            }
        })
        setListProduct(listProductCopy)
    }

    const handleChangeQuantity=(e,name)=>{
        const listProductCopy=[...listProduct]
        listProductCopy.forEach(item=>{
            if(item.name===name){
                item.quantity=e.target.value
            }
        })
        setListProduct(listProductCopy)
    }

    const handleChooseProductToEdit=(name)=>{
        const myArr=[...listProductToEdit];
        if(!listProductToEdit.includes(name)){
            myArr.push(name)
            setListProductToEdit(myArr);
        } else {
            setListProductToEdit(listProductToEdit.filter(item=>item!==name))
        }
    }

    const handleEditProduct=(quantity,sell_price)=>{
        const checkbox=document.querySelectorAll('.checkbox')
        const checkboxall=document.querySelector('.checkbox-all')
        listProductToEdit.forEach(name=>{
            listProduct.forEach(item=>{
                if(item.name===name){
                    item.quantity=quantity
                    item.sell_price=sell_price
                }
            })
        })
        setListProduct(listProduct);
        checkbox.forEach(item=>{
            item.checked=false
        })
        checkboxall.checked=false
        setCheckAll(false)
        setListProductToEdit([])
        const toastMsg={...toastSuccess};
        toastMsg.message="Chỉnh Sửa Giá Và Số Lượng Thành Công!";
        dispatch(toastMessage(toastMsg));
    }
    const handleOpenModalEdit=()=>{
        if(listProductToEdit.length===0){
            const toastMsg={...toastWarning};
            toastMsg.message="Bạn Chưa Chọn Sản Phẩm!";
            dispatch(toastMessage(toastMsg));
        }else{
            setOpenModalEdit(true)
        }
    }

    const handleOpenModalImageDetail=(url)=>{
        setOpenModalImageDetail(true)
        setImageDetail(url)
    }

    const handleAddProduct= async ()=>{
        let error=0
        try {
            const productRequest={
                name:name,
                description:description,
                brand_id:brand_id,
                material_id:material_id,
                gender_id:gender_id,
                status_id:status_id,
                sole_id:sole_id,
                category_id:category_id,
            };
            const productResponse =await productAPI.addProduct(productRequest);
            if(productResponse.data==="add"){
                if(listColorChoosed.length===0 && listSizeChoosed.length===0){
                    // Chưa Chọn Ảnh Thì Chắc Chắn là chưa chọn màu...
                    const toastMsg={...toastWarning};
                    toastMsg.message="Bạn Chưa Chọn Màu Sắc Và Kích Cỡ!";
                    dispatch(toastMessage(toastMsg));
                }else{
                    if(listColorChoosed.length===0 && listSizeChoosed.length!==0){
                        const toastMsg={...toastWarning};
                        toastMsg.message="Bạn Chưa Chọn Màu Sắc!";
                        dispatch(toastMessage(toastMsg));
                    }else if(listColorChoosed.length!==0 && listSizeChoosed.length===0){
                        const toastMsg={...toastWarning};
                        toastMsg.message="Bạn Chưa Chọn Kích Cỡ!";
                        dispatch(toastMessage(toastMsg));
                    }else{
                        listColorChoosed.forEach(color=>{
                            if(listImageChoose.filter(image=>image.color===color.name).length===0){
                                error++;
                            }
                        })
                        if(error>0){
                            const toastMsg={...toastWarning};
                            toastMsg.message="Bạn Chưa Chọn Đủ Ảnh!";
                            dispatch(toastMessage(toastMsg));
                        }else{
                            //add Product
                            await addProductDetail();
                        }
                    }
                }
            }
        }catch (e) {
            setLoading(false);
            const dataError=e.response.data;
            const errorCopy={...errors};
            errorCopy.name=dataError.name;
            errorCopy.description=dataError.description;
            errorCopy.brand_id=dataError.brand_id;
            errorCopy.material_id=dataError.material_id;
            errorCopy.sole_id=dataError.sole_id;
            errorCopy.category_id=dataError.category_id;
            errorCopy.gender_id=dataError.gender_id;
            errorCopy.status_id=dataError.status_id;
            const toastMsg={...toastError};
            toastMsg.message="Bạn Chưa Điền Đủ Thông Tin!";
            dispatch(toastMessage(toastMsg));
            setErrors(errorCopy);
        }
    }

    const addProductDetail= async ()=>{
        setLoading(true);
        for(let i=0;i<listProduct.length;i++){
            const productDetailRequest = {
                name:name,
                description:description,
                brand_id:brand_id,
                material_id:material_id,
                gender_id:gender_id,
                status_id:status_id,
                sole_id:sole_id,
                category_id:category_id,
                size_name: listProduct[i].size_name,
                color_name: listProduct[i].color_name,
                quantity: listProduct[i].quantity,
                sell_price: listProduct[i].sell_price,
                status_product_detail_id: status_id
            };
            try {
                const response= await ProductDetailAPI.addProductDetail(productDetailRequest);
                if(response && response.status===201){
                    const listImageForColor = listImageChoose.filter(item => item.color === listProduct[i].color_name);
                    //uploadimage to Cloudinary
                    await uploadImageToCloudinary(listImageForColor, response.data);
                }
            } catch (e) {
                setLoading(false);
                const dataError=e.response.data
                const toastMsg={...toastError};
                toastMsg.message=dataError.toastMsg;
                dispatch(toastMessage(toastMsg));
            }
        }
        addSuccess();
    }

    const uploadImageToCloudinary=async(listImageForColor,data)=>{
        const CLOUD_NAME="dbxajsljz";
        const PRESET_NAME="nvmstore";
        const FOLDER_NAME="nvmstoreimage";
        const API=`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
        const formData=new FormData();
        formData.append("upload_preset",PRESET_NAME);
        formData.append("folder",FOLDER_NAME);
        await listImageForColor.forEach(image=>{
            formData.append("file",image.file);
            axios.post(API,formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                }
            }).then(response=>{
                let imageProductRequest={
                    product_detail_id:data,
                    image_id:response.data.public_id,
                    image_url:response.data.url
                }
                //add Image Product
                addImageProduct(imageProductRequest);
            })
        })
    }

    const addImageProduct=async (imageProductRequest)=>{
        try{
            await ImageProductAPI.addImageProduct(imageProductRequest)
        }catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    const addSuccess=()=>{
        nav("/product-management")
        const toastMsg={...toastSuccess};
        toastMsg.message="Tạo Sản Phẩm Thành Công!";
        dispatch(toastMessage(toastMsg));
        setLoading(false);
    }

    const handleChooseAllProductToEdit=()=>{
        console.log(checkAll)
        const checkbox=document.querySelectorAll(".checkbox")
        if(checkAll===false){
            //check
            setCheckAll(true);
            checkbox.forEach(item=>{
                item.checked=true
            })
            listProduct.forEach(product=>{
                listProductToEdit.push(product.name)
            })
            setListProductToEdit(listProductToEdit)
        }else{
            //uncheck
            setCheckAll(false);
            checkbox.forEach(item=>{
                item.checked=false
            })
            setListProductToEdit([])
        }

    }

    const handleOpenListNameProduct=()=>{
        const listName=document.querySelector('.listProduct');
        listName.style.display="block";
    }
    const handleChooseProductName=(e)=>{
        const listName=document.querySelector('.listProduct');
        setName(e.target.textContent);
        listName.style.display="none";
    }

    return(
        <>
            {loading && <Loading/>}
            {openModalImageDetail && <ModalDetailImage imageDetail={imageDetail} setOpenModalImageDetail={setOpenModalImageDetail}/>}
            {openModalEdit && <ModalEditProduct handleEditProduct={handleEditProduct} setOpenModalEdit={setOpenModalEdit}/>}
            {openModalColor && <ModalColor setOpenModalColor={setOpenModalColor} handleSetListColor={handleSetListColor}/>}
            {openModalSize && <ModalSize setOpenModalSize={setOpenModalSize} handleSetListSize={handleSetListSize}/>}
            {openModalEntity && <ModalEntity setOpenModalEntity={setOpenModalEntity} whatEntity={whatEntity}/>}
            <Container>
                <div className="product-base">
                    {/*product add*/}
                    <div className="product-add">
                        <Row>
                            <Col lg={12}>
                                <h2 className="title">Thêm Sản Phẩm</h2>
                            </Col>
                            {/*Tên Sản Phẩm*/}
                            <Col lg={12}>
                                <Form.Group style={{position:"relative"}}>
                                    <div style={{ display: 'flex', alignItems: 'start' }}>
                                        <Form.Label style={{width:"140px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Tên sản phẩm:</Form.Label>
                                        <Form.Control onClick={handleOpenListNameProduct} value={name} onChange={onChangeName} required type="text" placeholder="Nhập tên sản phẩm!"
                                                      isValid={name.length>=5}
                                                      isInvalid={touchName && name==='' || errors.name!==undefined}/>
                                    </div>
                                    {touchName && name === '' ?
                                        <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>Bạn Chưa Điền Tên Sản Phẩm!</span> :
                                        errors.name !== undefined ?
                                            <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>{errors.name}</span>:''
                                    }
                                    <div className="listProduct">
                                        <Row style={{marginRight:"0"}}>
                                            {listNameProduct.map(item=>(
                                                <Col sm={12} className="itemProduct">
                                                    <span onClick={handleChooseProductName}>{item.name}</span>
                                                </Col>
                                            ))}
                                        </Row>
                                    </div>
                                </Form.Group>
                            </Col>
                            {/*Mô Tả*/}
                            <Col lg={12} style={{marginTop:"20px"}}>
                                <Form.Group>
                                    <div style={{ display: 'flex', alignItems: 'start' }}>
                                        <Form.Label style={{width:"130px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Mô tả:</Form.Label>
                                        <textarea onChange={onChangeDescription} style={{width:"100%",height:"200px",border:"1px solid #999",borderRadius:"5px",outline:"none",paddingLeft:"10px"}}></textarea>
                                    </div>
                                    {touchDescription && description === '' ?
                                        <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>Bạn Chưa Điền Mô Tả!</span> :
                                            errors.description !== undefined ?
                                                <span style={{marginLeft: "120px", color: "#dc3545", fontSize: "14px"}}>{errors.description}</span>:''
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <div style={{marginTop:"40px"}}>
                            <Row>
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
                                                            <option key={index} value={item.id}>{item.name}</option>
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
                                                            <option key={index} value={item.id}>{item.name}</option>
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
                                                            <option key={index} value={item.id}>{item.name}</option>
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
                                                            <option key={index} value={item.id}>{item.name}</option>
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
                                                            <option key={index} value={item.id}>{item.name}</option>
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
                                                            <option key={index} value={item.id}>{item.name}</option>
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
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                {/*color and size*/}
                <div className="color-size">
                    <div style={{padding:"10px"}}>
                        <Row>
                            <Col sm={12}>
                                <h2 className="title">Kích Cỡ Và Màu Sắc</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{margin:"10px 0"}} sm={12}>
                                <Form.Group style={{padding:"20px 0"}}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Form.Label style={{width:"140px",fontWeight:"700",fontSize:"18px",marginBottom:"0"}}> Kích Cỡ :</Form.Label>
                                        <div>
                                            {listSizeChoosed.map((item,index)=>{
                                                return(
                                                    <span key={index} className={"size_item"}>
                                                        <span>{item}</span>
                                                        <i onClick={()=>{setListSizeChoosed(listSizeChoosed.filter(size=>size!==item))}} className="size-item-delete fa-solid fa-minus"></i>
                                                    </span>
                                                )
                                            })}
                                        </div>
                                        <Button onClick={()=>{setOpenModalSize(true)}} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                            <i className="fa-solid fa-plus"></i>
                                        </Button>
                                    </div>
                                </Form.Group>
                                <Form.Group style={{padding:"20px 0"}}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Form.Label style={{width:"140px",fontWeight:"700",fontSize:"18px",marginBottom:"0"}}> Màu Sắc :</Form.Label>
                                        <div>
                                            {listColorChoosed.map((item,index)=>{
                                                return (
                                                    <span key={index} style={{backgroundColor:item.code}} className={"color_item"}>
                                                        <i onClick={()=>{handleRemoveColor(item.code,item.name)}} className="color-item-delete fa-solid fa-minus"></i>
                                                    </span>
                                                )
                                            })}
                                        </div>
                                        <Button onClick={() => {
                                            setOpenModalColor(true)}} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                            <i className="fa-solid fa-plus"></i>
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>
                {/*table product*/}
                <div className="table-product">
                    <div style={{padding:"10px"}}>
                        <Row>
                            {/*title*/}
                            <Col sm={12}>
                                <h2 className="title">Chi Tiết Sản Phẩm</h2>
                            </Col>
                            {/*service*/}
                            <Col sm={12}>
                                <div style={{display:"flex",justifyContent:"end"}}>
                                    <Button onClick={handleOpenModalEdit}>Chỉnh số lượng và giá chung</Button>
                                    <Button onClick={handleAddProduct} style={{marginLeft:"10px"}}>Hoàn Tất</Button>
                                </div>
                            </Col>
                            {/*Table*/}
                            <Card style={{margin:"30px 0",padding:"0"}}>
                                <Card.Body style={{padding:"0"}}>
                                    {/*Table*/}
                                    <Table style={{marginBottom:"0"}}>
                                        <thead>
                                            <tr style={{fontSize:"13px",fontWeight:"600"}}>
                                                <th style={{width:"5%",textAlign:"center"}}>
                                                    <input className={"checkbox-all"} onClick={handleChooseAllProductToEdit} type="checkbox"/>
                                                    <span style={{marginLeft:"5px"}}>STT</span>
                                                </th>
                                                <th style={{width:"30%"}}>Tên Sản Phẩm</th>
                                                <th style={{width:"10%",textAlign:"center"}}>Số Lượng</th>
                                                <th style={{width:"15%",textAlign:"center"}}>Giá Bán</th>
                                                <th style={{width:"10%",textAlign:"center"}}>Hành Động</th>
                                                <th style={{width:"30%",textAlign:"center"}}>Upload Ảnh</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listColorChoosed.map(color=>{
                                                const productForColor=[...new Set(listProduct.filter(product=>product.color_name===color.name))]
                                                return(
                                                    productForColor.map((item,index)=> (
                                                            <tr key={index} style={{fontSize: "15px"}}>
                                                                <td style={{textAlign: "center"}}>
                                                                    <input className={"checkbox"} onClick={()=>{handleChooseProductToEdit(item.name)}} type="checkbox"/>
                                                                    <span style={{marginLeft: "5px"}}>{index + 1}</span>
                                                                </td>
                                                                <td>{item.name}</td>
                                                                <td style={{textAlign: "center"}}>
                                                                    <Form.Control value={item.quantity} onChange={(e)=>{handleChangeQuantity(e,item.name)}} required type="number"/>
                                                                </td>
                                                                <td style={{textAlign: "center"}}>
                                                                    <NumericFormat style={{padding: "0.375rem 0.75rem",borderRadius:"5px",border:"1px solid #dee2e6",outline:"none"}} thousandSeparator={true} suffix={"VNĐ"} value={item.sell_price} onChange={(e)=>{handleChangePrice(e,item.name)}}/>
                                                                </td>
                                                                <td style={{textAlign: "center"}}>
                                                                    <i onClick={()=>handleRemoveProduct(item.name,color.name)} style={{color: "red", fontSize: "20px", cursor: "pointer"}} className="fa-solid fa-trash"></i>
                                                                </td>
                                                                {index===0 &&
                                                                    <td rowSpan={productForColor.length}>
                                                                        <input className="input_upload" onChange={(e) => {handleChooseFile(e)}} type="file" multiple style={{display: "none"}}/>
                                                                        <div className="grid-container">
                                                                            {listImageChoose.map((item, index) => {
                                                                                if (item.color === color.name) {
                                                                                    return (
                                                                                        <div key={index} className="item-grid">
                                                                                            <div className="body-grid" style={{position:"relative"}}>
                                                                                                <img className="image-grid" src={item.url} alt=""/>
                                                                                                <div className="coating">
                                                                                                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
                                                                                                        <i onClick={()=>{handleOpenModalImageDetail(item.url)}} className="fa-solid fa-eye"></i>
                                                                                                        <i onClick={()=>{setListImageChoose(listImageChoose.filter((item,num)=>num!==index))}} style={{marginLeft:"10px"}} className="fa-solid fa-trash"></i>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            })}
                                                                            {listImageChoose.filter(item=>item.color===color.name).length!==6 &&
                                                                                <div onClick={() => {handleOpenUploadFile(color.name)}} className="table-upload item">
                                                                                    <div style={{textAlign: "center"}}>
                                                                                        <i className="fa-solid fa-plus"></i>
                                                                                        <p>Upload</p>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                }
                                                            </tr>
                                                        )
                                                    )
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Row>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AddProduct