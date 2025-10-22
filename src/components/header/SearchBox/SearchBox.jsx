import "./SearchBox.css";
import "../headerBtn/HeaderBtn.css";
import { SlClose } from "react-icons/sl";
import { FiSearch } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { VscTriangleUp } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ isOpenSearch, openCloseSearch ,setOpenSearch}) => {
  const searchInputElem=useRef()
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const navigate=useNavigate()

  const moviesFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/39C1A466-FFEA-41A0-A67F-E13B50D9F97D/data/Movies?pageSize=100`
    )
      .then((res) => res.json())
      .then((movies) => {
        setAllMovies(movies);
      });
  };
  const searchMovieshandler = (e) => {
    if (e.target.value.trim()) {
      let searchedMovies = [...allMovies].filter((movie) => {
        return movie.name.toLowerCase().includes(e.target.value.trim().toLowerCase());
      });
      setSearchMovies(searchedMovies);
    } else {
      setSearchMovies([]);
    }
  };
  function submitSearch() {
    navigate(`/search/${searchBoxValue}/1`)
    setOpenSearch(false)
  }
  useEffect(() => {
    moviesFetch();
  }, []);

  return (
    <div className="nav-search-container">
      {isOpenSearch && (
        <SlClose
          onClick={() => {
            openCloseSearch();
          }}
          className="nav-search-close-btn"
        />
      )}

      <form
        className={`searchForm ${isOpenSearch ? "disappeared" : ""}`}
        style={
          isOpenSearch ? { border: " 1px solid rgba(255, 255, 255, .2)" } : null
        }
        onSubmit={(e)=>{e.preventDefault()
          submitSearch()}}
      >
        <div
          onClick={() => {
            !isOpenSearch && openCloseSearch()
          }}
          className={`${
            isOpenSearch ? "header-submit-btn" : ""
          } header-btn-Container header-search-btn `}
        >
          <FiSearch className="nav-icon-size" />
        </div>
        <input
          className={`nav-search-box-input ${
            !isOpenSearch ? "nav-search-close-input" : ""
          }`}
          autoFocus
          type="text"
          placeholder="جست‌وجو کنید..."
          value={searchBoxValue}
          ref={searchInputElem}
          onChange={(e) => {
            setSearchBoxValue(e.target.value);
            searchMovieshandler(e);
          }}
        />

        {isOpenSearch && (
          <div className="header-filter-btn" onClick={submitSearch}>
            <FiSearch className="nav-icon-size" />
          </div>
        )}
      </form>
      <div
        className={`search-result ${
          !isOpenSearch || !searchBoxValue ? "closeSearchResult" : ""
        }`}
      >
        {searchMovies.length ? (
          <>
            <div className="search-result-header">
              <div className="search-result-header-title">نتایج جست‌وجو</div>
              <a href={`/search/${searchBoxValue.trim()}/1`} className="search-result-header-btn">
                نمایش کل نتایج
                <FaArrowLeft />
              </a>
            </div>
            <div className="search-result-boxes-container">
              {[...searchMovies].slice(0, 3).map((movie) => (
                <a
                  href={`/${movie.isSeries ? "series" : "movies"}/${
                    movie.nameUrl
                  }`}
                  key={movie.nameUrl}
                >
                  <div className="search-result-box">
                    <div className="search-result-box-detail">
                      <span className="search-result-box-imdb">
                        {movie.imdb}
                        <img src={"/assets/rating/imdb-min.png"} alt="" />
                      </span>
                      <span className="search-result-box-name">
                        {movie.name}
                      </span>
                      <span className="search-result-box-year">
                        {movie.year}
                      </span>
                      <span className="search-result-box-genres">
                        {movie.genres.join(" | ")}
                      </span>
                    </div>
                    <div className="search-result-box-img">
                      <img src={movie.cover} alt="" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        ) : (
          <span className="no-result-text">جست‌وجو شما نتیجه‌ای نداشت</span>
        )}
        <VscTriangleUp className="search-result-svg" />
      </div>
    </div>
  );
};
export default SearchBox;
