import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./page/HomePage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import MyPage from "./page/MyPage";
import OrderlistPage from "./page/OrderlistPage";
import ShoppingcartPage from "./page/ShoppingcartPage";
import UserinfPage from "./page/UserinfPage";
import UserinfchangePage from "./page/UserinfchangePage";
import ProductsPage from "./page/ProductsPage";
import DetailproductPage from "./page/DetailproductPage";
import AdminDashboard from "./page/AdminDashboard";
import AdminSignup from "./page/AdminSignup";
import AdminLogin from "./page/AdminLogin";
import AdminProducts from "./page/AdminProducts";
import AdminInsertProduct from "./page/AdminInsertProduct";
import AdminChangeProduct from "./page/AdminChangeProduct";
import AdminDetailProduct from "./page/AdminDetailProduct";
import PaymentPage from "./page/PaymentPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/orderlist" element={<OrderlistPage />}></Route>
          <Route path="/cart" element={<ShoppingcartPage />}></Route>
          <Route path="/userinf" element={<UserinfPage />}></Route>
          <Route path="/userinfchange" element={<UserinfchangePage />}></Route>
          <Route path="/product" element={<ProductsPage />}></Route>
          <Route path="/detailproduct" element={<DetailproductPage />}></Route>
          <Route path="/admin-dashboard1111" element={<AdminDashboard />}></Route>
          <Route path="/admin-signup1111" element={<AdminSignup />}></Route>
          <Route path="/admin-login1111" element={<AdminLogin />}></Route>
          <Route path="/admin-products" element={<AdminProducts />}></Route>
          <Route path="/admin-insertproduct" element={<AdminInsertProduct />}></Route>
          <Route path="/admin-changeproduct" element={<AdminChangeProduct />}></Route>
          <Route path="/admin-detailproduct" element={<AdminDetailProduct />}></Route>
          <Route path="/payment" element={<PaymentPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
