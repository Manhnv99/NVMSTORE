import './App.css'
import Header from "./components/pages/header/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from "./components/pages/menu/Menu";
import ThongKe from "./components/pages/body/ThongKe/ThongKe";
import Category from "./components/pages/body/SanPhamEntity/Category";
import KhachHang from "./components/pages/body/TaiKhoan/KhachHang/KhachHang";
import AddStaff from "./components/pages/body/TaiKhoan/NhanVien/AddStaff";
import Staff from "./components/pages/body/TaiKhoan/NhanVien/Staff";


function App() {
  return (
      <Router>
          <div id="menu">
              <Menu/>
          </div>
          <div id="header">
              <Header/>
          </div>
          <div id="body">
            <Routes>
                <Route path="/" element={<ThongKe/>}/>
                <Route path="/theloai-management" element={<Category/>}/>
                <Route path="/khachhang-management" element={<KhachHang/>}/>
                <Route path="/nhanvien-management" element={<Staff/>}/>
                <Route path="/add-nhanvien-management" element={<AddStaff/>}/>
            </Routes>
          </div>
      </Router>
  )}

export default App;
