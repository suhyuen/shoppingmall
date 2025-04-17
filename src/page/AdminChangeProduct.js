import { useEffect, useState } from "react";
import AdminHeader from "../component/AdminHeader";
import Footer from "../component/Footer";
import "../css/admininsertproduct.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminChangeProduct() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const fileSelectedHandler = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // 미리보기 URL 생성
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productId: "",
        productName: "",
        price: "",
        size: "",
        stock: ""
    })

    const [productData, setProductData] = useState([])



    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get("productId");

    const handlerInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    useEffect(() => {
        if (productId) {
            // productId가 존재하면 해당 상품의 데이터를 가져옴
            axios
                .post(
                    `http://localhost:8080/selectDetailProduct?productId=${productId}`,
                    { productId },
                    {
                        headers: { Authorization: localStorage.getItem("accessToken") },
                    }
                )
                .then((resp) => {
                    console.log(resp.data);
                    setProductData(resp.data);
                    // 상품 데이터로 formData 초기화
                    setFormData({
                        productId: resp.data.productId,
                        productName: resp.data.productName,
                        price: resp.data.price,
                        size: resp.data.size,
                        stock: resp.data.stock,
                    });
                })
                .catch((error) => {
                    console.error("상품 데이터 가져오기 실패:", error);
                });
        }
    }, [productId]); // productId가 변경될 때마다 데이터를 불러옴

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post(`http://localhost:8080/updateProduct?productId=${productId}`, formData, {
                headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("accessToken"), },

            })
            .then((e) => {
                console.log(formData);
                navigate("/admin-dashboard1111")
            })
    }

    return (<>
        <AdminHeader></AdminHeader>
        <nav className="admin_insertproduct">
            <div className="admin_insertproduct_img">
                {previewUrl && (
                    <div className="preview-container">
                        <img src={previewUrl} alt="미리보기" style={{ width: '400px', height: '480px' }} />
                    </div>
                )}
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={fileSelectedHandler}
                />
                <div className="select_image">
                    <button
                        type="button"
                        onClick={() => document.getElementById("fileInput").click()}
                    >
                        파일 선택
                    </button>
                </div>

            </div>

            <form onSubmit={handleSubmit}>
                <div className="insertproduct_inf">
                    <div className="">
                        <p>상품명</p>
                        <input type="text" name="productName" value={formData.productName} onChange={handlerInputChange}></input>
                    </div>
                    <div>
                        <p>가격</p>
                        <input type="text" name="price" value={formData.price} onChange={handlerInputChange}></input>
                    </div>
                    <div>
                        <p>사이즈</p>
                        <input type="text" name="size" value={formData.size} onChange={handlerInputChange}></input>
                    </div>
                    <div>
                        <p>재고</p>
                        <input type="text" name="stock" value={formData.stock} onChange={handlerInputChange}></input>
                    </div>
                    <div>
                        <button>상품 수정</button>
                    </div>


                </div>
            </form>
        </nav>
        <Footer></Footer>
    </>
    )
}