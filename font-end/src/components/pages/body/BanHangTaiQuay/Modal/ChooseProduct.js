import "../style/ChooseProduct.css"
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import Paging from "../../../../utils/Paging";
import {useCallback, useEffect, useRef, useState} from "react";
import ImageProductAPI from "../../../../services/ProductAPI/Image_Product_API/ImageProductAPI";
import {useSelector} from "react-redux";
import productDetailAPI from "../../../../services/ProductAPI/Product_Detail_API/ProductDetailAPI";
import CategoryAPI from "../../../../services/CategoryAPI/CategoryAPI";
import BrandAPI from "../../../../services/BrandAPI/BrandAPI";
import SoleAPI from "../../../../services/SoleAPI/SoleAPI";
import MaterialAPI from "../../../../services/MaterialAPI/MaterialAPI";
import StatusProductDetailAPI from "../../../../services/StatusProductDetailAPI/StatusProductDetailAPI";
import GenderAPI from "../../../../services/GenderAPI/GenderAPI";
import SizeAPI from "../../../../services/SizeAPI/SizeAPI";
import ColorAPI from "../../../../services/ColorAPI/ColorAPI";
import Loading from "../../../loading/Loading";


const ChooseProduct =(props)=>{
    //state
    const [brand_id,setBrand_Id]=useState('');
    const [material_id,setMaterial_Id]=useState('');
    const [gender_id,setGender_Id]=useState('');
    const [color_id,setColor_Id]=useState('');
    const [status_id,setStatus_Id]=useState('');
    const [sole_id,setSole_Id]=useState('');
    const [size_id,setSize_Id]=useState('');
    const [category_id,setCategory_Id]=useState('');
    //list
    const [listMaterial,setListMaterial]=useState([]);
    const [listBrand,setListBrand]=useState([]);
    const [listSole,setListSole]=useState([]);
    const [listCategory,setListCategory]=useState([]);
    const [listStatus,setListStatus]=useState([]);
    const [listGender,setListGender]=useState([]);
    const [listSize,setListSize]=useState([]);
    const [listColor,setListColor]=useState([]);
    const [totalPage,setTotalPage]=useState(undefined);
    //action
    const [whatAction,setWhatAction]=useState("normal");
    //list ProductDetail
    const [listProductDetail,setListProductDetail] = useState([]);
    const [listImageProduct,setListImageProduct] = useState([]);
    const [slideImage,setSlideImage] = useState(0);
    //loading
    const isLoading=useSelector(state => state.productDetail.isLoading);
    const [loading,setLoading]=useState(false);


    //function
    useEffect(()=>{
        getAllProductDetail();
        getAllImageProduct();
        getAllCategory();
        getAllBrand();
        getAllSole();
        getAllMaterial();
        getAllStatus();
        getAllGender();
        getAllSize();
        getAllColor();
        getTotalPage();
    },[]);

    useEffect(()=>{
        let count=0;
        let interval_id = setInterval(()=>{
            let listSlideImage=document.querySelectorAll(".slideImage");

            listSlideImage.forEach(item=>{
                item.style.animation="slideImage 0.5s ease-in-out";
            })

            //thay đổi ảnh
            if(count === 5){
                count=0;
                setSlideImage(0);
            }else{
                count++;
                setSlideImage(prevState => prevState + 1);
            }

            setTimeout(()=>{
                listSlideImage.forEach(item=>{
                    item.style.animation="";
                })
            },[1000]);
        },[5000]);

        return(()=>{
            clearInterval(interval_id);
        })
    },[]);

    //getAll ProductDetail
    const getAllProductDetail= async ()=>{
        try {
            const response = await productDetailAPI.getAllProductDetail(1);
            if(response && response.status === 200){
                setListProductDetail(response.data);
            }
        }catch (e) {
            console.log(e)
        }
    }
    //getImageProduct
    const getAllImageProduct= async ()=>{
        const response = await ImageProductAPI.getAllImage();
        setListImageProduct(response.data);
    }

    //Paging
    const getTotalPage= async ()=>{
        try {
            const response = await productDetailAPI.getTotalPageProductDetail();
            if(response && response.status === 200){
                setTotalPage(response.data);
            }
        }catch (e) {
            console.log(e)
        }
    }

    const handleMovePaging= async (page)=>{
        try {
            const response = await productDetailAPI.getAllProductDetail(page);
            if(response && response.status === 200){
                setListProductDetail(response.data);
            }
        }catch (e) {
            console.log(e);
        }
    }

    const handleSearchMovePaging= async (page)=>{
        setLoading(true);
        try {
            const response=await productDetailAPI.searchProductDetail(material_id,brand_id,sole_id,size_id,color_id,category_id,status_id,gender_id,page);
            if(response && response.status === 200){
                setListProductDetail(response.data);
            }
            setLoading(false);
        }catch (e) {
            setLoading(false);
            console.log(e)
        }
    }

    //get List Entity

    const getAllCategory=async ()=>{
        const res=await CategoryAPI.getAll();
        setListCategory(res.data)
    }
    const getAllBrand=async ()=>{
        const res=await BrandAPI.getAll();
        setListBrand(res.data)
    }
    const getAllSole=async ()=>{
        const res=await SoleAPI.getAll();
        setListSole(res.data)
    }
    const getAllMaterial=async ()=>{
        const res=await MaterialAPI.getAll();
        setListMaterial(res.data)
    }
    const getAllStatus=async ()=>{
        const res=await StatusProductDetailAPI.getAll();
        setListStatus(res.data)
    }
    const getAllGender=async ()=>{
        const res=await GenderAPI.getAll();
        setListGender(res.data)
    }

    const getAllSize=async ()=>{
        const res=await SizeAPI.getAll();
        setListSize(res.data)
    }

    const getAllColor=async ()=>{
        const res=await ColorAPI.getAll();
        setListColor(res.data)
    }

    //handle

    const handleCloseOutSide=useCallback((event)=>{
        const cp_modal = document.querySelector(".cp-modal");
        const cp_container = document.querySelector(".cp-container");
        if (event.target.classList.value === "cp-container") {
            cp_container.style.animation = "closeModal 0.3s ease-in-out"
            setTimeout(()=>{
                props.setOpenModalChooseProduct(false);
                cp_modal.style.display = "none";
            },[300])
        }
    },[]);

    const handleClose=useCallback(()=>{
        const cp_modal = document.querySelector(".cp-modal");
        const cp_container = document.querySelector(".cp-container");
        cp_container.style.animation = "closeModal 0.3s ease-in-out"
        setTimeout(()=>{
            props.setOpenModalChooseProduct(false);
            cp_modal.style.display = "none";
        },[300]);
    },[]);

    const handleFilterProductDetail= async ()=>{
        try {
            const response=await productDetailAPI.searchProductDetail(material_id,brand_id,sole_id,size_id,color_id,category_id,status_id,gender_id,1);
            if(response && response.status === 200){
                setListProductDetail(response.data);
            }
            const totalPage=await productDetailAPI.getTotalPageSearchProductDetail(material_id,brand_id,sole_id,size_id,color_id,category_id,status_id,gender_id);
            setTotalPage(totalPage.data);
            setWhatAction("search");
        }catch (e){
            console.log(e);
        }
    }

    const handleClearFilter=()=>{
        setBrand_Id("");
        setMaterial_Id("");
        setGender_Id("");
        setColor_Id("");
        setStatus_Id("");
        setSole_Id("");
        setSize_Id("");
        setCategory_Id("");
    }

    const handleChooseProductDetail=(product_detail)=>{
        const newProductDetail = Object.assign({}, product_detail, { quantity_pay: 1 });
        props.handleChooseProductDetail(newProductDetail);
        handleClose();
    }


    return(
        <>
            {loading || isLoading && <Loading/>}
            <div className="cp-modal">
                <div onClick={handleCloseOutSide} className="cp-container">
                    <div className="cp-content">
                        <Container>
                            <div style={{display:"flex",justifyContent:"end",margin:"0 0 20px 0"}}>
                                <Button onClick={handleFilterProductDetail}>Tìm Kiếm</Button>
                                <Button onClick={handleClearFilter} className="btn btn-danger" style={{marginLeft:"20px"}}>Làm Mới</Button>
                            </div>
                            <Row>
                                <Col sm={3} className="mb-4">
                                    <Form.Group style={{display: 'flex', alignItems: 'center',justifyContent:"center"}}>
                                        <Form.Label style={{width:"30%",margin:"0 10px 0 0",fontWeight: "600"}}>Chất liệu:</Form.Label>
                                        <Form.Select value={material_id} onChange={(e)=>{setMaterial_Id(e.target.value)}} style={{width: "70%"}} required>
                                            <option value="">--Tất Cả--</option>
                                            {listMaterial.map((item,index)=> (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm={3} className="mb-4">
                                    <Form.Group style={{display: 'flex', alignItems: 'center',justifyContent:"center"}}>
                                        <Form.Label style={{width:"30%",margin:"0 10px 0 0",fontWeight: "600"}}>Thương hiệu:</Form.Label>
                                        <Form.Select value={brand_id} onChange={(e)=>{setBrand_Id(e.target.value)}} style={{width: "70%"}} required>
                                            <option value="">--Tất Cả--</option>
                                            {listBrand.map((item,index)=> (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm={3} className="mb-4">
                                    <Form.Group style={{display: 'flex', alignItems: 'center',justifyContent:"center"}}>
                                        <Form.Label style={{width:"30%",margin:"0 10px 0 0",fontWeight: "600"}}>Đế giày:</Form.Label>
                                        <Form.Select value={sole_id} onChange={(e)=>{setSole_Id(e.target.value)}} style={{width: "70%"}} required>
                                            <option value="">--Tất Cả--</option>
                                            {listSole.map((item,index)=> (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm={3} className="mb-4">
                                    <Form.Group style={{display: 'flex', alignItems: 'center',justifyContent:"center"}}>
                                        <Form.Label style={{width:"30%",margin:"0 10px 0 0",fontWeight: "600"}}>Kích cỡ:</Form.Label>
                                        <Form.Select value={size_id} onChange={(e)=>{setSize_Id(e.target.value)}} style={{width: "70%"}} required>
                                            <option value="">--Tất Cả--</option>
                                            {listSize.map((item,index)=> (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                {/**/}
                                <Col sm={3} className="mb-4">
                                    <Form.Group style={{display: 'flex', alignItems: 'center',justifyContent:"center"}}>
                                        <Form.Label style={{width:"30%",margin:"0 10px 0 0",fontWeight: "600"}}>Màu sắc:</Form.Label>
                                        <Form.Select value={color_id} onChange={(e)=>{setColor_Id(e.target.value)}} style={{width: "70%"}} required>
                                            <option value="">--Tất Cả--</option>
                                            {listColor.map((item,index)=> (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm={3} className="mb-4">
                                    <Form.Group style={{display: 'flex', alignItems: 'center',justifyContent:"center"}}>
                                        <Form.Label style={{width:"30%",margin:"0 10px 0 0",fontWeight: "600"}}>Thể loại:</Form.Label>
                                        <Form.Select value={category_id} onChange={(e)=>{setCategory_Id(e.target.value)}} style={{width: "70%"}} required>
                                            <option value="">--Tất Cả--</option>
                                            {listCategory.map((item,index)=> (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm={3} className="mb-4">
                                    <Form.Group style={{display: 'flex', alignItems: 'center',justifyContent:"center"}}>
                                        <Form.Label style={{width:"30%",fontWeight: "600"}}>Trạng thái:</Form.Label>
                                        <Form.Select value={status_id} onChange={(e)=>{setStatus_Id(e.target.value)}} style={{width: "70%"}} required>
                                            <option value="">--Tất Cả--</option>
                                            {listStatus.map((item,index)=> (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col sm={3} className="mb-4">
                                    <Form.Group style={{display: 'flex', alignItems: 'center',justifyContent:"center"}}>
                                        <Form.Label style={{width:"30%",margin:"0 10px 0 0",fontWeight: "600"}}>Giới tính:</Form.Label>
                                        <Form.Select value={gender_id} onChange={(e)=>{setGender_Id(e.target.value)}} style={{width: "70%"}} required>
                                            <option value="">--Tất Cả--</option>
                                            {listGender.map((item,index)=> (
                                                <option key={index} value={item.id}>{item.name}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            {/*Table Product*/}
                            <Card style={{marginTop: "30px"}}>
                                <Card.Body style={{padding: "0"}}>
                                    <Table style={{marginBottom: "0"}}>
                                        <thead>
                                        <tr style={{fontSize: "12px", fontWeight: "600"}}>
                                            <th style={{width: "5%", textAlign: "center"}}>STT</th>
                                            <th style={{width: "15%",textAlign:"center"}}>Ảnh</th>
                                            <th style={{width: "20%"}}>Tên Sản Phẩm</th>
                                            <th style={{width: "10%", textAlign: "center"}}>Số Lượng</th>
                                            <th style={{width: "10%", textAlign: "center"}}>Giá Bán</th>
                                            <th style={{width: "10%", textAlign: "center"}}>Kích Thước</th>
                                            <th style={{width: "10%", textAlign: "center"}}>Màu Sắc</th>
                                            <th style={{width: "10%", textAlign: "center"}}>Trạng Thái</th>
                                            <th style={{width: "10%", textAlign: "center"}}>Hành Động</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {listProductDetail.map((item,index)=>(
                                                <tr key={index} style={{fontSize: "12px"}}>
                                                    <td style={{textAlign: "center"}}>{index+1}</td>
                                                    <td>
                                                        {listImageProduct.length > 0 ?
                                                            <img className="slideImage" src={listImageProduct.filter(image=>image.product_Detail_id===item.product_detail_id)[slideImage].imageURL} alt="Ảnh sản phẩm"/> : ""
                                                        }
                                                    </td>
                                                    <td>
                                                        {item.product_name + "[" + item.product_detail_size_name + "-" + item.product_detail_color_name +"]"}
                                                    </td>
                                                    <td style={{textAlign: "center"}}>
                                                        {item.product_detail_quantity}
                                                    </td>
                                                    <td style={{textAlign: "center"}}>
                                                        {item.product_detail_sell_price.toLocaleString("vi-VN",{style:"currency" , currency:"VND"})}
                                                    </td>
                                                    <td style={{textAlign: "center"}}>
                                                        {item.product_detail_size_name}
                                                    </td>
                                                    <td style={{textAlign: "center"}}>
                                                        <span style={{backgroundColor:item.product_detail_color_code,display:"block",borderRadius:"10px", color:item.product_detail_color_code,border:"1px solid #444"}}>2</span>
                                                    </td>
                                                    <td style={{textAlign: "center", justifyContent: "center", color: "#fff", borderRadius: "5px"}}>
                                                        <span style={{backgroundColor: "#68ae6b", display:"block",padding:"5px 0", borderRadius: "10px"}}>{item.product_detail_status_name}</span>
                                                    </td>
                                                    <td style={{textAlign: "center"}}>
                                                        <button onClick={()=>{handleChooseProductDetail(item)}} className="chooseProductDetail">Chọn</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                                <Card.Footer style={{backgroundColor: "#fff"}}>
                                    <Paging whatAction={whatAction} TotalPage={totalPage} APIPaging={handleMovePaging} APISearchPaging={handleSearchMovePaging}/>
                                </Card.Footer>
                            </Card>
                        </Container>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChooseProduct