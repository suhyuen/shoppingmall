import { Link, useLocation } from "react-router-dom"
import Header from "../component/Header"
import Footer from "../component/Footer"
import "../css/adminproducts.css"
import { useEffect, useState } from "react"
import axios from "axios"



export default function ProductsPage() {

  const [product, setProduct] = useState([
    {
      productId: "",
      productImageId: "",
      categoryId: "",
      productName: "",
      price: "",
      productImages: {
        productImagePath: ""
      }
    }
  ])

  const location = useLocation();
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
          Accept: "image/*",
        }
      )
      .then((resp) => {
        const filteredProducts = categoryId
          ? resp.data.filter((item) => String(item.categoryId) === categoryId)
          : resp.data;

        setProduct(filteredProducts);
      });
  }, [categoryId]);

  const productList = product.map((data) => {

    const imageUrl = `http://localhost:8080${data.productImages.productImagePath.replace(/ /g, '%20')}`;

    return (
      <Link to={`/detailproduct?productId=${data.productId}`} key={data.productId}><div className="products">
        <img src={imageUrl} width="278px" height="278px" />
        <p>{data.productName}</p>
        <p>{data.price}</p>
      </div></Link>
    )
  })
  return (
    <>
      <Header></Header>
      <nav>
        <div className="product_lists">
          {productList}
        </div>
      </nav>
      <Footer></Footer>
    </>
  );
}
