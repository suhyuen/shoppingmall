import { useState, useEffect } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import "../css/userinfchangepage.css";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserinfchangePage() {
  const [openPostcode, setOpenPostcode] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    birth: "",
    address: "",
    detailAddress: "",
  });

  const handlerInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/updateUser", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((e) => {
        navigate("/userinf");
      });
  };

  const [address, setAddress] = useState("");

  const clickButton = () => {
    setOpenPostcode((prev) => !prev);
  };

  const selectAddress = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      address: data.address,
    }));
    setAddress(data.address);
    setOpenPostcode(false);
  };

  return (
    <>
      <Header></Header>
      <nav className="userinfchangepage_nav">
        <form onSubmit={handleSubmit}>
          <div className="userinfchangepage_main">
            <div>
              <p>이름</p>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handlerInputChange}
              ></input>
            </div>
            <div>
              <p>생년월일</p>
              <input
                type="date"
                name="birth"
                value={formData.birth}
                onChange={handlerInputChange}
              ></input>
            </div>

            <div>
              <p>주소(기본 배송지)</p>
              <div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handlerInputChange}
                  readOnly
                />
                <button onClick={clickButton} type="button">
                  주소 검색
                </button>
              </div>
              {openPostcode && (
                <>
                  <div className="modal_overlay" onClick={clickButton}></div>
                  <div className="daum_postcode_modal">
                    <DaumPostcode
                      onComplete={selectAddress}
                      autoClose={false}
                      defaultQuery="판교역로 235"
                    />
                  </div>
                </>
              )}
            </div>
            <div>
              <p>상세 주소</p>
              <input
                type="text"
                name="detailAddress"
                value={formData.detailAddress}
                onChange={handlerInputChange}
              ></input>
            </div>

            <div>
              <button>수정하기</button>
            </div>
          </div>
        </form>
        <div>
          <img src="" width="474px" height="500px"></img>
        </div>
      </nav>
      <Footer></Footer>
    </>
  );
}
