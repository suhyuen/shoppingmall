import { useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import "../css/detailproductpage.css";
import { useNavigate } from "react-router-dom";

export default function DetailproductPage() {
  const [address, setAddress] = useState("강동구 상암로 79길 88");
  const [detailAddress, setDetailAddress] =
    useState("롯데케슬베네루체 711동 601호");

  return (
    <>
      <Header></Header>
      <nav>
        <div className="detailproduct">
          <div className="detailproduct_main">
            <div>
              <img src="" width="572px" height="700px"></img>
            </div>
            <div className="detailproduct_order">
              <div>
                <p>커브 와이드 데님 팬츠</p>
              </div>
              <div>
                <p>사이즈</p>
                <select>
                  <option>S</option>
                  <option>M</option>
                  <option>X</option>
                  <option>XL</option>
                </select>
              </div>
              <div>
                <p>주소</p>
                <input type="text" value={address}></input>
              </div>
              <div>
                <p>상세 주소</p>
                <input type="text" value={detailAddress}></input>
              </div>
              <div>
                <p>결제 방식</p>
                <div>
                  <input type="checkbox"></input>
                  <p>신용/체크카드</p>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <p>휴대폰 결제</p>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <img
                    src="http://localhost:3000/imgs/토스 페이 로고.png"
                    height="24px"
                    width="24px"
                  ></img>
                  <p>토스페이</p>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <img
                    src="http://localhost:3000/imgs/카카오페이 로고.png"
                    height="24px"
                    width="24px"
                  ></img>
                  <p>카카오페이</p>
                </div>
              </div>
              <div>
                <p>46000원</p>
              </div>
              <div>
                <button>바로구매</button>
                <button>장바구니</button>
              </div>
            </div>
          </div>
          <div className="detailproduct_mid"></div>
          <div className="detailproduct_footer">
            <div>
              <p>상품정보</p>
              <p>리뷰(0)</p>
            </div>
            <div className="detailproduct_review">
              <div>
                <p>syg****</p>
                <p>옷 핏이 너무 이뻐요!</p>
              </div>
              <div>
                <button>수정</button>
                <button>삭제</button>
              </div>
            </div>
            <div className="detailproduct_review">
              <div>
                <p>syg****</p>
                <p>옷 핏이 너무 이뻐요!</p>
              </div>
              <div>
                <button>수정</button>
                <button>삭제</button>
              </div>
            </div>
            <div className="detailproduct_review">
              <div>
                <p>syg****</p>
                <p>옷 핏이 너무 이뻐요!</p>
              </div>
              <div>
                <button>수정</button>
                <button>삭제</button>
              </div>
            </div>
            <div className="detailproduct_review">
              <div>
                <p>syg****</p>
                <p>옷 핏이 너무 이뻐요!</p>
              </div>
              <div>
                <button>수정</button>
                <button>삭제</button>
              </div>
            </div>
            <div className="write_review">
              <textarea
                rows="10"
                cols="50"
                placeholder="여기에 리뷰를 작성하세요"
              ></textarea>
              <button>리뷰 작성</button>
            </div>
          </div>
        </div>
      </nav>
      <Footer></Footer>
    </>
  );
}
