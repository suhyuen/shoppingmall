import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../component/Header";
import Footer from "../component/Footer";
import "../css/paymentpage.css"; // 스타일시트 추가

export default function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get("productId");

    // 결제 정보 state
    const [paymentData, setPaymentData] = useState({
        cardNumber: "",
        cardHolder: "",
        expirationDate: "",
        cvv: "",
    });

    const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

    // 결제 정보 입력 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({
            ...paymentData,
            [name]: value,
        });
    };

    // 결제 요청
    const handlePaymentSubmit = (e) => {
        e.preventDefault();

        // 결제 정보가 유효한지 체크
        if (!paymentData.cardNumber || !paymentData.cardHolder || !paymentData.expirationDate || !paymentData.cvv) {
            alert("모든 결제 정보를 입력해주세요.");
            return;
        }

        // 결제 요청 (예시, 실제 결제 API와 연동 필요)
        axios.post("http://localhost:8080/payment", paymentData, {
            headers: { Authorization: localStorage.getItem("accessToken") },
        })
            .then((response) => {
                // 결제 성공 시 처리
                setIsPaymentSuccessful(true);
                alert("결제가 성공적으로 완료되었습니다.");
                navigate(`/orderComplete?productId=${productId}`);  // 주문 완료 화면으로 이동
            })
            .catch((error) => {
                console.error("결제 실패:", error);
                alert("결제에 실패했습니다. 다시 시도해주세요.");
            });
    };

    return (
        <>
            <Header />
            <nav>
                <div className="payment-container">
                    <h2>신용카드/체크카드 결제</h2>
                    <form onSubmit={handlePaymentSubmit} className="payment-form">
                        <div className="form-group">
                            <label htmlFor="cardNumber">카드 번호</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                value={paymentData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="카드 번호"
                                maxLength="16"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cardHolder">카드 소유자명</label>
                            <input
                                type="text"
                                id="cardHolder"
                                name="cardHolder"
                                value={paymentData.cardHolder}
                                onChange={handleInputChange}
                                placeholder="카드 소유자명"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="expirationDate">유효 기간 (MM/YY)</label>
                            <input
                                type="text"
                                id="expirationDate"
                                name="expirationDate"
                                value={paymentData.expirationDate}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                maxLength="5"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={paymentData.cvv}
                                onChange={handleInputChange}
                                placeholder="CVV"
                                maxLength="3"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="payment-button">
                                결제하기
                            </button>
                        </div>
                    </form>

                    {isPaymentSuccessful && (
                        <div className="payment-success">
                            <p>결제가 완료되었습니다. 감사합니다!</p>
                        </div>
                    )}
                </div>
            </nav>
            <Footer />
        </>
    );
}
