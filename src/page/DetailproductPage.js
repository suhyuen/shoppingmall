import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import "../css/detailproductpage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DetailproductPage() {

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    uid: "",
    address: "",
    detailAddress: ""
  });

  const [productData, setProductData] = useState({
    productId: "",
    productImageId: "",
    productName: "",
    price: "",
    size: "",
    stock: "",
    productImages: {
      productImagePath: ""
    }
  })

  const [formCartData, setFormCartData] = useState({
    userUid: "",
    productId: "",
  })

  const [formCommentData, setFormCommentData] = useState({
    userUid: "",
    productId: "",
    comment: ""
  })

  const [commentData, setCommentData] = useState([
    {
      comment: "",
      user: {
        id: ""
      }
    }
  ])

  const [isCardPayment, setIsCardPayment] = useState(false);


  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setFormCartData({
      ...formCartData,
      [name]: value,
    })
  }

  const handlerCommentChange = (e) => {
    const { name, value } = e.target;
    setFormCommentData({
      ...formCommentData,
      [name]: value,
    });
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("productId");

  const imageUrl = `http://localhost:8080${productData.productImages.productImagePath.replace(/ /g, '%20')}`;


  useEffect(() => {
    axios.post(
      `http://localhost:8080/selectDetailProduct?productId=${productId}`,
      { productId }, {
      headers: { Authorization: localStorage.getItem("accessToken") },
      Accept: "image/*",
    }
    ).then((resp) => {
      setProductData(resp.data)
    })
  }, [productId])


  useEffect(() => {
    axios.post(
      "http://localhost:8080/userinf",
      {},
      {
        headers: { Authorization: localStorage.getItem("accessToken") },
      }
    ).then((resp) => {
      setUserData(resp.data)

    })
  })

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCartSubmit = (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm("장바구니에 등록하시겠습니까?");

    if (isConfirmed) {
      axios.post(`http://localhost:8080/insertCart?productId=${productId}`,
        {
          productId,
          quantity: 1
        }, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      }
      ).then((e) => {
        alert("장바구니에 등록 되었습니다.")
        navigate(`/cart?uid=${userData.uid}`)

      })
    } else {
      alert("장바구니 등록이 취소되었습니다.")
    }
  }

  const handlerCommentSubmit = (e) => {
    e.preventDefault();
    console.log("Sending comment data to server...");
    console.log("Product ID:", productId);
    console.log("Form Comment Data:", formCommentData);

    axios.post(
      `http://localhost:8080/insertComment?productId=${productId}`,
      formCommentData,
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "application/json",
        },
      }
    ).then((e) => {
      alert("리뷰가 등록되었습니다");
      window.location.reload();
      window.scrollTo(0, 0);
    }).catch((error) => {
      console.error("Error submitting comment:", error);
    });

  }

  useEffect(() => {
    axios.post(`http://localhost:8080/selectComment?productId=${productId}`, commentData,
      {
        headers: { Authorization: localStorage.getItem("accessToken") },
      }
    ).then((resp) => {
      setCommentData(resp.data)
    })
  })

  const handlePaymentOptionChange = (e) => {
    const { value } = e.target;
    if (value === "cardpay") {
      setIsCardPayment(true);
    } else {
      setIsCardPayment(false);
    }
  }

  const handleBuyCard = (e) => {
    e.preventDefault();
    if (isCardPayment) {
      navigate(`/payment?productId=${productId}`);
    } else {
      alert("결제 방법을 선택해주세요")
    }
  }


  const commentList = commentData.map((data) => {
    return (
      <div className="detailproduct_review">
        <div>
          <p>{data.user.id}</p>
          <p>{data.comment}</p>
        </div>
        <div>
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
    )

  })

  return (
    <>
      <Header></Header>
      <nav>
        <div className="detailproduct">
          <div className="detailproduct_main">
            <div>
              <img src={imageUrl} width="572px" height="700px"></img>
            </div>
            <form onSubmit={handleCartSubmit}>
              <div className="detailproduct_order">
                <div>
                  <p>{productData.productName}</p>
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
                  <input type="text" name="address" value={userData.address} onChange={handleAddressChange}></input>
                </div>
                <div>
                  <p>상세 주소</p>
                  <input type="text" name="detailAddress" value={userData.detailAddress} onChange={handleAddressChange}></input>
                </div>
                <div>
                  <p>결제 방식</p>
                  <div>
                    <input type="checkbox" name="paymentMethod" value="cardpay" onChange={handlePaymentOptionChange}></input>
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
                  <button onClick={handleBuyCard}>바로구매</button>
                  <button>장바구니</button>
                </div>
              </div>
            </form>

          </div>
          <div className="detailproduct_mid"></div>
          <div className="detailproduct_footer">
            <div>
              <p>상품정보</p>
              <p>리뷰(1)</p>
            </div>
            {commentList}
            <form onSubmit={handlerCommentSubmit}>
              <div className="write_review">
                <textarea
                  name="comment"
                  rows="10"
                  cols="50"
                  placeholder="여기에 리뷰를 작성하세요"
                  value={formCommentData.comment}  // formCommentData.comment가 제대로 바인딩되어야 합니다.
                  onChange={handlerCommentChange}
                />
                <button type="submit">리뷰 작성</button>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <Footer></Footer>
    </>
  );
}
