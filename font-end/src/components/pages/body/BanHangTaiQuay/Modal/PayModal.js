import "../style/PayModal.css"
import {Button, Card, Col, Form, Modal, Row, Table} from "react-bootstrap";
import {NumericFormat} from "react-number-format";
import {useState} from "react";
import moment from "moment";
import Paging from "../../../../utils/Paging";

const PayModal=(props)=>{
    //state
    const [show,setShow]=useState(true);

    const handleClose=()=>{
        setShow(false);
        setTimeout(()=>{
            props.setOpenPayModal(false);
        },200)
    }

    return(
        <>
            {/*Modal*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thanh toán</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/**/}
                    <Form.Group className="mb-2">
                        <Form.Label><span style={{color: "red"}}>*</span> Số tiền</Form.Label>
                        <NumericFormat value={1000000} style={{width:"100%",padding: "0.375rem 0.75rem",borderRadius:"5px",border:"1px solid #dee2e6",outline:"none",fontSize:"16px"}}
                                       thousandSeparator={true} suffix={"VNĐ"} disabled/>
                    </Form.Group>
                    {/**/}
                    <div className="kind-of-pay">
                        <div style={{width: "50%"}}>
                            <button>Tiền mặt</button>
                        </div>
                        <div style={{width: "50%"}}>
                            <button>Chuyển khoản</button>
                        </div>
                    </div>
                    {/**/}
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <span style={{fontWeight:"700",fontSize:"15px"}}>Tiền thừa</span>
                        <span style={{fontWeight:"700",fontSize:"16px",color:"red"}}>1,000,000 VNĐ</span>
                    </div>
                    {/*Table*/}
                    <Table style={{margin:"20px 0"}}>
                        <thead>
                        <tr style={{fontSize: "13px", fontWeight: "600"}}>
                            <th style={{width: "10%", textAlign: "center"}}>STT</th>
                            <th style={{width: "30%", textAlign: "center"}}>Mã Giao Dịch</th>
                            <th style={{width: "20%", textAlign: "center"}}>Số Tiền</th>
                            <th style={{width: "20%", textAlign: "center"}}>Phương Thức</th>
                            <th style={{width: "20%", textAlign: "center"}}>Hành Động</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr style={{fontSize: "11px"}}>
                                <td style={{textAlign: "center"}}>1</td>
                                <td style={{textAlign: "center"}}>2</td>
                                <td style={{textAlign: "center"}}>3</td>
                                <td style={{textAlign: "center"}}>
                                    <span className="pay-method">Tiền mặt</span>
                                </td>
                                <td style={{textAlign: "center"}}>
                                    <i className="pay-delete fa-solid fa-trash"></i>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    {/**/}
                    <div style={{display: "flex", justifyContent: "space-between",margin:"10px 0"}}>
                        <span style={{fontWeight: "700", fontSize: "15px"}}>Khách thanh toán</span>
                        <span style={{fontWeight: "700", fontSize: "16px", color: "red"}}>1,000,000 VNĐ</span>
                    </div>
                    {/**/}
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <span style={{fontWeight: "700", fontSize: "15px"}}>Tiền thừa</span>
                        <span style={{fontWeight: "700", fontSize: "16px", color: "blue"}}>0 VNĐ</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Hủy</Button>
                    <Button variant="primary">Xác nhận</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PayModal