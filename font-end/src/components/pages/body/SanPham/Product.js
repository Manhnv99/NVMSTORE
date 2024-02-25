import "./style/Product.css"
import {Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductResponse, setListProduct} from "../../../../redux/slices/product/ProductSlice";
import Loading from "../../loading/Loading";
import Paging from "../../../utils/Paging";
import productAPI from "../../../services/ProductAPI/ProductAPI";



const Product=()=>{
    //state
    const [totalPage,setTotalPage]=useState(undefined);
    const [input,setInput]=useState('');
    //action
    const [whatAction,setWhatAction]=useState("normal");
    //nav
    const nav=useNavigate();
    //dispatch
    const dispatch=useDispatch();
    //List
    const listProduct=useSelector(state => state.product.listProduct);
    //loading
    const isLoading=useSelector(state => state.product.isLoading);
    const [loading,setLoading]=useState(false);


    useEffect(() => {
        getTotalPage();
        dispatch(fetchProductResponse(1));
    }, []);

    const getTotalPage= async ()=>{
        try {
            const response=await productAPI.getTotalPageProduct();
            setTotalPage(response.data);
        }catch (e) {
            console.log(e);
        }
    }

    const handleSearch= async ()=>{
        try {
            const response= await productAPI.searchProduct(input,1);
            dispatch(setListProduct(response.data));
            const totalPage=await productAPI.getTotalPageSearchProduct(input);
            setTotalPage(totalPage.data);
            setWhatAction("search");
        }catch (e) {
            console.log(e)
        }
    }

    const handleAPISearchPaging= async (page)=>{
        setLoading(true);
        try {
            const response= await productAPI.searchProduct(input,page);
            dispatch(setListProduct(response.data));
            setLoading(false);
        }catch (e) {
            setLoading(false);
            console.log(e)
        }
    }

    const handleAPIPaging=(page)=>{
        dispatch(fetchProductResponse(page));
    }



    return(
        <>
            {isLoading && <Loading/>}
            <Container>
                <div className="base-header">
                    <i className="fa-solid fa-box-open"></i>
                    <span>Quản Lý Sản Phẩm</span>
                </div>
                <div className="base-filter">
                    <div className="title-filter">
                        <i className="fa-solid fa-filter"></i>
                        <span>Bộ lọc</span>
                    </div>
                    <div className="filter-body">
                        <Row>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Tìm kiếm</Form.Label>
                                    <Form.Control value={input} onChange={(e)=>{setInput(e.target.value)}} required type="text"/>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Trạng Thái</Form.Label>
                                    <Form.Select className={"statusDOC"}>
                                        <option value="">Tất cả</option>
                                        <option value="true">Đang sử dụng</option>
                                        <option value="false">Ngưng sử dụng</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} style={{textAlign:"center",marginTop:"50px"}}>
                                <button onClick={handleSearch} className="handleFilter">Tìm kiếm</button>
                                <button onClick={()=>{setInput('')}} className="handleClear">Làm mới bộ lọc</button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="base-body">
                    <div className="base-body-title">
                        <div className={"base-body-title-left"}>
                            <i className="fa-solid fa-list"></i>
                            <span>Danh sách sản phẩm</span>
                        </div>
                        <div className={"base-body-title-right"}>
                            <button onClick={()=>{nav("/add-product-management")}} className={"btn btn-primary"}>
                                <i className="fa-solid fa-plus"></i>
                                <span style={{marginLeft: "5px"}}>Thêm sản phẩm</span>
                            </button>
                        </div>
                    </div>
                    <Card style={{marginTop: "30px"}}>
                        <Card.Body style={{padding:"0"}}>
                            <Table style={{marginBottom:"0"}}>
                                <thead>
                                <tr style={{fontSize: "13px", fontWeight: "600"}}>
                                    <th style={{width: "5%", textAlign: "center"}}>STT</th>
                                    <th style={{width: "15%"}}>Mã Sản Phẩm</th>
                                    <th style={{width: "35%"}}>Tên Sản Phẩm</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Số Lượng Tồn</th>
                                    <th style={{width: "15%", textAlign: "center"}}>Trạng Thái</th>
                                    <th style={{width: "20%", textAlign: "center"}}>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {listProduct.map((product,index)=>{
                                    return(
                                        <tr style={{fontSize: "15px"}}>
                                            <td style={{textAlign: "center"}}>{index+1}</td>
                                            <td>{product.product_code}</td>
                                            <td>{product.product_name}</td>
                                            <td style={{textAlign: "center"}}>{product.sum_quantity}</td>
                                            <td style={{textAlign: "center", justifyContent: "center", color: "#fff", borderRadius: "5px"}}>
                                                <span style={{backgroundColor: "#68ae6b", padding: "7px 20px", borderRadius: "5px"}}>Đang kinh doanh</span>
                                            </td>
                                            <td style={{textAlign: "center"}}>
                                                <i onClick={()=>{nav(`/product-detail-management/${product.product_id}`)}} className="fa-regular fa-pen-to-square actionEdit"></i>
                                            </td>
                                        </tr>
                                    )
                                })}
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

export default Product