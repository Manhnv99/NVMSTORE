import "./style/ProductDetail.css"
import {Button, Card, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import SizeAPI from "../../../../services/SizeAPI/SizeAPI";
import ColorAPI from "../../../../services/ColorAPI/ColorAPI";
import BrandAPI from "../../../../services/BrandAPI/BrandAPI";
import CategoryAPI from "../../../../services/CategoryAPI/CategoryAPI";
import SoleAPI from "../../../../services/SoleAPI/SoleAPI";
import categoryAPI from "../../../../services/CategoryAPI/CategoryAPI";
import MaterialAPI from "../../../../services/MaterialAPI/MaterialAPI";
import StatusProductDetailAPI from "../../../../services/StatusProductDetailAPI/StatusProductDetailAPI";
import GenderAPI from "../../../../services/GenderAPI/GenderAPI";
import {fetchProductDetail} from "../../../../../redux/slices/product/ProductDetailSlice";



const ProductDetail=()=>{
    const nav=useNavigate();
    const dispatch=useDispatch()
    const [listMaterial,setListMaterial]=useState([])
    const [listBrand,setListBrand]=useState([])
    const [listSole,setListSole]=useState([])
    const [listCategory,setListCategory]=useState([])
    const [listStatus,setListStatus]=useState([])
    const [listGender,setListGender]=useState([])
    const [listSize,setListSize]=useState([])
    const [listColor,setListColor]=useState([])
    //list ProductDetail
    const listProductDetail=useSelector(state => state.productDetail.listProductDetail)
    const {product_id}=useParams();


    useEffect(() => {
        getAllCategory();
        getAllBrand();
        getAllSole();
        getAllMaterial();
        getAllStatus();
        getAllGender();
        getAllSize();
        getAllColor();
        dispatch(fetchProductDetail(product_id))
    }, []);
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



    return(
        <>
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
                                    <Button style={{margin: "0 10px"}}>Tìm kiếm</Button>
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
                                            <Form.Select style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listMaterial.map((item,index)=> (
                                                    <option key={index}>{item.name}</option>
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
                                            <Form.Select style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listBrand.map((item,index)=> (
                                                    <option key={index}>{item.name}</option>
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
                                            <Form.Select style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listSole.map((item,index)=> (
                                                    <option key={index}>{item.name}</option>
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
                                            <Form.Select style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listSize.map((item,index)=> (
                                                    <option key={index}>{item.name}</option>
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
                                            <Form.Select style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listColor.map((item,index)=> (
                                                    <option key={index}>{item.name}</option>
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
                                            <Form.Select style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listCategory.map((item,index)=> (
                                                    <option key={index}>{item.name}</option>
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
                                            <Form.Select style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listStatus.map((item,index)=> (
                                                    <option key={index}>{item.name}</option>
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
                                            <Form.Select style={{width: "50%"}} required>
                                                <option value="">--Tất Cả--</option>
                                                {listGender.map((item,index)=> (
                                                    <option key={index}>{item.name}</option>
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
                                <th style={{width: "5%", textAlign: "center"}}>
                                    <input type="checkbox"/>
                                    <span>STT</span>
                                </th>
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
                                            <td style={{textAlign: "center"}}>
                                                <input type="checkbox"/>
                                                {index+1}
                                            </td>
                                            <td>2</td>
                                            <td>{item.product_name}</td>
                                            <td style={{textAlign: "center"}}>{item.product_detail_quantity}</td>
                                            <td style={{textAlign: "center"}}>{item.product_detail_sell_price}</td>
                                            <td style={{textAlign: "center"}}>{item.product_detail_size_name}</td>
                                            <td style={{textAlign: "center"}}>

                                            </td>
                                            <td style={{textAlign: "center", justifyContent: "center", color: "#fff", borderRadius: "5px"}}>
                                                <span style={{backgroundColor: "#68ae6b", padding: "7px", borderRadius: "10px"}}>{item.product_detail_status}</span>
                                            </td>
                                            <td style={{textAlign: "center"}}>
                                                <i className="fa-regular fa-pen-to-square actionEdit"></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor: "#fff"}}>
                            <div style={{display: "flex", justifyContent: "end", alignItems: "center"}}>
                                <i style={{marginRight: "15px", cursor: "pointer", color: "#fa0307"}}
                                   className="fa-solid fa-angle-left"></i>
                                <span className={"actionPage page"} style={{
                                    cursor: "pointer",
                                    padding: "3px 10px",
                                    borderRadius: "5px",
                                    textAlign: "center",
                                    margin: "3px",
                                    color: "#fa0307"
                                }}>1</span>
                                <i style={{marginLeft: "15px", cursor: "pointer", color: "#fa0307"}}
                                   className="fa-solid fa-angle-right"></i>
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </>
    )
}

export default ProductDetail