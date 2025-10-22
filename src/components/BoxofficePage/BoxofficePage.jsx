import "./BoxofficePage.css";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
// import NavBar from "../header/navBar/NavBar";
const NavBar = lazy(() => import("../header/navBar/NavBar"));
// import MainFooter from "../footer/mainFooter/MainFooter";
const MainFooter = lazy(() => import("../footer/mainFooter/MainFooter"));
// import MobileFooter from "../footer/mobileFooter/MobileFooter";
const MobileFooter = lazy(() => import("../footer/mobileFooter/MobileFooter"));
// import ImgBoxComp from "../ImgBoxComp/ImgBoxComp";
const ImgBoxComp = lazy(() => import("../ImgBoxComp/ImgBoxComp"));
import { Link } from "react-router-dom";

function BoxofficePage() {
  const [boxofficeBoxes, setBoxofficeBoxes] = useState([]);

  const boxofficeFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Boxoffice?loadRelations=movie`
    )
      .then((res) => res.json())
      .then((movies) => {
        setBoxofficeBoxes(
          movies.toSorted((a, b) => b.totalGross.number - a.totalGross.number)
        );
      });
  };
  useEffect(() => {
    boxofficeFetch();
  }, []);
  return (
    <>
      {boxofficeBoxes.length && (
        <>
          <Suspense>
            <NavBar />
          </Suspense>
          <div className="boxoffice-page-container wide-screen">
            <div className="boxoffice-page-header">
              <h1 className="boxoffice-page-title">باکس آفیس</h1>
            </div>
            <div className="boxoffice-boxes-container">
              {boxofficeBoxes.map((boxoffice, index) => (
                <div className="boxoffice-box" key={boxoffice.id}>
                  <Link to={`/movies/${boxoffice.movie.nameUrl}`}>
                    {" "}
                    <Suspense>
                      <ImgBoxComp
                        {...{
                          imgUrl: boxoffice.movie.cover,
                          imgNumber: index + 1,
                        }}
                      />{" "}
                    </Suspense>
                  </Link>
                  <div className="boxoffice-box-content">
                    <Link to={`/movies/${boxoffice.movie.nameUrl}`}>
                      <div className="boxoffice-box-title">
                        {boxoffice.movie.name}
                      </div>
                    </Link>
                    <div className="boxoffice-box-desc">
                      <div className="boxoffice-box-desc-item">
                        <div className="boxoffice-box-desc-item-title">
                          هفته‌های اکران:
                        </div>
                        <div className="boxoffice-box-desc-item-content">
                          {boxoffice.weekOfRelease}
                        </div>
                      </div>
                      <div className="boxoffice-box-desc-item last-week-boxoffice-box">
                        <div className="boxoffice-box-desc-item-title">
                          فروش آخر هفته:
                        </div>
                        <div className="boxoffice-box-desc-item-content last-week-boxoffice">
                          ${boxoffice.weaklyGross.title}
                        </div>
                      </div>
                      <div className="boxoffice-box-desc-item">
                        <div className="boxoffice-box-desc-item-title">
                          فروش کل:
                        </div>
                        <div className="boxoffice-box-desc-item-content all-boxoffice">
                          ${boxoffice.totalGross.number}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
          </div>{" "}
          <Suspense>
            <MainFooter />{" "}
          </Suspense>
          <Suspense>
            <MobileFooter />{" "}
          </Suspense>
        </>
      )}
    </>
  );
}

export default BoxofficePage;
