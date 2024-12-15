import Footer from "../component/Footer";
import Header from "../component/Header";
import "../css/orderlistpage.css";

export default function OrderlistPage() {
  return (
    <>
      <Header></Header>
      <nav>
        <div className="orderlistpage">
          <div className="orderlistpage_title">
            <p>주문 내역</p>
          </div>
          <div className="orderlistpage_main">
            <div>
              <div>
                <input type="checkbox" checked></input>
                <p>주문 정보</p>
              </div>
              <div>
                <p>수량</p>
              </div>
              <div>
                <p>가격</p>
              </div>
            </div>
            <div className="orderlistpage_main_list">
              <div>
                <input type="checkbox"></input>
                <div>
                  <img src="" width="100px" height="100px"></img>
                  <p>메이슨 체크 오버 셔츠</p>
                </div>
              </div>
              <div>1</div>
              <div>3,9000</div>
            </div>
            <div className="orderlistpage_main_list">
              <div>
                <input type="checkbox"></input>
                <div>
                  <img src="" width="100px" height="100px"></img>
                  <p>메이슨 체크 오버 셔츠</p>
                </div>
              </div>
              <div>1</div>
              <div>3,9000</div>
            </div>
            <div className="orderlistpage_main_list">
              <div>
                <input type="checkbox"></input>
                <div>
                  <img src="" width="100px" height="100px"></img>
                  <p>메이슨 체크 오버 셔츠</p>
                </div>
              </div>
              <div>1</div>
              <div>3,9000</div>
            </div>
          </div>
        </div>
      </nav>
      <Footer></Footer>
    </>
  );
}
