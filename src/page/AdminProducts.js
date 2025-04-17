import { Link, useLocation } from "react-router-dom"
import AdminHeader from "../component/AdminHeader"
import Footer from "../component/Footer"
import "../css/adminproducts.css"
import { useEffect, useState } from "react"
import axios from "axios"



export default function AdminProducts() {

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
      <Link to={`/admin-detailproduct?productId=${data.productId}`} key={data.productId}><div className="products">
        <img src={imageUrl} width="278px" height="278px" />
        <p>{data.productName}</p>
        <p>{data.price}</p>
      </div></Link>
    )
  })
  return (
    <>

      <AdminHeader></AdminHeader>
      <nav className="admin_products">
        <div className="admin_products_header">
          <ul>
            <li><Link
              to="/admin-products"
              className={categoryId === null || categoryId === "" ? "selected" : ""}
            >All</Link></li>
            <li><Link
              to={`/admin-products?categoryId=1`}
              className={categoryId === "1" ? "selected" : ""}
            >TOP</Link></li>
            <li><Link
              to={`/admin-products?categoryId=2`}
              className={categoryId === "2" ? "selected" : ""}
            >BOTTOM</Link></li>
            <li><Link
              to={`/admin-products?categoryId=3`}
              className={categoryId === "3" ? "selected" : ""}
            >OUTWEAR</Link></li>
            <li><Link
              to={`/admin-products?categoryId=4`}
              className={categoryId === "4" ? "selected" : ""}
            >SUIT</Link></li>
            <li><Link
              to={`/admin-products?categoryId=5`}
              className={categoryId === "5" ? "selected" : ""}
            >KNIT</Link></li>
            <li><Link
              to={`/admin-products?categoryId=6`}
              className={categoryId === "6" ? "selected" : ""}
            >SHOESE/BAG</Link></li>
            <li><Link
              to={`/admin-products?categoryId=7`}
              className={categoryId === "7" ? "selected" : ""}
            >ACC</Link></li>
          </ul>
        </div>
        <div className="product_lists">
          {productList}
        </div>
        <div className="admin_insertProduct">
          <Link to="/admin-insertproduct"><button>상품등록</button></Link>
        </div>
      </nav>
      <Footer></Footer>
    </>
  )
}