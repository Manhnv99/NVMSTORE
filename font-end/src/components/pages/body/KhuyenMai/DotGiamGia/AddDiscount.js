import "./style/AddDiscount.css"
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import Paging from "../../../../utils/Paging";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {getAllProductDetail} from "../../../../../redux/slices/product/ProductDetailSlice";
import {fetchProductResponse} from "../../../../../redux/slices/product/ProductSlice";
import productDetailAPI from "../../../../services/ProductAPI/Product_Detail_API/ProductDetailAPI";
import productAPI from "../../../../services/ProductAPI/ProductAPI";
import product from "../../SanPham/Product";

const AddDiscount=()=>{
    //dispatch
    const dispatch=useDispatch();
    //state store
    const listProduct=useSelector(state => state.product.listProduct);
    const listProductDetail=useSelector(state => state.productDetail.listProductDetail);
    //totalPage
    const [totalPageProduct,setTotalPageProduct]=useState(undefined);
    const [totalPageProductDetail,setTotalPageProductDetail]=useState(undefined);
    //state
    const [product_id,setProduct_id]=useState(1);
    //choose product detail
    const [listChooseProductDetail,setListChooseProductDetail]=useState([]);


    useEffect(() => {
        getListProduct(1);
        getTotalPageProduct();
    }, []);

    //get List Product
    const getListProduct=(page)=>{
        dispatch(fetchProductResponse(page));
    }

    // get List ProductDetail
    const getListProductDetail=(page)=>{
        dispatch(getAllProductDetail({
            product_id:product_id,
            page:page
        }));
    }

    //set Total Page

    const getTotalPageProduct=useCallback(async ()=>{
        try {
            const response=await productAPI.getTotalPageProductResponse();
            setTotalPageProduct(response.data);
        }catch (e) {
            console.log(e);
        }
    })

    const getTotalPageProductDetail=useCallback(async (product_id)=>{
        try {
            const response = await productDetailAPI.getTotalPageProductDetailResponse(product_id);
            setTotalPageProductDetail(response.data);
        }catch (e) {
            console.log(e)
        }
    })

    //handle

    const handleShowProductDetail=(product_id,index)=>{
        const checkBoxProduct=document.querySelectorAll(".checkBoxProduct");
        checkBoxProduct.forEach(item=>{
            item.checked=false;
        })
        checkBoxProduct[index].checked=true;
        setProduct_id(product_id);
        dispatch(getAllProductDetail({
            product_id:product_id,
            page:1
        }));
        getTotalPageProductDetail(product_id);
    }

    const handleChooseProductDetail=(product_detail_id)=>{
        const checkBoxProductDetail=document.querySelectorAll(".checkBoxProductDetail");
        
    }

    return(
        <>
            <Container>
                <Row style={{marginTop:"30px"}} className="create-discount-container">
                    <Col sm={3}>
                        <div className="create-discount-leftside">
                            <h1 className="create-discount-leftside-title text-center">Thêm đợt giảm giá</h1>
                            <div className="discount-form">
                                <Form.Group className="mt-4">
                                    <Form.Label><span style={{color: "red"}}>*</span> Tên khuyến mãi</Form.Label>
                                    <Form.Control required type="text" placeholder="Tên khuyến mãi"/>
                                    <Form.Control.Feedback type={"invalid"}>

                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mt-4">
                                    <Form.Label><span style={{color: "red"}}>*</span> Giá trị giảm</Form.Label>
                                    <Form.Control required type="text" placeholder="Giá trị giảm"/>
                                    <Form.Control.Feedback type={"invalid"}>

                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mt-4">
                                    <Form.Label><span style={{color: "red"}}>*</span> Ngày bắt đầu</Form.Label>
                                    <Form.Control required type="date"/>
                                    <Form.Control.Feedback type={"invalid"}>

                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mt-4">
                                    <Form.Label><span style={{color: "red"}}>*</span> Ngày kết thúc</Form.Label>
                                    <Form.Control required type="date"/>
                                    <Form.Control.Feedback type={"invalid"}>

                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className="create-discount-add">
                                    <Button>Thêm</Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={9}>
                        <div className="create-discount-rightside">
                            <div className="create-discount-rightside-product">
                                <span className="create-discount-rightside-title">Sản Phẩm</span>
                                <Card>
                                    <Card.Body style={{padding: "0"}}>
                                        <Table style={{marginBottom: "0"}}>
                                            <thead>
                                            <tr style={{fontSize: "13px", fontWeight: "600"}}>
                                                <th style={{width: "10%", textAlign: "center"}}>
                                                    <span style={{marginLeft: "10px"}}>STT</span>
                                                </th>
                                                <th style={{width: "35%", textAlign: "center"}}>Mã Sản Phẩm</th>
                                                <th style={{width: "35%", textAlign: "center"}}>Tên Sản Phẩm</th>
                                                <th style={{width: "20%", textAlign: "center"}}>Trạng Thái</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {listProduct.map((item,index)=>{
                                                    return(
                                                        <tr style={{fontSize: "15px"}}>
                                                            <td style={{textAlign: "center"}}>
                                                                <input className="checkBoxProduct" onClick={()=>{handleShowProductDetail(item.product_id,index)}} type="checkbox"/>
                                                                <span style={{marginLeft: "10px"}}>{index+1}</span>
                                                            </td>
                                                            <td style={{textAlign: "center"}}>{item.product_code}</td>
                                                            <td style={{textAlign: "center"}}>{item.product_name}</td>
                                                            <td style={{textAlign: "center", justifyContent: "center", color: "#fff", borderRadius: "5px"}}>
                                                                <span style={{
                                                                    backgroundColor: "#68ae6b",
                                                                    padding: "7px 20px",
                                                                    borderRadius: "5px"
                                                                }}>{item.status ? "Đang sử dụng" : "Ngưng sử dụng"}</span>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    <Card.Footer style={{backgroundColor: "#fff"}}>
                                        <Paging TotalPage={totalPageProduct} APIPaging={getListProduct}/>
                                    </Card.Footer>
                                </Card>
                            </div>
                            <div className="create-discount-rightside-product" style={{marginTop:"30px"}}>
                                <span className="create-discount-rightside-title">Sản Phẩm Chi Tiết</span>
                                <Card>
                                    <Card.Body style={{padding: "0"}}>
                                        <Table style={{marginBottom: "0"}}>
                                            <thead>
                                            <tr style={{fontSize: "13px", fontWeight: "600"}}>
                                                <th style={{width: "10%", textAlign: "center"}}>
                                                    <input type="checkbox"/>
                                                    <span style={{marginLeft: "10px"}}>STT</span>
                                                </th>
                                                <th style={{width: "20%", textAlign: "center"}}>Tên Sản Phẩm</th>
                                                <th style={{width: "10%", textAlign: "center"}}>Giới Tính</th>
                                                <th style={{width: "20%", textAlign: "center"}}>Kích Thước</th>
                                                <th style={{width: "20%", textAlign: "center"}}> Màu Sắc</th>
                                                <th style={{width: "20%", textAlign: "center"}}>Trạng Thái</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {listProductDetail.map((item,index)=>{
                                                return(
                                                    <tr style={{fontSize: "15px"}}>
                                                        <td style={{textAlign: "center"}}>
                                                            <input onClick={()=>{handleChooseProductDetail(item.product_detail_id)}} className="checkBoxProductDetail" type="checkbox"/>
                                                            <span style={{marginLeft: "10px"}}>{index+1}</span>
                                                        </td>
                                                        <td style={{textAlign: "center"}}>{item.product_name}</td>
                                                        <td style={{textAlign: "center"}}>{item.product_detail_gender}</td>
                                                        <td style={{textAlign: "center"}}>{item.product_detail_size_name}</td>
                                                        <td style={{textAlign: "center"}}>
                                                            <span style={{backgroundColor:item.product_detail_color_code,color:item.product_detail_color_code,display:"block",border:"1px solid #999",borderRadius:"10px",cursor:"default"}}>.</span>
                                                        </td>
                                                        <td style={{
                                                            textAlign: "center",
                                                            justifyContent: "center",
                                                            color: "#fff",
                                                            borderRadius: "5px"
                                                        }}>
                                                            <span style={{
                                                                backgroundColor: "#68ae6b",
                                                                padding: "7px 20px",
                                                                borderRadius: "5px"
                                                            }}>{item.product_detail_status}</span>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    <Card.Footer style={{backgroundColor: "#fff"}}>
                                    <Paging TotalPage={totalPageProductDetail} APIPaging={getListProductDetail}/>
                                    </Card.Footer>
                                </Card>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AddDiscount;