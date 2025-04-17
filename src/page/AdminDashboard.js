import { Link } from "react-router-dom";
import AdminHeader from "../component/AdminHeader";
import Footer from "../component/Footer";
import "../css/admindashboard.css"
import "../css/productspage.css"


export default function AdminDashboard() {
  return (
    <>
      <AdminHeader></AdminHeader>
      <nav className="admin_dashboard">
        <div className="admin_dashoboard_top">
          <p>이번달 판매율 TOP4</p>
          <div className="admin_dashboard_top4">
            <Link to="/admin-detailproduct"><div className="products">
              <img src="/imgs/Admin_Dashboard_image/admin_dashboard1.jpg" width="278px" height="278px" />
              <p>로렌트 더블 롱 코트</p>
              <p>이번달 판매 : 51 / 누적 판매 : 1253</p>
            </div></Link>
            <Link to="/admin-detailproduct"><div className="products">
              <img src="/imgs/Admin_Dashboard_image/admin_dashboard2.jpg" width="278px" height="278px" />
              <p>양고라 블럭 가디건</p>
              <p>이번달 판매 : 48 / 누적 판매 : 1131</p>
            </div></Link>
            <Link to="/admin-detailproduct"><div className="products">
              <img src="/imgs/Admin_Dashboard_image/admin_dashboard3.jpg" width="278px" height="278px" />
              <p>몰디브 시스루 티셔츠</p>
              <p>이번달 판매 : 36 / 누적 판매 : 989</p>
            </div></Link>
            <Link to="/admin-detailproduct"><div className="products">
              <img src="/imgs/Admin_Dashboard_image/admin_dashboard4.jpg" width="278px" height="278px" />
              <p>울 숏자켓</p>
              <p>이번달 판매 : 29 / 누적 판매 : 765</p>
            </div></Link>

          </div>
        </div>
        <div className="admin_dashboard_mid"></div>
        <div className="admin_dashboard_last">
          <p>DashBoard</p>
          <div className="admin_dashboard_graf">
            <div><img src="" height="320px" width="326px"></img>
              <p>일별 방문자 수</p>
            </div>
            <div><img src="" height="320px" width="326px"></img>
              <p>일별 판매율</p>
            </div>
            <div><img src="" height="320px" width="326px"></img>
              <p>일 매출(원)</p>
            </div>
          </div>

        </div>
      </nav>

      <Footer></Footer>
    </>
  );
}
