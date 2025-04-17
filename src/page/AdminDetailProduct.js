import { useEffect, useState } from "react";
import AdminHeader from "../component/AdminHeader";
import Footer from "../component/Footer";
import "../css/admindetailproduct.css"
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminDetailProduct() {

    const navigate = useNavigate();
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

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get("productId");

    const imageUrl = `http://localhost:8080${productData.productImages.productImagePath.replace(/ /g, '%20')}`;

    useEffect(() => {
        axios
            .post(
                `http://localhost:8080/selectDetailProduct?productId=${productId}`,
                { productId },
                {
                    headers: { Authorization: localStorage.getItem("accessToken") },
                    Accept: "image/*",
                }
            )
            .then((resp) => {
                setProductData(resp.data);
            });
    }, [productId]);

    const handleDeleteProduct = (e) => {
        const isConfirmed = window.confirm("상품을 삭제하시겠습니까?");
        if (isConfirmed) {
            axios.post(`http://localhost:8080/deleteProduct?productId=${productId}`, { productId },
                {
                    headers: { Authorization: localStorage.getItem("accessToken") },
                }
            )
                .then((e) => {
                    alert("상품이 삭제되었습니다")
                    navigate("/admin-dashboard1111")

                })
        } else {
            alert("상품 삭제가 취소되었습니다.")
        }
    }

    return (<>
        <AdminHeader></AdminHeader>
        <nav className="admin_detailproduct">
            <div className="admin_detailproduct_main">
                <div>
                    <img src={imageUrl} height="480px" width="400px"></img>
                </div>
                <div className="admin_detailproduct_inf">
                    <div className="admin_detailproduct_inf_text">
                        <p>상품명</p>
                        <div>
                            {productData.productName}
                        </div>

                    </div>
                    <div className="admin_detailproduct_inf_text">
                        <p>가격</p>
                        <div>
                            {productData.price}
                        </div>

                    </div>
                    <div className="admin_detailproduct_inf_text">
                        <p>사이즈</p>
                        <div>
                            {productData.size}
                        </div>

                    </div>
                    <div className="admin_detailproduct_inf_text">
                        <p>남은 재고</p>
                        <div>
                            {productData.stock}
                        </div>
                    </div>
                </div>
            </div>
            <div className="admin_detailproduct_button">
                <button><Link to={`/admin-changeproduct?productId=${productData.productId}`}>상품 수정</Link></button>
                <button onClick={() => {
                    handleDeleteProduct(productData.productId);
                }}>상품 삭제</button>
            </div>
        </nav>
        <Footer></Footer>

    </>)
}