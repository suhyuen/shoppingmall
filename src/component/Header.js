import "../css/header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../features/userSlice";
import { useEffect } from "react";

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

  const handleClick = (category) => {
    navigate("/product/${category.toLowerCase()");
  };

  return (
    <header>
      <div>
        <div className="logo">
          <Link to="/">Monologue</Link>
        </div>
        <ul>
          <li
            onClick={() => handleClick("NEW-IN 5%")}
            style={{
              fontWeight:
                location.pathname === "/product/new-in-5" ? "bold" : "normal",
            }}
          >
            NEW-IN 5%
          </li>
          <li
            onClick={() => handleClick("BEST 50")}
            style={{
              fontWeight:
                location.pathname === "/product/best-50" ? "bold" : "normal",
            }}
          >
            BEST 50
          </li>
          <li
            onClick={() => handleClick("TOP")}
            style={{
              fontWeight:
                location.pathname === "/product/top" ? "bold" : "normal",
            }}
          >
            TOP
          </li>
          <li
            onClick={() => handleClick("BOTTOM")}
            style={{
              fontWeight:
                location.pathname === "/product/bottom" ? "bold" : "normal",
            }}
          >
            BOTTOM
          </li>
          <li
            onClick={() => handleClick("OUTWEAR")}
            style={{
              fontWeight:
                location.pathname === "/product/outwear" ? "bold" : "normal",
            }}
          >
            OUTWEAR
          </li>
          <li
            onClick={() => handleClick("SUIT")}
            style={{
              fontWeight:
                location.pathname === "/product/suit" ? "bold" : "normal",
            }}
          >
            SUIT
          </li>
          <li
            onClick={() => handleClick("KNIT")}
            style={{
              fontWeight:
                location.pathname === "/product/knit" ? "bold" : "normal",
            }}
          >
            KNIT
          </li>
          <li
            onClick={() => handleClick("SHOESE/BAG")}
            style={{
              fontWeight:
                location.pathname === "/product/shoes-bag" ? "bold" : "normal",
            }}
          >
            SHOESE/BAG
          </li>
          <li
            onClick={() => handleClick("ACC")}
            style={{
              fontWeight:
                location.pathname === "/product/acc" ? "bold" : "normal",
            }}
          >
            ACC
          </li>
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
    </header>
  );
}
