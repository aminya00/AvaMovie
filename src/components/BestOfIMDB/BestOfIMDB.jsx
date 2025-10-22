import "./BestOfIMDB.css";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
// import NavBar from "../header/navBar/NavBar";
const NavBar = lazy(() => import("../header/navBar/NavBar"));
// import MainFooter from "../footer/mainFooter/MainFooter";
const MainFooter = lazy(() => import("../footer/mainFooter/MainFooter"));
// import MobileFooter from "../footer/mobileFooter/MobileFooter";
const MobileFooter = lazy(() => import("../footer/mobileFooter/MobileFooter"));
// import ImgBoxComp from "../ImgBoxComp/ImgBoxComp";
const ImgBoxComp = lazy(() => import("../ImgBoxComp/ImgBoxComp"));
// import Pagination from "../MultiPage/Pagination/Pagination";
const Pagination = lazy(() => import("../MultiPage/Pagination/Pagination"));
import { useLocation, useParams, Link } from "react-router-dom";
import { EnToFaNums } from "../../ulits";

function BestOfIMDB({ isSeries }) {
  const [moviesArr, setMoviesArr] = useState([]);
  const [showBoxesData, setShowBoxesData] = useState([]);
  const param = useParams();
  const location = useLocation();
  const pathName = useRef();

  const bestImdbFetch = async (isSeries) => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=imdbPlace!%3D0%20AND%20isSeries%3D${isSeries}&sortBy=%60imdbPlace%60%20desc`
    )
      .then((res) => res.json())
      .then((movies) => {
        setMoviesArr(movies.toReversed());
      });
  };
  useEffect(() => {
    bestImdbFetch(isSeries);
    isSeries
      ? (pathName.current = "/250series")
      : (pathName.current = "/250movies");
  }, []);
  return (
    <>
      {moviesArr.length && (
        <>
          <Suspense>
            <NavBar />
          </Suspense>
          <div className="imdb-page-container wide-screen">
            <div className="imdb-page-header">
              <h1 className="imdb-page-title">
                {isSeries ? "۲۵۰ سریال برتر" : "۲۵۰ فیلم برتر"}
              </h1>
            </div>
            <div className="imdb-boxes-container">
              {showBoxesData.map((item, index) => (
                <div
                  key={item.id}
                  className={`imdb-box ${
                    index + 1 == showBoxesData.length ? "last-imdb-box" : ""
                  }`}
                >
                  <Link
                    to={`/${isSeries ? "series" : "movies"}/${item.nameUrl}`}
                  >
                    <Suspense>
                      <ImgBoxComp
                        {...{
                          imgUrl: item.cover,
                          imgNumber: item.imdbPlace,
                        }}
                      />{" "}
                    </Suspense>
                  </Link>
                  <div className="imdb-box-content">
                    <div className="imdb-box-scores-container">
                      <div className="imdb-box-score">
                        <span className="imdb-box-vote-count">
                          ({EnToFaNums(item.avaVoteCount.toLocaleString())} رای)
                        </span>
                        <span className="imdb-box-score-num">
                          {item.avaRating}
                        </span>
                        <img src="/assets/rating/ava-min.png" alt="" />
                      </div>
                      <div className="imdb-box-score-line"></div>
                      <div className="imdb-box-score">
                        <span className="imdb-box-vote-count">
                          ({EnToFaNums(item.imdbVoteCount.toLocaleString())}{" "}
                          رای)
                        </span>
                        <span className="imdb-box-score-num">{item.imdb}</span>
                        <img src="/assets/rating/imdb-min.png" alt="" />
                      </div>
                    </div>
                    <Link
                      to={`/${isSeries ? "series" : "movies"}/${item.nameUrl}`}
                    >
                      <div className="imdb-box-desc-title">
                        {item.name} ({item.year})
                      </div>
                    </Link>
                    <div className="imdb-box-desc-content">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Suspense>
            <Pagination
              boxesArr={moviesArr}
              showBoxesFunc={setShowBoxesData}
              pageNumber={param && param.page}
              boexesInPage={10}
              pathName={pathName.current}
              searchParams={location.search}
            />{" "}
          </Suspense>

          <Suspense>
            <MainFooter />
          </Suspense>
          <Suspense>
            <MobileFooter />
          </Suspense>
        </>
      )}
    </>
  );
}

export default BestOfIMDB;
