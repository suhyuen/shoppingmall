import Header from "../component/Header";
import Footer from "../component/Footer";
import "../css/loginpage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      .post("http://localhost:8080/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })

      .then((response) => {
        localStorage.setItem(
          "accessToken",
          response.headers.get("Authorization")
        );

        navigate("/");
      })

      .catch((err) => {
        alert("아이디 비밀번호를 확인해 주세요.");
      });
  };

  return (
    <>
      <Header></Header>

      <nav className="loginpage">
        <div className="loginpage_title">
          <p>Member Login</p>
        </div>
        <div className="loginpage_main">
          <form onSubmit={handleSubmit}>
            <div className="loginpage_box">
              <div className="loginpage_idpw">
                <p>ID</p>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handlerInputChange}
                ></input>
              </div>
              <div className="loginpage_idpw">
                <p>PW</p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handlerInputChange}
                ></input>
              </div>
              <div className="loginpage_button">
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
          <div className="loginpage_box">
            <div className="loginpage_signup">
              <p>회원가입을 통해 다양한 혜택을 누리세요</p>
              <Link to="/signup">
                <button type="button">SIGN UP</button>
              </Link>
            </div>
            <div className="loginpage_signup">
              <p>아이디 또는 비밀번호를 잊어버리셨습니까?</p>
              <button type="button">Find ID or PW</button>
            </div>
          </div>
        </div>
        <div className="loginpage_title">
          <p>SNS 간편 로그인</p>
        </div>
        <div className="loginpage_sns">
          <div>
            <div>
              <img
                src="http://localhost:3000/imgs/구글 로고-removebg-preview.png"
                height="32px"
                width="32px"
              ></img>
              <p>Google</p>
            </div>
            <div>
              <img
                src="http://localhost:3000/imgs/네이버_로고-removebg-preview.png"
                height="36px"
                width="36px"
              ></img>
              <p>네이버</p>
            </div>
            <div>
              <img
                src="http://localhost:3000/imgs/카카오톡 로고-removebg-preview.png"
                height="30px"
                width="30px"
              ></img>
              <p>카카오톡</p>
            </div>
            <div>
              <img
                src="http://localhost:3000/imgs/애플로고.png"
                height="40px"
                width="40px"
              ></img>
              <p>Apple</p>
            </div>
          </div>
        </div>
      </nav>

      <Footer></Footer>
    </>
  );
}
