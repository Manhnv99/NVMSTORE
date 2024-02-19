import "./style/AddDiscount.css"
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import Paging from "../../../../utils/Paging";

const AddDiscount=()=>{
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
                                                    <input type="checkbox"/>
                                                    <span style={{marginLeft: "10px"}}>STT</span>
                                                </th>
                                                <th style={{width: "35%", textAlign: "center"}}>Mã Sản Phẩm</th>
                                                <th style={{width: "35%", textAlign: "center"}}>Tên Sản Phẩm</th>
                                                <th style={{width: "20%", textAlign: "center"}}>Trạng Thái</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr style={{fontSize: "15px"}}>
                                                <td style={{textAlign: "center"}}>
                                                    <input type="checkbox"/>
                                                    <span style={{marginLeft: "10px"}}>1</span>
                                                </td>
                                                <td style={{textAlign: "center"}}>2</td>
                                                <td style={{textAlign: "center"}}>
                                                    2
                                                    {/*{moment(item.updated_at).format("YYYY-MM-DD hh:mm:ss")}*/}
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
                                                    }}>Đang sử dụng</span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    <Card.Footer style={{backgroundColor: "#fff"}}>
                                        <Paging/>
                                    </Card.Footer>
                                </Card>
                            </div>
                            <div className="create-discount-rightside-product" style={{marginTop:"30px"}}>
                                <span className="create-discount-rightside-title">Sản Phẩm</span>
                                <Card>
                                    <Card.Body style={{padding: "0"}}>
                                        <Table style={{marginBottom: "0"}}>
                                            <thead>
                                            <tr style={{fontSize: "13px", fontWeight: "600"}}>
                                                <th style={{width: "10%", textAlign: "center"}}>
                                                    <input type="checkbox"/>
                                                    <span style={{marginLeft: "10px"}}>STT</span>
                                                </th>
                                                <th style={{width: "30%", textAlign: "center"}}>Tên Sản Phẩm</th>
                                                <th style={{width: "20%", textAlign: "center"}}>Giới Tính</th>
                                                <th style={{width: "20%", textAlign: "center"}}>Kích Thước Màu Sắc</th>
                                                <th style={{width: "20%", textAlign: "center"}}>Trạng Thái</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr style={{fontSize: "15px"}}>
                                                <td style={{textAlign: "center"}}>
                                                    <input type="checkbox"/>
                                                    <span style={{marginLeft: "10px"}}>1</span>
                                                </td>
                                                <td style={{textAlign: "center"}}>2</td>
                                                <td style={{textAlign: "center"}}>
                                                    <span>nam</span>
                                                </td>
                                                <td style={{textAlign: "center"}}>
                                                    <span>2</span>
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
                                                    }}>Đang sử dụng</span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                    <Card.Footer style={{backgroundColor: "#fff"}}>
                                    <Paging/>
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