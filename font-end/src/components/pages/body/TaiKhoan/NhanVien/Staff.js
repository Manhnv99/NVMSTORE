import "./Staff.css"
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";


const Staff=()=>{
    return(
        <>
            <Container>
                <div className="staff-header">
                    <i className="fa-solid fa-box-open"></i>
                    <span>Quản Lý Tài Khoản Nhân Viên</span>
                </div>
                <div className="staff-filter">
                    <div className="title-filter">
                        <i className="fa-solid fa-filter"></i>
                        <span>Bộ lọc</span>
                    </div>
                    <div className="filter-body">
                        <Row>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Tìm kiếm</Form.Label>
                                    <Form.Control style={{width:"70%"}} placeholder="Tìm kiếm tên và sđt..." type="text"/>
                                </Form.Group>
                                <Form.Group style={{marginTop:"20px"}}>
                                    <Form.Label>Trạng Thái</Form.Label>
                                    <Form.Select style={{width: "70%"}}>
                                        <option value="">Tất cả</option>
                                        <option value="">Đang làm</option>
                                        <option value="">Nghỉ làm</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group>
                                    <Form.Label>Ngày Sinh</Form.Label>
                                    <div style={{display:"flex"}}>
                                        <Form.Control style={{width:"50%"}} type="date"/>
                                        <Form.Control style={{width:"50%",marginLeft:"10px"}} type="date"/>
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} style={{textAlign:"center",marginTop:"30px"}}>
                                <button className="handleFilter">Tìm kiếm</button>
                                <button className="handleClear">Làm mới bộ lọc</button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="staff-body">
                    <div className="staff-body-title">
                        <div className={"staff-body-title-left"}>
                            <i className="fa-solid fa-list"></i>
                            <span>Danh sách nhân viên</span>
                        </div>
                        <div className={"staff-body-title-right"}>
                            <Link to="/add-nhanvien-management">
                                <i className="fa-solid fa-plus"></i>
                                <span style={{marginLeft:"5px"}}>Tạo Sản Phẩm</span>
                            </Link>
                        </div>
                    </div>
                    <Card style={{marginTop:"30px"}}>
                        <Card.Body style={{padding:"0"}}>
                            <Table striped style={{marginBottom:"0"}}>
                                <thead>
                                <tr style={{fontSize:"13px",fontWeight:"600"}}>
                                    <th style={{width:"5%"}}>STT</th>
                                    <th style={{width:"15%"}}>Ảnh</th>
                                    <th style={{width:"15%"}}>Tên nhân viên</th>
                                    <th style={{width:"15%"}}>CCCD</th>
                                    <th style={{width:"10%"}}>Số điện thoại</th>
                                    <th style={{width:"10%"}}>Ngày sinh</th>
                                    <th style={{width:"10%"}}>Giới tính</th>
                                    <th style={{width:"10%"}}>Trạng thái</th>
                                    <th style={{width:"10%"}}>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer style={{backgroundColor: "#fff"}}>
                            <div style={{display: "flex", justifyContent: "end", alignItems: "center"}}>
                                <i style={{color: "#666", marginRight: "15px", cursor: "pointer"}}
                                   className="fa-solid fa-angle-left"></i>
                                <span style={{
                                    cursor: "pointer",
                                    border: "1px solid #fa0307",
                                    padding: "3px 10px", borderRadius: "5px", textAlign: "center", margin:"3px",color:"#fa0307"}}>1</span>
                                <i style={{marginLeft: "15px",cursor:"pointer"}} className="fa-solid fa-angle-right"></i>
                            </div>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        </>
    )
}

export default Staff