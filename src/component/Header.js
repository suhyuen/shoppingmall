import "../css/header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../features/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isLoggedIn, user, token } = useSelector((state) => state.user);
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (storedToken && !isLoggedIn) {
      dispatch(login({ token: storedToken }));
    }
  }, [dispatch, isLoggedIn]); // isLoggedIn 값에 의존하도록 변경

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
    navigate("/");
  };

  const handleLogin = (userData) => {
    dispatch(login(userData));
  };


  const [product, setProduct] = useState([
    {
      productId: "",
      categoryId: "",
      productName: "",
      price: ""
    }
  ])


  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("categoryId");


  useEffect(() => {

    const endpoint = categoryId
      ? `http://localhost:8080/selectProduct?categoryId=${categoryId}`
      : "http://localhost:8080/selectAllProduct";

    axios
      .post(
        endpoint, { categoryId },
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((resp) => {
        setProduct(resp.data);
      });
  }, [categoryId]);


  return (
    <header>
      <div>
        <div className="logo">
          <Link to="/">Monologue</Link>
        </div>
        <ul>
          <li><Link
            to="/product"
            className={categoryId === null || categoryId === "" ? "selected" : ""}
          >All</Link></li>
          <li><Link
            to={`/product?categoryId=1`}
            className={categoryId === "1" ? "selected" : ""}
          >TOP</Link></li>
          <li><Link
            to={`/product?categoryId=2`}
            className={categoryId === "2" ? "selected" : ""}
          >BOTTOM</Link></li>
          <li><Link
            to={`/product?categoryId=3`}
            className={categoryId === "3" ? "selected" : ""}
          >OUTWEAR</Link></li>
          <li><Link
            to={`/product?categoryId=4`}
            className={categoryId === "4" ? "selected" : ""}
          >SUIT</Link></li>
          <li><Link
            to={`/product?categoryId=5`}
            className={categoryId === "5" ? "selected" : ""}
          >KNIT</Link></li>
          <li><Link
            to={`/product?categoryId=6`}
            className={categoryId === "6" ? "selected" : ""}
          >SHOESE/BAG</Link></li>
          <li><Link
            to={`/product?categoryId=7`}
            className={categoryId === "7" ? "selected" : ""}
          >ACC</Link></li>
        </ul>

        <div className="loginbutton">
          {/* 로그인 상태에 따라 버튼 변경 */}
          {isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/mypage")}
                className="loginButton_1"
              >
                {user ? user.name : "MyPage"}
              </button>
              <button onClick={handleLogout}>LogOut</button>
            </>
          ) : (
            <Link to="/login">LOGIN | SIGN UP</Link>
          )}
        </div>
      </div>
    </header >
  );
}
