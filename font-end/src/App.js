import './App.css'
import Header from "./components/pages/header/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from "./components/pages/menu/Menu";
import ThongKe from "./components/pages/body/ThongKe/ThongKe";
import Category from "./components/pages/body/SanPhamEntity/Category";
import KhachHang from "./components/pages/body/TaiKhoan/KhachHang/KhachHang";
import AddStaff from "./components/pages/body/TaiKhoan/NhanVien/AddStaff";
import Staff from "./components/pages/body/TaiKhoan/NhanVien/Staff";
import DetailStaff from "./components/pages/body/TaiKhoan/NhanVien/DetailStaff";
import UpdateStaff from "./components/pages/body/TaiKhoan/NhanVien/UpdateStaff";
import ToastMessage from "./components/pages/toastmsg/ToastMessage";
import Sole from "./components/pages/body/SanPhamEntity/Sole";
import Brand from "./components/pages/body/SanPhamEntity/Brand";
import Material from "./components/pages/body/SanPhamEntity/Material";
import Product from "./components/pages/body/SanPham/Product";
import AddProduct from "./components/pages/body/SanPham/AddProduct";
import ProductDetail from "./components/pages/body/SanPham/productDetail/ProductDetail";
import AddDiscount from "./components/pages/body/KhuyenMai/DotGiamGia/AddDiscount";
import Discount from "./components/pages/body/KhuyenMai/DotGiamGia/Discount";
import Voucher from "./components/pages/body/KhuyenMai/PhieuGiamGia/Voucher";
import BanHang from "./components/pages/body/BanHangTaiQuay/BanHang";


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
              <ToastMessage/>
            <Routes>
                <Route path="/" element={<ThongKe/>}/>
                <Route path={"/product-management"} element={<Product/>}/>
                <Route path={"/product-detail-management/:product_id"} element={<ProductDetail/>}/>
                <Route path={"/add-product-management"} element={<AddProduct/>}/>
                <Route path="/category-management" element={<Category/>}/>
                <Route path="/sole-management" element={<Sole/>}/>
                <Route path="/brand-management" element={<Brand/>}/>
                <Route path="/material-management" element={<Material/>}/>
                <Route path="/customer-management" element={<KhachHang/>}/>
                <Route path="/staff-management" element={<Staff/>}/>
                <Route path="/add-staff-management" element={<AddStaff/>}/>
                <Route path="/update-staff-management/:id" element={<UpdateStaff/>}/>
                <Route path="/detail-staff-management/:id" element={<DetailStaff/>}/>
                <Route path="/discount-management" element={<Discount/>}/>
                <Route path="/create-discount-management" element={<AddDiscount/>}/>
                <Route path="/voucher-management" element={<Voucher/>}/>
                <Route path="/sale-counter" element={<BanHang/>}/>
            </Routes>
          </div>
      </Router>
  )
}

export default App;
