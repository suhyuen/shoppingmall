import { useState, useEffect } from "react";
import AdminHeader from "../component/AdminHeader";
import Footer from "../component/Footer";
import "../css/admininsertproduct.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function AdminInsertProduct() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formproductImageData, setFormProductImageData] = useState({
        productImagePath: ""
    })
    const [uploadProductImageId, setUploadProductImageId] = useState({ productImageId: "" });
    const [formProductData, setFormProductData] = useState({
        category: "",
        categoryId: "",
        productName: "",
        price: "",
        size: "",
        stock: ""
    })

    const handlerInputChange = (e) => {
        const { name, value } = e.target;
        setFormProductImageData({
            ...formproductImageData,
            [name]: value,
        })

        setFormProductData({
            ...formProductData,
            [name]: value,
        })
    }


    const handleCategoryChange = (e) => {
        const category = e.target.value;
        let categoryId = "";

        if (category === "top") categoryId = "1";
        else if (category === "bottom") categoryId = "2";
        else if (category === "outwear") categoryId = "3";
        else if (category === "suit") categoryId = "4";
        else if (category === "knit") categoryId = "5";
        else if (category === "shoese/bag") categoryId = "6";
        else if (category === "acc") categoryId = "7"

        // categoryId 상태를 업데이트
        setFormProductData({
            ...formProductData,
            categoryId: categoryId,
            category: category
        });
    }

    const fileSelectedHandler = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // 미리보기 URL 생성
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);

        handleImageSubmit(file);
    }
    
    const handleImageSubmit = (file) => {
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        axios
            .post("http://localhost:8080/uploadImage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                console.log("이미지 업로드 성공:", response.data);

                // 서버에서 이미지 경로를 응답하면 저장
                setFormProductImageData({ productImagePath: response.data.productImagePath });
                setUploadProductImageId(response.data.productImageId);


            })
            .catch((error) => {
                console.error("이미지 업로드 실패:", error);
            });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = {
            ...formProductData,
            productImageId: uploadProductImageId,
        };

        console.log("🛠️ 상품 데이터 확인:", productData);

        axios
            .post("http://localhost:8080/insertProduct", productData, {
                headers: { "Content-Type": "application/json", Authorization: localStorage.getItem("accessToken"), },

            })
            .then((e) => {

                navigate("/admin-dashboard1111")
            })
            .catch((error) => {
                console.error("요청 실패:", error);
                // 에러 메시지 출력 (필요한 경우)
                if (error.response) {
                    console.error("서버 응답 오류:", error.response);
                } else if (error.request) {
                    console.error("요청 오류:", error.request);
                } else {
                    console.error("오류 발생:", error.message);
                }
            });

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
                    <div>
                        <p>카테고리</p>
                        <select id="category" name="category" onChange={handleCategoryChange} value={formProductData.category}>
                            <option value="">카테고리</option>
                            <option value="top">TOP</option>
                            <option value="bottom">BOTTOM</option>
                            <option value="outwear">OUTWEAR</option>
                            <option value="suit">SUIT</option>
                            <option value="knit">KNIT</option>
                            <option value="shoese/bag">SHOESE/BAG</option>
                            <option value="acc">ACC</option>
                        </select>
                    </div>
                    <div>
                        <p>상품명</p>
                        <input type="text" name="productName" value={formProductData.productName} onChange={handlerInputChange}></input>
                    </div>
                    <div>
                        <p>가격</p>
                        <input type="text" name="price" value={formProductData.price} onChange={handlerInputChange}></input>
                    </div>
                    <div>
                        <p>사이즈</p>
                        <input type="text" name="size" value={formProductData.size} onChange={handlerInputChange}></input>
                    </div>
                    <div>
                        <p>재고</p>
                        <input type="text" name="stock" value={formProductData.stock} onChange={handlerInputChange}></input>
                    </div>
                    <div>
                        <button>상품등록</button>
                    </div>


                </div>
            </form>
        </nav>
        <Footer></Footer>
    </>
    )
}