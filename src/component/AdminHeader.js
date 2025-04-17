import "../css/header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();


  const isActive = (path) => location.pathname === path;




  return (
    <header>
      <div>
        <div className="logo">
          <Link to="/admin-dashboard1111">Monologue</Link>
        </div>
        <ul>
          <li>
            회원관리
          </li>
          <li>
            <Link to="/admin-products"
              className={isActive('/admin-products') ? 'active' : ''}
            >
              상품관리
            </Link>
          </li>
          <li>
            상품 재고 관리
          </li>
          <li>
            주문 내역
          </li>
          <li>
            결제 관리
          </li>
          <li
          >
            뎃글 관리
          </li>
        </ul>
      </div>
      <div className="admin_logout">Logout</div>
    </header>
  );
}
