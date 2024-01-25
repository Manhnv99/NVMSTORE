import "./style/AddProduct.css"
import {Button, Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllBrand, setListBrand} from "../../../../redux/slices/BrandSlice";
import brandAPI from "../../../services/BrandAPI/BrandAPI";
import materialAPI from "../../../services/MaterialAPI/MaterialAPI";
import soleAPI from "../../../services/SoleAPI/SoleAPI";
import categoryAPI from "../../../services/CategoryAPI/CategoryAPI";
import {setListMaterial} from "../../../../redux/slices/MaterialSlice";
import {setListSole} from "../../../../redux/slices/SoleSlice";
import {setListCategory} from "../../../../redux/slices/CategorySlice";
import ModalEntity from "./ModalEntity";


const AddProduct=()=>{
    // dispatch
    const dispatch=useDispatch();
    //state entity
    const [whatEntity,setWhatEntity]=useState(undefined)
    const [openModal,setOpenModal]=useState(false)
    // state
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    const [brand_id,setBrand_id]=useState('')
    const [material_id,setMaterial_id]=useState('')
    const [gender_id,setGender_id]=useState('')
    const [sole_id,setSole_id]=useState('')
    const [category_id,setCategory_id]=useState('')
    const [sell_price,setSell_Price]=useState('')
    const [quantity,setQuantity]=useState('')
    const [color_id,setColor_id]=useState('')
    const [size_id,setSize_id]=useState('')
    // redux
    const listBrand=useSelector(state => state.brand.listBrand)
    const listMaterial=useSelector(state => state.material.listMaterial)
    const listSole=useSelector(state => state.sole.listSole)
    const listCategory=useSelector(state => state.category.listCategory)


    useEffect(()=>{
        getAllBrand();
        getAllMaterial();
        getAllSole();
        getAllCategory();
    },[])

    const getAllBrand= async ()=>{
        const res=await brandAPI.getAll();
        dispatch(setListBrand(res.data))
    }
    const getAllMaterial= async ()=>{
        const res=await materialAPI.getAll();
        dispatch(setListMaterial(res.data))
    }
    const getAllSole= async ()=>{
        const res=await soleAPI.getAll();
        dispatch(setListSole(res.data))
    }
    const getAllCategory= async ()=>{
        const res=await categoryAPI.getAll();
        dispatch(setListCategory(res.data))
    }

    const handleOpenBrandModal=()=>{
        setWhatEntity('brand')
        setOpenModal(true)
    }
    const handleOpenMaterialModal=()=>{
        setWhatEntity('material')
        setOpenModal(true)
    }
    const handleOpenSoleModal=()=>{
        setWhatEntity('sole')
        setOpenModal(true)
    }
    const handleOpenCategoryModal=()=>{
        setWhatEntity('category')
        setOpenModal(true)
    }

    return(
        <>
            {openModal && <ModalEntity setOpenModal={setOpenModal}/>}
            <Container>
                <div className="product-base">
                    {/*product add*/}
                    <div className="product-add">
                        <Row>
                            <Col lg={12}>
                                <h2 className="title">Thêm Sản Phẩm</h2>
                            </Col>
                            {/*Tên Sản Phẩm*/}
                            <Col lg={12}>
                                <Form.Group>
                                    <div style={{ display: 'flex', alignItems: 'end' }}>
                                        <Form.Label style={{width:"140px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Tên sản phẩm:</Form.Label>
                                        <Form.Control required type="text" placeholder="Nhập tên sản phẩm!"/>
                                    </div>
                                    <Form.Control.Feedback type={"invalid"}></Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            {/*Mô Tả*/}
                            <Col lg={12} style={{marginTop:"20px"}}>
                                <Form.Group>
                                    <div style={{ display: 'flex', alignItems: 'start' }}>
                                        <Form.Label style={{width:"130px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Mô tả:</Form.Label>
                                        <textarea style={{width:"100%",height:"200px",border:"1px solid #999",borderRadius:"5px",outline:"none",paddingLeft:"10px"}}></textarea>
                                    </div>
                                    <Form.Control.Feedback type={"invalid"}></Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div style={{marginTop:"40px"}}>
                            <Row>
                                <Col lg={6}>
                                    {/**/}
                                    <Form.Group>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Thương hiệu:</Form.Label>
                                            <Form.Select style={{width:"50%"}} required>
                                                <option onClick={handleOpenBrandModal} value="">--Chọn thương hiệu--</option>
                                                {listBrand.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        <Form.Control.Feedback type={"invalid"}></Form.Control.Feedback>
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Chất liệu:</Form.Label>
                                            <Form.Select style={{width:"50%"}} required>
                                                <option value="">--Chọn chất liệu--</option>
                                                {listMaterial.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenMaterialModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        <Form.Control.Feedback type={"invalid"}>s</Form.Control.Feedback>
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Giới tính:</Form.Label>
                                            <Form.Select style={{width:"50%"}} required>
                                                <option value="">--Chọn giới tính--</option>
                                            </Form.Select>
                                            <Button style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        <Form.Control.Feedback type={"invalid"}></Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col lg={6}>
                                    {/**/}
                                    <Form.Group>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Trạng thái:</Form.Label>
                                            <Form.Select style={{width:"50%"}} required>
                                                <option value="">--Chọn trạng thái--</option>
                                            </Form.Select>
                                            <Button style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        <Form.Control.Feedback type={"invalid"}></Form.Control.Feedback>
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Đế giày:</Form.Label>
                                            <Form.Select style={{width:"50%"}} required>
                                                <option value="">--Chọn đế giày--</option>
                                                {listSole.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenSoleModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        <Form.Control.Feedback type={"invalid"}>s</Form.Control.Feedback>
                                    </Form.Group>
                                    {/**/}
                                    <Form.Group style={{marginTop:"20px"}}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Form.Label style={{width:"120px",fontWeight:"600"}}><span style={{color: "red"}}>*</span> Thể loại:</Form.Label>
                                            <Form.Select style={{width:"50%"}} required>
                                                <option value="">--Chọn thể loại--</option>
                                                {listCategory.map((item,index)=>{
                                                    if(item.status===true){
                                                        return(
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        )
                                                    }
                                                })}
                                            </Form.Select>
                                            <Button onClick={handleOpenCategoryModal} style={{marginLeft:"20px",padding:"3px 8px"}}>
                                                <i className="fa-solid fa-plus"></i>
                                            </Button>
                                        </div>
                                        <Form.Control.Feedback type={"invalid"}></Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                {/*color and size*/}
                <div className="color-size">
                    <div style={{padding:"10px"}}>
                        <Row>
                            <Col sm={12}>
                                <h2 className="title">Kích Cỡ Và Màu Sắc</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{margin:"10px 0"}} sm={12}>
                                <Form.Group style={{padding:"20px 0"}}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Form.Label style={{width:"140px",fontWeight:"700",fontSize:"18px",marginBottom:"0"}}> Kích Cỡ :</Form.Label>
                                        <div>
                                        </div>
                                        <Button style={{marginLeft:"20px",padding:"3px 8px"}}>
                                            <i className="fa-solid fa-plus"></i>
                                        </Button>
                                    </div>
                                    <Form.Control.Feedback type={"invalid"}></Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group style={{padding:"20px 0"}}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Form.Label style={{width:"140px",fontWeight:"700",fontSize:"18px",marginBottom:"0"}}> Màu Săc :</Form.Label>
                                        <div>

                                        </div>
                                        <Button style={{marginLeft:"20px",padding:"3px 8px"}}>
                                            <i className="fa-solid fa-plus"></i>
                                        </Button>
                                    </div>
                                    <Form.Control.Feedback type={"invalid"}></Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </div>
                {/*table product*/}
                <div className="table-product">
                    <div style={{padding:"10px"}}>
                        <Row>
                            {/*title*/}
                            <Col sm={12}>
                                <h2 className="title">Chi Tiết Sản Phẩm</h2>
                            </Col>
                            {/*service*/}
                            <Col sm={12}>
                                <div style={{display:"flex",justifyContent:"end"}}>
                                    <Button>Chỉnh số lượng và giá chung</Button>
                                    <Button style={{marginLeft:"10px"}}>Hoàn Tất</Button>
                                </div>
                            </Col>
                            {/*Table*/}
                            <Card style={{margin:"30px 0",padding:"0"}}>
                                <Card.Body style={{padding:"0"}}>
                                    <Table style={{marginBottom:"0"}}>
                                        <thead>
                                            <tr style={{fontSize:"13px",fontWeight:"600"}}>
                                                <th style={{width:"5%",textAlign:"center"}}>STT</th>
                                                <th style={{width:"30%"}}>Tên Sản Phẩm</th>
                                                <th style={{width:"10%",textAlign:"center"}}>Số Lượng</th>
                                                <th style={{width:"15%",textAlign:"center"}}>Giá Bán</th>
                                                <th style={{width:"10%",textAlign:"center"}}>Hành Động</th>
                                                <th style={{width:"30%",textAlign:"center"}}>Upload Ảnh</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{fontSize:"15px"}}>
                                                <td style={{textAlign:"center"}}>1</td>
                                                <td>Air Force 1</td>
                                                <td style={{textAlign:"center"}}>
                                                    <Form.Control required type="number"/>
                                                </td>
                                                <td style={{textAlign:"center"}}>
                                                    <Form.Control required type="number"/>
                                                </td>
                                                <td style={{textAlign: "center"}}><i className="fa-solid fa-trash"></i></td>
                                                <td>
                                                    <input type="file" style={{display:"none"}}/>
                                                    <div className="table-upload">
                                                        <div style={{textAlign:"center"}}>
                                                            <i className="fa-solid fa-plus"></i>
                                                            <p>Upload</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Row>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AddProduct