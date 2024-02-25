import "./style/BanHang.css"
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {NumericFormat} from "react-number-format";
import {useEffect, useState} from "react";
import PayModal from "./Modal/PayModal";
import ChooseProduct from "./Modal/ChooseProduct";
import ImageProductAPI from "../../../services/ProductAPI/Image_Product_API/ImageProductAPI";
import OrderAPI from "../../../services/OrderAPI/OrderAPI";
import {useDispatch, useSelector} from "react-redux";
import {toastMessage} from "../../../../redux/slices/ToastMsgSlice";

const BanHang=()=>{
    //dispatch
    const dispatch = useDispatch();
    //state
    const [slideImage,setSlideImage] = useState(0);
    const [currentOrder_Id,setCurrentOrder_Id] = useState(undefined);
    //state List
    const [listProductDetail,setListProductDetail] = useState([]);
    const [listImageProduct,setListImageProduct] = useState([]);
    const [listOrderPending,setListOrderPending] = useState([]);
    //message
    const toastSuccess=useSelector(state => state.toastmsg.toastSuccess);
    const toastWarning=useSelector(state => state.toastmsg.toastWarning);
    const toastError=useSelector(state => state.toastmsg.toastError);
    //state Modal
    const [openPayModal,setOpenPayModal] = useState(false);
    const [openModalChooseProduct,setOpenModalChooseProduct] = useState(false);
    const [runInSecondRerender,setRunInSecondRerender] = useState(1);


    useEffect(() => {
        getAllImageProduct();
        callListOrderPending();
    }, []);


    //set All ImageProduct
    useEffect(()=>{
        let count=0;
        let interval_id=undefined;
        if(listProductDetail.length > 0){
            interval_id = setInterval(()=>{
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
        }

        return(()=>{
            clearInterval(interval_id);
        })
    },[listProductDetail])

    useEffect(()=>{
        if(runInSecondRerender === 2){
            const order_active = document.querySelectorAll(".order-active");
            order_active.forEach(item=>{
                if(item.classList.contains("order-default-active")){
                    item.classList.remove("order-default-active")
                }
            })
            order_active[listOrderPending.length - 1].classList.add("order-default-active");
        }
    },[listOrderPending])


    //call List
    const callListOrderPending= async ()=>{
        try {
            const response = await OrderAPI.list_Order_Pending();
            if(response && response.status === 200){
                if(response.data.length > 0){
                    setCurrentOrder_Id(response.data[0]);
                }
                setListOrderPending(response.data);
            }
        }catch (e) {
            console.log(e);
        }
    }

    //addActive
    const handleAddActiveOrder=(e,order_id)=>{
        const list_oder= document.querySelectorAll(".list-order ul li");
        //add Active
        list_oder.forEach(item=>{
            if(item.classList.contains("order-default-active")){
                item.classList.remove("order-default-active");
                e.target.classList.add("order-default-active");
            }
        })
        //set Current_Order
        setCurrentOrder_Id(order_id);
    }


    //handle function

    const getAllImageProduct= async ()=>{
        try {
            const response = await ImageProductAPI.getAllImage();
            if(response && response.status === 200){
                setListImageProduct(response.data);
            }
        }catch (e) {
            console.log(e)
        }
    }

    const handleTurnOnDelivery=()=>{
        const toggle= document.querySelector("#delivery-toggle");
        const postpaid= document.querySelector(".postpaid");
        const customer_infor= document.querySelector(".customer-infor");
        if(toggle.checked === false){
            //on
            postpaid.style.display = "flex";
            customer_infor.style.display = "block";
        }else{
            //off
            postpaid.style.display = "none";
            customer_infor.style.display = "none";
        }
    }

    const handlePostDefaultOrder= async ()=>{
        try {
            const response = await OrderAPI.post_Default_Order();
            if(response && response.status === 201){
                const res = await OrderAPI.list_Order_Pending();
                setCurrentOrder_Id(res.data[res.data.length - 1]);
                console.log(res.data)
                setListOrderPending(res.data);
                setRunInSecondRerender(2);
            }
        }catch (e) {
            const toastMsg={...toastError}
            toastMsg.message=e.response.data.overOrder_pending;
            dispatch(toastMessage(toastMsg));
        }
    }

    const handleChooseProductDetail=(product_detail)=>{
        let isDuplicate = false;
        let index_product_detail_duplicate = 0;

        listProductDetail.forEach((item,index)=>{
            if(item.product_detail_id === product_detail.product_detail_id && item.order_id === currentOrder_Id){
                isDuplicate=true;
                index_product_detail_duplicate=index;
            }
        })

        if(isDuplicate){
            //duplicate === true => update quantity ++1
            const newListProductDetail = [...listProductDetail];
            newListProductDetail[index_product_detail_duplicate].quantity_pay++;
            setListProductDetail(newListProductDetail);
        }else{
            //duplicate === false => push
            const newListProductDetail = [...listProductDetail];
            product_detail.order_id=currentOrder_Id;
            newListProductDetail.push(product_detail);
            setListProductDetail(newListProductDetail);
        }
    }

    const handleMinusQuantityPay=(product_detail,index)=>{
        if(product_detail.quantity_pay !== 1){
            const newProductDetail = {...product_detail};
            const newListProductDetail = [...listProductDetail];

            newListProductDetail.forEach((pd,location)=>{
                if(pd.product_detail_id === newProductDetail.product_detail_id && pd.order_id === currentOrder_Id){
                    newProductDetail.quantity_pay--;
                    newListProductDetail.splice(location,1,newProductDetail);
                    setListProductDetail(newListProductDetail);
                }
            })
        }
    }
    const handlePlusQuantityPay=(product_detail)=>{
        const newProductDetail = {...product_detail};
        const newListProductDetail = [...listProductDetail];

        newListProductDetail.forEach((pd,location)=>{
            if(pd.product_detail_id === newProductDetail.product_detail_id && pd.order_id === currentOrder_Id){
                newProductDetail.quantity_pay++;
                newListProductDetail.splice(location,1,newProductDetail);
                setListProductDetail(newListProductDetail);
            }
        })
    }
    //onChange
    const onChangeQuantityPay=(e,product_detail,index)=>{
        const newProductDetail = {...product_detail};
        const newListProductDetail = [...listProductDetail];

        newListProductDetail.forEach((pd,location)=>{
            if(pd.product_detail_id === newProductDetail.product_detail_id && pd.order_id === currentOrder_Id){
                newProductDetail.quantity_pay = Number(e.target.value);
                newListProductDetail.splice(location,1,newProductDetail);
                setListProductDetail(newListProductDetail);
            }
        })
    }

    return(
        <>
            {openModalChooseProduct && <ChooseProduct setOpenModalChooseProduct={setOpenModalChooseProduct} handleChooseProductDetail={handleChooseProductDetail}/>}
            {openPayModal && <PayModal setOpenPayModal={setOpenPayModal}/>}
            <Container>
                <div className="sale-counter-container">
                    <Row>
                        <Col sm={12} style={{display:"flex",justifyContent:"end",paddingRight:"50px"}}>
                            <Button onClick={handlePostDefaultOrder}>
                                <i className="fa-solid fa-plus"></i>
                                <span style={{marginLeft:"5px"}}>Tạo Hóa Đơn</span>
                            </Button>
                        </Col>
                        <Col sm={12}>
                            <div className="sale-counter-order">
                                <div className="list-order">
                                    <ul>
                                        {listOrderPending.map((item,index)=>{
                                            if(index === 0){
                                                return (
                                                    <li onClick={(e) => {handleAddActiveOrder(e, item)}} className="order-default-active order-active">Hóa đơn {index + 1}</li>
                                                )
                                            }else{
                                                return (
                                                    <li onClick={(e) => {handleAddActiveOrder(e, item)}} className="order-active">Hóa đơn {index + 1}</li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                            {/**/}
                            <div className="order-actions">
                                <div style={{marginLeft:"20px"}}>
                                    <Button>Danh Sách</Button>
                                </div>
                                <div style={{marginRight:"20px"}}>
                                    <Button onClick={()=>{console.log(listProductDetail)}}>
                                        <i class="fa-solid fa-qrcode"></i>
                                        <span style={{marginLeft:"5px"}}>QR Code</span>
                                    </Button>
                                    <Button onClick={()=>{setOpenModalChooseProduct(true)}} style={{marginLeft:"10px"}}>Thêm Sản Phẩm</Button>
                                </div>
                            </div>
                            {/*Giỏ hàng*/}
                            <div className="order-list-product">
                                {listProductDetail.length > 0 ?
                                    <Table style={{margin:"20px 0"}}>
                                        <thead>
                                        <tr style={{fontSize: "13px", fontWeight: "600"}}>
                                            <th style={{width: "10%", textAlign: "center"}}>STT</th>
                                            <th style={{width: "10%", textAlign: "center"}}>Ảnh</th>
                                            <th style={{width: "35%", textAlign: "center"}}>Sản phẩm</th>
                                            <th style={{width: "20%", textAlign: "center"}}>Số lượng</th>
                                            <th style={{width: "15%", textAlign: "center"}}>Tổng tiền</th>
                                            <th style={{width: "10%", textAlign: "center"}}>Hành Động</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {listProductDetail.filter(pd=>pd.order_id === currentOrder_Id).map((item,index)=> (
                                            <tr style={{fontSize: "11px"}}>
                                                <td style={{textAlign: "center"}}>{index+1}</td>
                                                <td style={{textAlign: "center"}}>
                                                    {listImageProduct.length > 0 ?
                                                        <img style={{
                                                            width: "100%",
                                                            height: "100px",
                                                            objectFit: "contain",
                                                            borderRadius: "50%" }} className="slideImage" src={listImageProduct.filter(image=>image.product_Detail_id===item.product_detail_id)[slideImage].imageURL} alt="Ảnh sản phẩm"/> : ""
                                                    }
                                                </td>
                                                <td className="order-infor-product">
                                                    <p>{item.product_name + "[" + item.product_detail_size_name + "-" + item.product_detail_color_name +"]"}</p>
                                                    <p>{item.product_detail_sell_price.toLocaleString("vi-VN",{minimumFractionDigits:0,maximumFractionDigits:0})} VNĐ</p>
                                                    <p>Kích cỡ: {item.product_detail_size_name}</p>
                                                    <p>x{item.quantity_pay}</p>
                                                </td>
                                                <td style={{textAlign: "center"}}>
                                                    <div className="order-quantity-product">
                                                        <span onClick={()=>{handleMinusQuantityPay(item,index)}}><i className="fa-solid fa-minus"></i></span>
                                                        <input onChange={(e)=>{onChangeQuantityPay(e,item,index)}} value={item.quantity_pay} type="number"/>
                                                        <span onClick={()=>{handlePlusQuantityPay(item,index)}}><i className="fa-solid fa-plus"></i></span>
                                                    </div>
                                                </td>
                                                <td style={{textAlign: "center"}}>
                                                    <span style={{fontWeight: "700", color: "red", fontSize: "13px"}}>
                                                        {(item.product_detail_sell_price * item.quantity_pay).toLocaleString("vi-VN",{minimumFractionDigits:0,maximumFractionDigits:0})} VNĐ
                                                    </span>
                                                </td>
                                                <td style={{textAlign: "center"}}>
                                                    <i className="pay-delete fa-solid fa-trash"></i>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table> :
                                    <div className="order-list-empty text-center">
                                        <img src="/empty-cart.png" alt="Không có sản phẩm nào!"/>
                                        <p style={{margin: "30px 0 0 0"}}>Hiện tại không có sản phẩm nào trong giỏ</p>
                                    </div>
                                }
                            </div>
                            {/**/}
                            <div className="order-account-container">
                                <div style={{borderBottom: "1px solid #999"}}>
                                    <div className="order-account">
                                        <span>Tài khoản</span>
                                        <span>Chọn tài khoản</span>
                                    </div>
                                </div>
                                <div className="order-customer">
                                    <div className="retail-customer" hidden>
                                        <span>Tên khách hàng:</span>
                                        <span>Khách lẻ</span>
                                    </div>
                                    <div className="non-retail-customer">
                                        <Row>
                                            <Col sm={2}>
                                                <span>Tên khách hàng:</span>
                                                <span>Số điện thoại:</span>
                                                <span>Email:</span>
                                            </Col>
                                            <Col sm={8}>
                                                <span>Nguyễn Vĩ Mạnh</span>
                                                <span>0343144320</span>
                                                <span>nguyenvimanhnqt@gmail.com</span>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                            {/**/}
                            <div>
                                <div style={{borderBottom: "1px solid #999"}}>
                                    <div style={{margin:"20px 10px 10px 10px"}}>
                                        <span style={{fontWeight:"700",fontSize:"20px",cursor:"default"}}>Khách hàng</span>
                                    </div>
                                </div>
                                <Row style={{marginTop:"20px"}}>
                                    <Col sm={7} style={{marginTop:"8px"}}>
                                        <div className="customer-infor">
                                            {/**/}
                                            <Form.Group className="mb-4">
                                                <Form.Control required type="text" placeholder="Nhập họ và tên!"/>
                                                <Form.Control.Feedback type={"invalid"}>
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            {/**/}
                                            <Form.Group className="mb-4">
                                                <Form.Control required type="text" placeholder="Nhập số điện thoại!"/>
                                                <Form.Control.Feedback type={"invalid"}>
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            {/**/}
                                            <Form.Group className="mb-4">
                                                <Form.Control required type="text" placeholder="Nhập email!"/>
                                                <Form.Control.Feedback type={"invalid"}>
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            {/**/}
                                            <Form.Group className="mb-4">
                                                <Form.Control required type="text" placeholder="Nhập địa chỉ!"/>
                                                <Form.Control.Feedback type={"invalid"}>
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="mb-4">
                                                <Row>
                                                    <Col sm={4}>
                                                        <Form.Select>
                                                            <option value="">Tất cả</option>
                                                            <option value="1">Sắp Áp Dung</option>
                                                            <option value="2">Đang Áp Dụng</option>
                                                            <option value="3">Quá Hạn</option>
                                                        </Form.Select>
                                                        <Form.Control.Feedback type={"invalid"}>
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Form.Select>
                                                            <option value="">Tất cả</option>
                                                            <option value="1">Sắp Áp Dung</option>
                                                            <option value="2">Đang Áp Dụng</option>
                                                            <option value="3">Quá Hạn</option>
                                                        </Form.Select>
                                                        <Form.Control.Feedback type={"invalid"}>
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Form.Select>
                                                            <option value="">Tất cả</option>
                                                            <option value="1">Sắp Áp Dung</option>
                                                            <option value="2">Đang Áp Dụng</option>
                                                            <option value="3">Quá Hạn</option>
                                                        </Form.Select>
                                                        <Form.Control.Feedback type={"invalid"}>
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <Form.Group>
                                                <div style={{ display: 'flex', alignItems: 'start' }}>
                                                    <textarea placeholder="Nhập mô tả!" style={{width:"100%",height:"100px",fontSize:"15px",border:"1px solid #999",borderRadius:"5px",outline:"none",paddingLeft:"10px"}}></textarea>
                                                </div>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col sm={5}>
                                        <div style={{paddingRight: "15px"}}>
                                            <div className="infor-payment">
                                                <i className="fa-solid fa-bag-shopping"></i>
                                                <span>Thông tin thanh toán</span>
                                            </div>
                                            {/**/}
                                            <div className="customer-payment-container">
                                                <div className="customer-payment">
                                                    <span>Khách thanh toán:</span>
                                                    <span onClick={()=>{setOpenPayModal(true);}}><i className="fa-solid fa-wallet"></i></span>
                                                </div>
                                                <span style={{fontWeight: "700", fontSize: "15px"}}>0 VNĐ</span>
                                            </div>
                                            {/**/}
                                            <div className="customer-voucher-container">
                                                <div className="customer-voucher">
                                                    <span>Mã giảm giá:</span>
                                                    <span>VC1</span>
                                                </div>
                                                <span className="customer-choose-voucher">Chọn Mã</span>
                                            </div>
                                            {/**/}
                                            <div className="postpaid">
                                                <span style={{fontWeight: "700", fontSize: "15px"}}>Trả sau:</span>
                                                <div style={{marginLeft:"57px"}} className="toggle-container">
                                                    <input type="checkbox" id="pay-toggle" hidden/>
                                                    <label htmlFor="pay-toggle"></label>
                                                </div>
                                            </div>
                                            {/**/}
                                            <div style={{margin: "20px 0", display: "flex", alignItems: "center"}}>
                                                <span style={{fontWeight: "700", fontSize: "15px"}}>Giao hàng:</span>
                                                <div className="toggle-container">
                                                    <input type="checkbox" id="delivery-toggle" hidden/>
                                                    <label onClick={handleTurnOnDelivery} htmlFor="delivery-toggle"></label>
                                                </div>
                                            </div>
                                            {/**/}
                                            <div style={{margin: "20px 0", display: "flex", justifyContent: "space-between"}}>
                                                <span style={{fontWeight: "700", fontSize: "15px"}}>Tiền hàng</span>
                                                <span style={{fontWeight: "700", fontSize: "15px"}}>1,000,000 VNĐ</span>
                                            </div>
                                            {/**/}
                                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                                <span
                                                    style={{fontWeight: "700", fontSize: "15px"}}>Phí vận chuyển</span>
                                                <NumericFormat value={0} style={{padding: "5px 10px", borderRadius: "5px", border: "1px solid #dee2e6", outline: "none", fontSize: "15px"}} placeholder={"Điền phí vận chuyển!"}
                                                               thousandSeparator={true} suffix={"VNĐ"}/>
                                            </div>
                                            {/**/}
                                            <div style={{margin: "20px 0", display: "flex", justifyContent: "space-between"}}>
                                                <span style={{fontWeight: "700", fontSize: "15px"}}>Giảm giá</span>
                                                <span style={{fontWeight: "700", fontSize: "15px"}}>300,000 VNĐ</span>
                                            </div>
                                            {/**/}
                                            <div className="point-customer">
                                                <span style={{fontWeight: "700", fontSize: "15px"}}>Điểm hiện tại là 100:</span>
                                                <div className="toggle-container">
                                                    <input type="checkbox" id="point-toggle" hidden/>
                                                    <label htmlFor="point-toggle"></label>
                                                </div>
                                            </div>
                                            {/**/}
                                            <div style={{margin: "30px 0", display: "flex", justifyContent: "space-between"}}>
                                                <span style={{fontWeight: "700", fontSize: "15px"}}>Tổng tiền</span>
                                                <span style={{fontWeight: "700", fontSize: "18px", color: "red"}}>700,000 VNĐ</span>
                                            </div>
                                            {/**/}
                                            <div style={{margin: "50px 0 20px 0", display: "flex", justifyContent: "end"}}>
                                                <Button style={{color: "white", backgroundColor: "black", border: "1px solid black"}}>Xác nhận thanh toán</Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    )
}

export default BanHang