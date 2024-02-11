import "./style/ProductDetail.css"
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import SizeAPI from "../../../../services/SizeAPI/SizeAPI";
import ColorAPI from "../../../../services/ColorAPI/ColorAPI";
import BrandAPI from "../../../../services/BrandAPI/BrandAPI";
import CategoryAPI from "../../../../services/CategoryAPI/CategoryAPI";
import SoleAPI from "../../../../services/SoleAPI/SoleAPI";
import MaterialAPI from "../../../../services/MaterialAPI/MaterialAPI";
import StatusProductDetailAPI from "../../../../services/StatusProductDetailAPI/StatusProductDetailAPI";
import GenderAPI from "../../../../services/GenderAPI/GenderAPI";
import {getAllProductDetail, setListProductDetail} from "../../../../../redux/slices/product/ProductDetailSlice";
import ProductImageDetail from "../productImageDetail/ProductImageDetail";
import Paging from "../../../../utils/Paging";
import productDetailAPI from "../../../../services/ProductAPI/Product_Detail_API/ProductDetailAPI";
import Loading from "../../../loading/Loading";
import {NumericFormat} from "react-number-format";



const ProductDetail=()=>{
    //dispatch
    const dispatch=useDispatch();
    //openModal
    const [openModalPID,setOpenModalPid]=useState(false);
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
    const listProductDetail=useSelector(state => state.productDetail.listProductDetail);
    //loading
    const isLoading=useSelector(state => state.productDetail.isLoading);
    const [loading,setLoading]=useState(false);
    //product_id
    const {product_id}=useParams();
    //id productDetail
    const [id_product_detail,setId_Product_Detail]=useState(undefined);


    useEffect(() => {
        getAllCategory();
        getAllBrand();
        getAllSole();
        getAllMaterial();
        getAllStatus();
        getAllGender();
        getAllSize();
        getAllColor();
        getTotalPage();
        const param={
            product_id:product_id,
            page:1
        }
        dispatch(getAllProductDetail(param));
    }, []);


    const getTotalPage= async ()=>{
        try {
            const response = await productDetailAPI.getTotalPageProductDetailResponse(product_id);
            setTotalPage(response.data);
        }catch (e) {
            console.log(e)
        }
    }

    const handleSearch= async ()=>{
        try {
            const response=await productDetailAPI.searchProductDetailResponse(product_id,material_id,brand_id,sole_id,size_id,color_id,category_id,status_id,gender_id,1);
            dispatch(setListProductDetail(response.data));
            const totalPage=await productDetailAPI.getTotalPageSearchProductDetailResponse(product_id,material_id,brand_id,sole_id,size_id,color_id,category_id,status_id,gender_id);
            setTotalPage(totalPage.data);
            setWhatAction("search");
        }catch (e){
            console.log(e);
        }
    }

    const handleAPISearchPaging= async (page)=>{
        setLoading(true);
        try {
            const response=await productDetailAPI.searchProductDetailResponse(product_id,material_id,brand_id,sole_id,size_id,color_id,category_id,status_id,gender_id,page);
            dispatch(setListProductDetail(response.data));
            setLoading(false);
        }catch (e) {
            setLoading(false);
            console.log(e)
        }
    }

    const handleAPIPaging=(page)=>{
        const param={
            product_id:product_id,
            page:page
        }
        dispatch(getAllProductDetail(param));
    }



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
    const handleOpenModalProductImageDetail=(id)=>{
        setId_Product_Detail(id);
        setOpenModalPid(true)
    }

    return(
        <>
            {loading || isLoading && <Loading/>}
            {openModalPID && <ProductImageDetail id_product_detail={id_product_detail} product_id={product_id} setOpenModalPid={setOpenModalPid}/>}
            <Container>
                <div className="base-header">
                    <i className="fa-solid fa-box-open"></i>
                    <span>Quản Lý Sản Phẩm Chi Tiết</span>
                </div>
                <div className="base-filter">
                    <div className="title-filter">
                        <i className="fa-solid fa-filter"></i>
                        <span>Bộ lọc</span>
                    </div>
                    <div className="filter-header">
                        <Row>
                            <Col lg={6}>
                                <Form.Group className="findByName">
                                    <Form.Control style={{width: "40%"}} type="text" placeholder="Nhập tên sản phẩm"/>
                                    <Button onClick={handleSearch} style={{margin: "0 10px"}}>Tìm kiếm</Button>
                                    <Button style={{backgroundColor: "red", border: "1px solid red"}}>Làm mới</Button>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <div style={{display: "flex", justifyContent: "end"}}>
                                    <Button>
                                        <i style={{marginRight: "5px"}} className="fa-solid fa-qrcode"></i>
                                        QR Code Sản Phẩm
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <div className="filter-list-entity">
                            <Row>
                                <Col sm={3}>
                                    <Form.Group>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Form.Label style={{width: "120px", fontWeight: "600"}}><span
                                                style={{color: "red"}}>*</span> Chất liệu:</Form.Label>
                                            <Form.Select onChange={(e)=>{setMaterial_Id(e.target.value)}} style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listMaterial.map((item,index)=> (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Form.Group>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Form.Label style={{width: "120px", fontWeight: "600"}}><span
                                                style={{color: "red"}}>*</span> Thương hiệu:</Form.Label>
                                            <Form.Select onChange={(e)=>{setBrand_Id(e.target.value)}} style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listBrand.map((item,index)=> (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Form.Group>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Form.Label style={{width: "120px", fontWeight: "600"}}><span
                                                style={{color: "red"}}>*</span> Đế giày:</Form.Label>
                                            <Form.Select onChange={(e)=>{setSole_Id(e.target.value)}} style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listSole.map((item,index)=> (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Form.Group>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Form.Label style={{width: "120px", fontWeight: "600"}}><span
                                                style={{color: "red"}}>*</span> Kích Cỡ:</Form.Label>
                                            <Form.Select onChange={(e)=>{setSize_Id(e.target.value)}} style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listSize.map((item,index)=> (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                        <div className="filter-list-entity">
                            <Row>
                                <Col sm={3}>
                                    <Form.Group>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Form.Label style={{width: "120px", fontWeight: "600"}}><span
                                                style={{color: "red"}}>*</span> Màu sắc:</Form.Label>
                                            <Form.Select onChange={(e)=>{setColor_Id(e.target.value)}} style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listColor.map((item,index)=> (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Form.Group>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Form.Label style={{width: "120px", fontWeight: "600"}}><span
                                                style={{color: "red"}}>*</span> Thể loại:</Form.Label>
                                            <Form.Select onChange={(e)=>{setCategory_Id(e.target.value)}} style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listCategory.map((item,index)=> (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Form.Group>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Form.Label style={{width: "120px", fontWeight: "600"}}><span
                                                style={{color: "red"}}>*</span> Trạng thái:</Form.Label>
                                            <Form.Select onChange={(e)=>{setStatus_Id(e.target.value)}} style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listStatus.map((item,index)=> (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Form.Group>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <Form.Label style={{width: "120px", fontWeight: "600"}}><span
                                                style={{color: "red"}}>*</span> Giới Tính:</Form.Label>
                                            <Form.Select onChange={(e)=>{setGender_Id(e.target.value)}} style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listGender.map((item,index)=> (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                ))}
                                            </Form.Select>
                                        </div>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div className="base-body">
                    <div className="base-body-title">
                        <div className={"base-body-title-left"}>
                            <i className="fa-solid fa-list"></i>
                            <span>Danh sách sản phẩm chi tiết</span>
                        </div>
                        <div className={"base-body-title-right"}>
                            <button style={{marginRight:"15px"}} className={"btn btn-primary"}>
                                <i className="fa-regular fa-pen-to-square"></i>
                                <span style={{marginLeft: "5px"}}>Chỉnh số lượng và giá chung </span>
                            </button>
                            <button className={"btn btn-primary"}>
                                <i className="fa-regular fa-pen-to-square"></i>
                                <span style={{marginLeft: "5px"}}>Update sản phẩm</span>
                            </button>
                        </div>
                    </div>
                    <Card style={{marginTop: "30px"}}>
                        <Card.Body style={{padding: "0"}}>
                            <Table style={{marginBottom: "0"}}>
                            <thead>
                            <tr style={{fontSize: "12px", fontWeight: "600"}}>
                                <th style={{width: "5%", textAlign: "center"}}>STT</th>
                                <th style={{width: "15%"}}>Ảnh</th>
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
                                        <tr style={{fontSize: "12px"}}>
                                            <td style={{textAlign: "center"}}>{index+1}</td>
                                            <td>2</td>
                                            <td>{item.product_name}</td>
                                            <td style={{textAlign: "center"}}>
                                                <Form.Control type="number" className="changeQuantityandPrice" value={item.product_detail_quantity}/>
                                            </td>
                                            <td style={{textAlign: "center"}}>
                                                <NumericFormat style={{padding: "0.375rem 0.75rem",borderRadius:"5px",border:"1px solid #dee2e6",outline:"none"}} thousandSeparator suffix="VNĐ" value={item.product_detail_sell_price}/>
                                            </td>
                                            <td style={{textAlign: "center"}}>{item.product_detail_size_name}</td>
                                            <td style={{textAlign: "center"}}>
                                                <span style={{backgroundColor:item.product_detail_color_code,display:"block",borderRadius:"10px", color:item.product_detail_color_code,border:"1px solid #444"}}>2</span>
                                            </td>
                                            <td style={{textAlign: "center", justifyContent: "center", color: "#fff", borderRadius: "5px"}}>
                                                <span style={{backgroundColor: "#68ae6b", padding: "7px", borderRadius: "10px"}}>{item.product_detail_status}</span>
                                            </td>
                                            <td style={{textAlign: "center"}}>
                                                <i onClick={()=>{handleOpenModalProductImageDetail(item.product_detail_id)}} className="fa-regular fa-pen-to-square actionEdit"></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor: "#fff"}}>
                            <Paging TotalPage={totalPage} APIPaging={handleAPIPaging} APISearchPaging={handleAPISearchPaging} whatAction={whatAction}/>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </>
    )
}

export default ProductDetail