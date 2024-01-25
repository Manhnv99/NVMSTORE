import "./Menu.css"
import {Button, Collapse, Nav} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Menu=()=>{
    const [openQLSP, setOpenQLSP] = useState(false);
    const [openQLTK, setOpenQLTK] = useState(false);
    const [openQLGG, setOpenQLGG] = useState(false);


    useEffect(() => {
        addActive();
        addOpenDropDownQLSP();
        addOpenDropDownQLTK();
        addOpenDropDownQLGG();
    }, []);
    const addActive=()=>{
        const links=document.querySelectorAll('a')
        for(let i=0;i<links.length;i++){
            links[i].addEventListener("click",()=>{
                for(let i=0;i<links.length;i++){
                    links[i].classList.remove("active")
                }
                links[i].classList.add("active")
            })
        }
    }
    const addOpenDropDownQLSP=()=>{
        const drop=document.querySelector(".drop-downQLSP")
        const dropIcon=document.querySelector(".drop-downQLSP .fa-angle-down")
        drop.addEventListener("click",()=>{
            drop.classList.toggle("changeColorDropDown")
            dropIcon.classList.toggle("iconRotate")
        })
    }
    const addOpenDropDownQLTK=()=>{
        const drop=document.querySelector(".drop-downQLTK")
        const dropIcon=document.querySelector(".drop-downQLTK .fa-angle-down")
        drop.addEventListener("click",()=>{
            drop.classList.toggle("changeColorDropDown")
            dropIcon.classList.toggle("iconRotate")
        })
    }

    const addOpenDropDownQLGG=()=>{
        const drop=document.querySelector(".drop-downQLGG")
        const dropIcon=document.querySelector(".drop-downQLGG .fa-angle-down")
        drop.addEventListener("click",()=>{
            drop.classList.toggle("changeColorDropDown")
            dropIcon.classList.toggle("iconRotate")
        })
    }

    return(
        <>
            <div className="menu-container">
                <div className="menu-logo">
                    <img src="/logo.png" alt=""/>
                </div>
                <div className="menu_body">
                    <ul>
                        <li>
                            <Link to={"/"} className={"active"}>
                                <i className="fa-solid fa-chart-line"></i>
                                <span>Thống Kê</span>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <i className="fa-solid fa-shop"></i>
                                <span>Bán Hàng Tại Quầy</span>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <i className="fa-solid fa-money-bill"></i>
                                <span>Quản Lý Hóa Đơn</span>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <i className="fa-solid fa-truck"></i>
                                <span>Trả Hàng</span>
                            </Link>
                        </li>
                        <li>
                            <div style={{color: "#999"}} className="drop-downQLSP drop-down"
                                 onClick={() => setOpenQLSP(!openQLSP)}>
                                <div>
                                    <i className="fa-solid fa-truck"></i>
                                    <span style={{marginLeft: "5px"}}>Quản Lý Sản Phẩm</span>
                                </div>
                                <div>
                                    <i className="fa-solid fa-angle-down"></i>
                                </div>
                            </div>
                            <Collapse in={openQLSP}>
                                <ul>
                                    <li>
                                        <Link to={"/product-management"} style={{marginLeft: "21px"}}>
                                            <span>Sản Phẩm</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/category-management"} style={{marginLeft: "21px"}}>
                                            <span>Thể Loại</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/sole-management"} style={{marginLeft: "21px"}}>
                                            <span>Đế Giày</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/brand-management"} style={{marginLeft: "21px"}}>
                                            <span>Thương Hiệu</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/material-management"} style={{marginLeft: "21px"}}>
                                            <span>Chất Liệu</span>
                                        </Link>
                                    </li>
                                </ul>
                            </Collapse>
                        </li>
                        <li>
                            <div style={{color: "#999"}} className="drop-downQLTK drop-down"
                                 onClick={() => setOpenQLTK(!openQLTK)}>
                                <div>
                                    <i className="fa-solid fa-users"></i>
                                    <span style={{marginLeft: "5px"}}>Quản Lý Tài Khoản</span>
                                </div>
                                <div>
                                    <i className="fa-solid fa-angle-down"></i>
                                </div>
                            </div>
                            <Collapse in={openQLTK}>
                                <ul>
                                    <li>
                                        <Link to={"/staff-management"} style={{marginLeft: "21px"}}>
                                            <span>Nhân Viên</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/customer-management"} style={{marginLeft: "21px"}}>
                                            <span>Khách Hàng</span>
                                        </Link>
                                    </li>
                                </ul>
                            </Collapse>
                        </li>
                        <li>
                            <div style={{color: "#999"}} className="drop-downQLGG drop-down"
                                 onClick={() => setOpenQLGG(!openQLGG)}>
                                <div>
                                    <i className="fa-solid fa-tags"></i>
                                    <span style={{marginLeft: "5px"}}>Giảm Giá</span>
                                </div>
                                <div>
                                    <i className="fa-solid fa-angle-down"></i>
                                </div>
                            </div>
                            <Collapse in={openQLGG}>
                                <ul>
                                    <li>
                                        <Link style={{marginLeft: "21px"}}>
                                            <span>Đợt Giảm Giá</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link style={{marginLeft: "21px"}}>
                                            <span>Phiếu Giảm Giá</span>
                                        </Link>
                                    </li>
                                </ul>
                            </Collapse>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Menu