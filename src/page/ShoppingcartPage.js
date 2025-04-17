import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import "../css/orderlistpage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ShoppingcartPage() {

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    uid: ""
  })

  const [cartData, setCartData] = useState([{
    cartId: "",
    userUid: "",
    productId: "",
    quantity: "",
    product: {
      productName: "",
      price: "",
      productImageId: "",
    },
    productImages: {
      productImagePath: ""
    }
  }])

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uid = queryParams.get("uid");

  useEffect(() => {
    axios.post(`http://localhost:8080/selectCart?uid=${uid}`, { uid },
      {
        headers: { Authorization: localStorage.getItem("accessToken") },
      }
    ).then((resp) => {
      setCartData(resp.data)
    })
  })

  const handleDeleteClick = (cartId) => {
    const userConfirmed = window.confirm("장바구니에서 삭제하시겠습니까?");

    if (userConfirmed) {
      console.log("삭제할 데이터:", { uid, cartId });
      axios.post("http://localhost:8080/deleteCart", { cartId },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      ).then((e) => {
        console.log("서버 응답:", e);
        alert("삭제되었습니다.");
        navigate(`/cart?uid=${uid}`);
      }).catch((error) => {
        console.error("삭제 요청 실패:", error);
        alert("삭제 실패했습니다.");
      })
    } else {
      alert("취소되었습니다");
    }
  };


  const cartList = cartData.map((data) => {
    const imageUrl = `http://localhost:8080${data.productImages.productImagePath.replace(/ /g, '%20')}`;
    return (
      <div className="orderlistpage_main_list">
        <div>
          <input type="checkbox"></input>
          <div>
            <img src={imageUrl} width="100px" height="100px"></img>
            <p>{data.product.productName}</p>
          </div>
          <div onClick={() => handleDeleteClick(data.cartId)}>
            <p>x</p>
          </div>
        </div>
        <div>{data.quantity}</div>
        <div>{data.product.price}</div>
      </div>
    )
  })


  return (
    <>
      <Header></Header>
      <nav>
        <div className="orderlistpage">
          <div className="orderlistpage_title">
            <p>Cart List</p>
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
            {cartList}
          </div>
        </div>
      </nav>
      <Footer></Footer>
    </>
  );
}
