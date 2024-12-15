import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";
import "../css/signuppage.css";
import { useState, useEffect } from "react";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

export default function SignupPage() {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address, setAddress] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState("");
  const [id, setId] = useState(""); //사용자가 입력한 ID
  const [idError, setIdError] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const navigate = useNavigate();

  const [phone1, setPhone1] = useState("010");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");

  const clickButton = () => {
    setOpenPostcode((prev) => !prev);
  };

  const selectAddress = (data) => {
    setAddress(data.address);
    setFormUserData((prevData) => ({
      ...prevData,
      address: data.address,
    }));
    setOpenPostcode(false);
  };

  const [formUserData, setFormUserData] = useState({
    id: "",
    pw: "",
    userName: "",
    userName: "",
    birth: "",
    address: "",
    detailAddress: "",
    phoneNumnber: "",
  });

  useEffect(() => {
    setFormUserData((prevData) => ({
      ...prevData,
      phoneNumber: `${phone1}-${phone2}-${phone3}`,
    }));
  }, [phone1, phone2, phone3]);

  const handlePhone1Change = (e) => {
    setPhone1(e.target.value);
  };

  const handlePhone2Change = (e) => {
    setPhone2(e.target.value);
  };

  const handlePhone3Change = (e) => {
    setPhone3(e.target.value);
  };

  const handlePwChange = (e) => {
    setFormUserData.pw(e.target.value);
    validatePasswords(e.target.value.pw2);
  };

  const handlePw2Change = (e) => {
    setPw2(e.target.value);
    validatePasswords(formUserData.pw, e.target.value);
  };

  //비밀번호 재확인 코드
  const validatePasswords = (pw, pw2) => {
    if (pw !== pw2) {
      setError("비밀번호가 일치하지 않습니다.");
    } else {
      setError("");
    }
  };

  const handlerInputChange = (e) => {
    const { name, value } = e.target;

    setFormUserData({
      ...formUserData,
      [name]: value,
    });
  };

  // 중복 확인 함수
  const checkIdDuplicate = async () => {
    const { id } = formUserData; // formUserData에서 id 가져오기

    if (!id.trim()) {
      return;
    }

    setIsChecking(true);

    try {
      const response = await axios.post("http://localhost:8080/check-id", {
        id,
      });

      if (response.data === "ID is already taken.") {
        setIsDuplicate(true);
        alert("이미 존재하는 아이디입니다.");
      } else {
        setIsDuplicate(false);
        alert("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      console.error("중복 확인 오류:", error);
      setIdError("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    } finally {
      setIsChecking(false); // 중복 확인 완료
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/signup", formUserData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((e) => {
        navigate("/login");
      });
  };

  return (
    <>
      <Header></Header>
      <form onSubmit={handleSubmit}>
        <nav>
          <div className="signup_main">
            <div className="signup_inform">
              <p>Signup</p>
              <div className="signup_id">
                <p>아이디</p>
                <div>
                  <input
                    type="text"
                    name="id"
                    value={formUserData.id}
                    onChange={handlerInputChange}
                  ></input>
                  <button
                    type="button"
                    onClick={checkIdDuplicate}
                    disabled={isChecking}
                  >
                    중복확인
                  </button>
                </div>
              </div>
              <div className="signup_pw">
                <p>비밀번호</p>
                <input
                  type="password"
                  name="pw"
                  value={formUserData.pw}
                  onChange={handlerInputChange}
                ></input>
              </div>
              <div className="signup_pw">
                <p>비밀번호 재확인</p>
                <input
                  type="passsword"
                  value={pw2}
                  onChange={handlePw2Change}
                ></input>
              </div>
              <br />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className="signup_pw">
                <p>이름</p>
                <input
                  type="text"
                  name="userName"
                  value={formUserData.userName}
                  onChange={handlerInputChange}
                ></input>
              </div>
              <div className="signup_date">
                <p>생년월일</p>
                <input
                  type="date"
                  name="birth"
                  value={formUserData.birth}
                  onChange={handlerInputChange}
                ></input>
              </div>
              <div className="signup_address">
                <p>주소(기본 배송지)</p>
                <div>
                  <input
                    type="text"
                    name="address"
                    value={formUserData.address}
                    onChange={handlerInputChange}
                    readOnly
                  />
                  <button type="button" onClick={clickButton}>
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
              <div className="signup_detail_address">
                <p>상세주소</p>
                <input
                  type="text"
                  name="detailAddress"
                  value={formUserData.detailAddress}
                  onChange={handlerInputChange}
                ></input>
              </div>
              <div className="signup_phonenumber">
                <p>휴대폰 번호</p>
                <div
                  name="phoneNumber"
                  value={formUserData.phoneNumnber}
                  onChange={handlerInputChange}
                >
                  <select>
                    <option value="통신사">통신사</option>
                    <option value="KT">KT</option>
                    <option value="SK">SK</option>
                    <option value="LG">LG</option>
                  </select>
                  <input
                    type="text"
                    value={phone1}
                    onChange={handlePhone1Change}
                  />
                  <input
                    type="text"
                    value={phone2}
                    onChange={handlePhone2Change}
                  />
                  <input
                    type="text"
                    value={phone3}
                    onChange={handlePhone3Change}
                  />
                  <button type="button">인증 받기</button>
                </div>
              </div>
              <div className="signup_phonenumber">
                <p>인증번호 입력</p>
                <input type="text"></input>
                <button type="button">인증번호 확인</button>
              </div>
            </div>
          </div>

          <div className="signup_formbutton">
            <button type="submit">회원 가입</button>
          </div>
        </nav>
      </form>
      <Footer></Footer>
    </>
  );
}
