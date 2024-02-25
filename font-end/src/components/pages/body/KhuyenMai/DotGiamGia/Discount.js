import "./style/Discount.css"
import {Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import Paging from "../../../../utils/Paging";
import {useNavigate} from "react-router-dom";

const Discount=()=>{

    const nav=useNavigate();


    return(
        <>
            {/*{(loading || isLoading) && <Loading/>}*/}
            <Container>
                <div className="base-header">
                    <i className="fa-solid fa-box-open"></i>
                    <span>Quản Lý Đợt Giảm Giá</span>
                </div>
                <div className="base-filter">
                    <div className="title-filter">
                        <i className="fa-solid fa-filter"></i>
                        <span>Bộ lọc</span>
                    </div>
                    <div className="filter-body">
                        <Row>
                            <Col lg={4} className="mb-4">
                                <Form.Group>
                                    <Form.Label>Mã khuyến mại</Form.Label>
                                    <Form.Control type="text" placeholder="Tìm kiếm"/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <Form.Group>
                                    <Form.Label>Giá trị giảm</Form.Label>
                                    <Form.Control type="text" placeholder="Tìm kiếm"/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <Form.Group>
                                    <Form.Label>Từ ngày</Form.Label>
                                    <Form.Control type="date"/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <Form.Group>
                                    <Form.Label>Tên khuyến mại</Form.Label>
                                    <Form.Control type="text" placeholder="Tìm kiếm"/>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <Form.Group>
                                    <Form.Label>Trạng thái</Form.Label>
                                    <Form.Select>
                                        <option value="">Tất cả</option>
                                        <option value="true">Đang sử dụng</option>
                                        <option value="false">Ngưng sử dụng</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="mb-4">
                                <Form.Group>
                                    <Form.Label>Đến ngày</Form.Label>
                                    <Form.Control type="date"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} style={{textAlign:"center",marginTop:"20px"}}>
                                <button className="handleClear">Làm mới bộ lọc</button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="base-body">
                    <div className="base-body-title">
                        <div className={"base-body-title-left"}>
                            <i className="fa-solid fa-list"></i>
                            <span>Danh sách đợt giảm giá</span>
                        </div>
                        <div className={"base-body-title-right"}>
                            <button onClick={()=>{nav("/create-discount-management")}} className={"btn btn-primary"}>
                                <i className="fa-solid fa-plus"></i>
                                <span style={{marginLeft: "5px"}}>Thêm</span>
                            </button>
                        </div>
                    </div>
                    <Card style={{marginTop: "30px"}}>
                        <Card.Body style={{padding:"0"}}>
                            <Table style={{marginBottom:"0"}}>
                                <thead>
                                <tr style={{fontSize: "13px", fontWeight: "600"}}>
                                    <th style={{width: "5%", textAlign: "center"}}>STT</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Mã</th>
                                    <th style={{width: "20%", textAlign: "center"}}>Tên Đợt Giảm Giá</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Giá Trị Giảm</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Ngày Bắt Đầu</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Ngày Kết Thúc</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Ngày Cập Nhật</th>
                                    <th style={{width: "15%", textAlign: "center"}}>Trạng Thái</th>
                                    <th style={{width: "10%", textAlign: "center"}}>Hành Động</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr style={{fontSize: "15px"}}>
                                    <td style={{textAlign: "center"}}>1</td>
                                    <td style={{textAlign: "center"}}>2</td>
                                    <td style={{textAlign: "center"}}>
                                        3
                                    </td>
                                    <td style={{textAlign: "center"}}>
                                        3
                                    </td>
                                    <td style={{textAlign: "center"}}>
                                        3
                                    </td>
                                    <td style={{textAlign: "center"}}>
                                        3
                                    </td>
                                    <td style={{textAlign: "center"}}>
                                        3
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
                                    <td style={{textAlign: "center"}}>
                                        <i className="fa-regular fa-eye actionDetail"></i>
                                        <i className="fa-regular fa-pen-to-square actionEdit"></i>
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
            </Container>
            {/*Modal*/}
            {/*<Modal show={show} onHide={handleClose}>*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>*/}
            {/*            {addOrUpdate===true ? 'Thêm thương hiệu' : "Cập nhật thương hiệu"}*/}
            {/*        </Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        <Col sm={12}>*/}
            {/*            <Form.Group>*/}
            {/*                <Form.Label><span style={{color: "red"}}>*</span> Tên thương hiệu</Form.Label>*/}
            {/*                <Form.Control value={name} onChange={onChangeName} required isInvalid={touchName && name==='' || error !== undefined} isValid={name!==''} type="text" placeholder="Điền tên thương hiệu!"/>*/}
            {/*                <Form.Control.Feedback type={"invalid"}>*/}
            {/*                    {error !== undefined ? error : "Tên Thương Hiệu Không Được Để Trống!"}*/}
            {/*                </Form.Control.Feedback>*/}
            {/*            </Form.Group>*/}
            {/*            <Form.Group>*/}
            {/*                <Form.Label><span style={{color: "red"}}>*</span>Trạng thái</Form.Label>*/}
            {/*                <Form.Select className="modal-status" onChange={(e)=>{setStatus(e.target.value)}} required>*/}
            {/*                    <option value="true">Đang sử dụng</option>*/}
            {/*                    <option value="false">Không sử dụng</option>*/}
            {/*                </Form.Select>*/}
            {/*            </Form.Group>*/}
            {/*        </Col>*/}
            {/*    </Modal.Body>*/}
            {/*    <Modal.Footer>*/}
            {/*        <Button variant="secondary" onClick={handleClose}>*/}
            {/*            Hủy*/}
            {/*        </Button>*/}
            {/*        <Button variant="primary" onClick={handleAdd}>*/}
            {/*            {addOrUpdate ? "Thêm" : "Cập nhật"}*/}
            {/*        </Button>*/}
            {/*    </Modal.Footer>*/}
            {/*</Modal>*/}
        </>
    )
}

export default Discount