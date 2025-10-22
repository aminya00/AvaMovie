import "./SearchResultPage.css";
import NavBar from "../header/navBar/NavBar";
import MainFooter from "../footer/mainFooter/MainFooter";
import MobileFooter from "../footer/mobileFooter/MobileFooter";
import { FaRegCirclePlay } from "react-icons/fa6";
import { EnToFaNums } from "../../ulits";
import { Link, useLocation, useParams } from "react-router-dom";
import MoviesRowBox from "../mainContent/moviesRowContent/MoviesRowBox/MoviesRowBox";
import NotFoundItem from "../NotFoundItem/NotFoundItem";
import Pagination from "../MultiPage/Pagination/Pagination";
import { useEffect, useState } from "react";

const SearchResultPage = ({ subject }) => {
  const param = useParams();
  const [pathName, setPathName] = useState(``);
  const location = useLocation();
  const [filterBoxesData, setFilterBoxesData] = useState([]);
  const [showBoxesData, setShowBoxesData] = useState([]);

  const moviesFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/39C1A466-FFEA-41A0-A67F-E13B50D9F97D/data/Movies?pageSize=100`
    )
      .then((res) => res.json())
      .then((movies) => {
        let searchedMovies = movies.filter((movie) => {
          return movie.name.toLowerCase().includes(param.searchParam);
        });
        setFilterBoxesData(searchedMovies);
      });
  };
  const yearFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/39C1A466-FFEA-41A0-A67F-E13B50D9F97D/data/Movies?pageSize=100&where=year%3D${param.year}`
    )
      .then((res) => res.json())
      .then((movies) => {
        setFilterBoxesData(movies);
      });
  };

  useEffect(() => {
    switch (subject) {
      case "search":
        moviesFetch();
        setPathName(`/search/${param.searchParam}`);
        break;
      case "year":
        yearFetch();
        setPathName(`/year/${param.year}`);
        break;
    }
  }, [location.pathname]);

  return (
    <>
      <NavBar />
      <div className="search-result-page-container wide-screen">
        <div className="search-result-page-header">
          <h1 className="search-result-page-header-title">
            {
                subject=='search'?
               ` نتایج جستجوی ${param.searchParam}`
               :subject=='year'?
               ` نتایج سال ${param.year}`
               :''
            }
          </h1>
          <div className="search-result-page-header-desc">
            <FaRegCirclePlay />
            <span>
              <strong>
                {EnToFaNums(filterBoxesData.length.toLocaleString())}
              </strong>{" "}
              نتیجه یافت شد.
            </span>
          </div>
        </div>
        {showBoxesData.length ? (
          <div className="search-result-page-boxes-container">
            {showBoxesData.map((movie) => (
              <Link
                to={`/${movie.isSeries ? "series" : "movies"}/${movie.nameUrl}`}
                key={movie.id}
              >
                <MoviesRowBox {...movie} />
              </Link>
            ))}
          </div>
        ) : (
          <NotFoundItem />
        )}
      </div>
      <Pagination
        boxesArr={filterBoxesData}
        showBoxesFunc={setShowBoxesData}
        pageNumber={param && param.page}
        boexesInPage={12}
        pathName={pathName}
        searchParams={location.search}
      />
      <MainFooter />
      <MobileFooter />
    </>
  );
};
export default SearchResultPage;
