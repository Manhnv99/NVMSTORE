import "./KhachHang.css"
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {useState} from "react";


const KhachHang=()=>{

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        if (!touched) {
            setTouched(true);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setTouched(true);
        setSubmitted(true);
    };

    const shouldValidate = touched || inputValue.length > 0;
    const isValid = shouldValidate && inputValue.length > 10;
    const isInvalid = shouldValidate && inputValue.length <10;

    return(
        <>
            <Container>
                <div className="staff-header">
                    <span>Thêm Nhân Viên</span>
                </div>
                <Row className="staff-content">
                    <Col lg={3}>
                        <div className="staff-content-left">
                            <span>Ảnh Đại Diện</span>
                            <div className="upload">
                                <div>
                                    <i className="fa-solid fa-plus"></i>
                                    <p>Upload</p>
                                </div>
                            </div>
                            <input type="file" hidden/>
                        </div>
                    </Col>
                    <Col lg={9}> {/* Chiếm 9 cột (cỡ nhỏ) và thêm khoảng cách */}
                        <div className="staff-content-right">
                            <span className="title">Thông Tin Nhân Viên</span>
                            <div style={{width:"85%",margin:"0 auto"}}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="formInput">
                                        <Form.Label>Input</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            isValid={isValid}
                                            isInvalid={isInvalid}
                                        />
                                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {submitted && !isValid && 'Please enter a value greater than 10 characters.'}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button style={{marginTop:"40px"}} type="submit">Submit</Button>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default KhachHang