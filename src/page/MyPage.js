import { Link } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";
import "../css/mypage.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MyPage() {
  const [userData, setUserData] = useState({ userName: "" });

  useEffect(() => {
    axios
      .post(
        "http://localhost:8080/userinf",
        {},
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((resp) => {
        setUserData(resp.data);
      });
  });
  return (
    <>
      <Header></Header>
      <nav>
        <main className="mypage">
          <div className="mypage_title">My Page</div>
          <div className="mypage_inform">
            <div>
              <p>{userData.userName} 님</p>
              <div>
                <Link to="/userinf">회원정보</Link>
              </div>
            </div>
            <div>
              <button>일반</button>
              <div>등급 혜택</div>
            </div>
            <div>
              <div>
                <p>보유쿠폰</p>
                <p>0</p>
              </div>
              <div>
                <p>마일리지</p>
                <p>0</p>
              </div>
              <div>
                <p>적립금</p>
                <p>0</p>
              </div>
            </div>
          </div>
          <div className="mypage_orderlist">
            <div>
              <p>주문내역 전체 보기</p>
              <div className="mypage_arrow">&gt;</div>
            </div>
            <div>
              <div>
                <p>0</p>
                <p>주문 접수</p>
              </div>
              <div className="mypage_arrow">&gt;</div>
              <div>
                <p>0</p>
                <p>주문 접수</p>
              </div>
              <div className="mypage_arrow">&gt;</div>
              <div>
                <p>0</p>
                <p>주문 접수</p>
              </div>
              <div className="mypage_arrow">&gt;</div>
              <div>
                <p>0</p>
                <p>주문 접수</p>
              </div>
              <div className="mypage_arrow">&gt;</div>
              <div>
                <p>0</p>
                <p>주문 접수</p>
              </div>
            </div>
          </div>
          <div className="mypage_cart">
            <div>
              <p>장바구니 전체 보기</p>
              <div className="mypage_arrow">&gt;</div>
            </div>
            <div>
              <div>
                현재 000님의 장바구니에&nbsp;<span>00</span>&nbsp;개 상품이
                담겨있습니다.
              </div>
            </div>
          </div>
        </main>
      </nav>
      <Footer></Footer>
    </>
  );
}
