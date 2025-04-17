import Footer from "../component/Footer";
import Header from "../component/Header";
import "../css/homepage.css";
import { useState, useEffect } from "react";


export default function HomePage() {

  const images1 = [
    `${process.env.PUBLIC_URL}/imgs/HomePage_image/HomePage1.1.jpg`,
    `${process.env.PUBLIC_URL}/imgs/HomePage_image/HomePage1.2.jpg`,
    `${process.env.PUBLIC_URL}/imgs/HomePage_image/HomePage1.3.jpg`,
  ];

  const images2 = [
    `${process.env.PUBLIC_URL}/imgs/HomePage_image/HomePage2.1.jpg`,
    `${process.env.PUBLIC_URL}/imgs/HomePage_image/HomePage2.2.jpg`,
    `${process.env.PUBLIC_URL}/imgs/HomePage_image/HomePage2.3.jpg`,
  ];

  const images3 = [
    `${process.env.PUBLIC_URL}/imgs/HomePage_image/HomePage3.1.jpg`,
    `${process.env.PUBLIC_URL}/imgs/HomePage_image/HomePage3.2.jpg`,
    `${process.env.PUBLIC_URL}/imgs/HomePage_image/HomePage3.3.jpg`,
  ];

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [index3, setIndex3] = useState(0);

  const [fade1, setFade1] = useState(true);
  const [fade2, setFade2] = useState(true);
  const [fade3, setFade3] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(images1[index1]);
      setFade1(false);
      setFade2(false);
      setFade3(false);

      setTimeout(() => {
        setIndex1((prev) => (prev + 1) % images1.length);
        setIndex2((prev) => (prev + 1) % images2.length);
        setIndex3((prev) => (prev + 1) % images3.length);

        setFade1(true);
        setFade2(true);
        setFade3(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval); // 💡 메모리 누수 방지
  }, []);




  return (
    <>
      <Header></Header>
      <nav className="homepage">
        <div className="homepage_1">
          <img
            src={images1[index1]}
            className={fade1 ? "fade-in" : "fade-out"}
            height="650px"
            width="555.3px"
          />
          <img
            src={images2[index2]}
            className={fade2 ? "fade-in" : "fade-out"}
            height="650px"
            width="555.3px"
          />
          <img
            src={images3[index3]}
            className={fade3 ? "fade-in" : "fade-out"}
            height="650px"
            width="555.3px"
          />
        </div>
        <div className="homepage_2">
          <div>BEST 20</div>
          <div>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
            <img src="" height="322px" width="278px"></img>
          </div>
        </div>
      </nav>

      <Footer></Footer>
    </>
  );
}
