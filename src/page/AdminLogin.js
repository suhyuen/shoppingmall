import Footer from "../component/Footer"
import "../css/adminlogin.css"
import "../css/loginpage.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
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
      .post("http://localhost:8080/adminLogin", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })

      .then((response) => {
        localStorage.setItem(
          "accessToken",
          response.headers.get("Authorization")
        );

        navigate("/admin-dashboard1111");
      })

      .catch((err) => {
        alert("아이디 비밀번호를 확인해 주세요.");
      });
  };


  return (<>
    <nav className="admin_login">
      <div className="admin_login_header">Monologue</div>
      <div className="admin_loginbox">
        <div className="loginpage_title">
          <p>Admin Login</p>
        </div>
        <div className="loginpage_main">
          <form onSubmit={handleSubmit}>
            <div className="loginpage_box">
              <div className="admin_loginpage_idpw">
                <p>ID</p>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handlerInputChange}
                ></input>
              </div>
              <div className="admin_loginpage_idpw">
                <p>PW</p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handlerInputChange}
                ></input>
              </div>

              <div className="admin_loginpage_button">
                <button type="submit">관리자로 로그인</button>
              </div>
            </div>

          </form>
        </div>
      </div>
      <Footer></Footer>

    </nav>
  </>)
}