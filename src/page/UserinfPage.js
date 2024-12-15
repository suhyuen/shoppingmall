import { useState, useEffect } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header";
import "../css/userinfpage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function UserinfPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    phoneNumber: "",
    address: "",
    detailAdress: "",
    birth: "",
  });

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

  const handleDeleteUser = (uid) => {
    const confirmDelete = window.confirm("회원 탈퇴를 하시겠습니까?");

    if (confirmDelete) {
      // 사용자가 확인을 누른 경우에만 회원 탈퇴 요청을 보냄
      axios
        .post(
          `http://localhost:8080/deleteUser`,
          { userUid: uid }, // 요청 본문에 userUid를 담아서 전송
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          console.log("탈퇴되엇습니다:", response.data);
          navigate("/");
        });
    } else {
      // 사용자가 취소를 누른 경우
      console.log("회원 탈퇴 취소");
    }
  };

  return (
    <>
      <Header></Header>
      <nav>
        <div className="userinf">
          <div>
            <div className="userinf_title">
              <p>{userData.userName} 님</p>
            </div>
            <div className="userinf_main">
              <div>
                <p>핸드폰 번호</p>
                <p>{userData.phoneNumber}</p>
              </div>
              <div>
                <p>주소(기본 배송지)</p>
                <p>{userData.address}</p>
                <p>{userData.detailAdress}</p>
              </div>
              <div>
                <p>생년월일</p>
                <p>{userData.birth}</p>
              </div>
              <div>
                <button>
                  <Link to="/userinfchange">회원 정보 수정</Link>
                </button>
              </div>
              <div
                onClick={() => {
                  handleDeleteUser(userData.uid);
                }}
              >
                <p>회원 탈퇴</p>
              </div>
            </div>
          </div>
          <div>
            <img src="" width="474px" height="500px"></img>
          </div>
        </div>
      </nav>
      <Footer></Footer>
    </>
  );
}
