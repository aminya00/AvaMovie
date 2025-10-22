import "./MultiPage.css";
import { useEffect, useReducer, useState,useRef } from "react";
import NavBar from "../header/navBar/NavBar";
import MainFooter from "../footer/mainFooter/MainFooter";
import MobileFooter from "../footer/mobileFooter/MobileFooter";
import MoviesRowBox from "../mainContent/moviesRowContent/MoviesRowBox/MoviesRowBox";
import { FaRegCirclePlay } from "react-icons/fa6";
import Pagination from "./Pagination/Pagination";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { EnToFaNums } from "../../ulits";
import SelectOptCont from "./SelectOptCont/SelectOptCont";
import NotFoundItem from "../NotFoundItem/NotFoundItem";

function MultiPage({ subject , hasItemCount}) {
  const param = useParams();
  const [pathName, setPathName] = useState(``);
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const [boxesData, setBoxesData] = useState([]);
  const [filterBoxesData, setFilterBoxesData] = useState([]);

  const [showBoxesData, setShowBoxesData] = useState([]);

  const allSeriesFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=isSeries%3Dtrue`
    )
      .then((res) => res.json())
      .then((series) => {
        setBoxesData(series);
        setPathName("/series/page");
      });
  };
  const allMoviesFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=isSeries%3Dfalse`
    )
      .then((res) => res.json())
      .then((movies) => {
        setBoxesData(movies);
        setPathName("/movies/page");
      });
  };
  const collectionFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Collections?pageSize=100&where=urlName%3D'${param.collectionName}'&loadRelations=movies`
    )
      .then((res) => res.json())
      .then((collection) => {
        setBoxesData(collection[0].movies);
        setPageTitle(collection[0].name);
      });
  };
  const listFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Lists?pageSize=100&where=urlName%3D'${param.listName}'&loadRelations=movies`
    )
      .then((res) => res.json())
      .then((list) => {
        setBoxesData(list[0].movies);
        setFilterBoxesData(list[0].movies);
        setPageTitle(list[0].name);
      });
  };
  const genresFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100`
    )
      .then((res) => res.json())
      .then((data) => {
        let genresMovies = data.filter((movie) => movie.genres.includes(param.genresName));
        setBoxesData(genresMovies);
      });
  };
  const suggestedFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100`
    )
      .then((res) => res.json())
      .then((data) => {
        setBoxesData(data.sort(()=>Math.random()-0.5).splice(0,Math.floor(data.length/2)));
      });
  };
  const movieDubFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=isSeries%3Dfalse%20AND%20hasDub%3Dtrue`
    )
      .then((res) => res.json())
      .then((movies) => {
        setBoxesData(movies);
      });
  };
  const seriesDubFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=isSeries%3Dtrue%20AND%20hasDub%3Dtrue`
    )
      .then((res) => res.json())
      .then((series) => {
        setBoxesData(series);
      });
  };
  const koreanSeriesFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=isSeries%3Dtrue`
    )
      .then((res) => res.json())
      .then((series) => {
        let koreanSeries = series.filter((movie) => {
          return movie.countries!=null && movie.countries.some(
            (country) => country.urlName == "South-Korea"
          );
        });
        setBoxesData(koreanSeries);
      });
  };
  const seriesConditionFetch = async (condition) => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=seriesCondition%3D'${condition}'`
    )
      .then((res) => res.json())
      .then((series) => {
        setBoxesData(series);
      });
  };
  const countryFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100`
    )
      .then((res) => res.json())
      .then((series) => {
        let countryTitle=null
        let moviesByCountry = series.filter((movie) => {
          return movie.countries !=null && movie.countries.some(
            (country) => {
              if(country.urlName == param.countryName){
                !countryTitle && (countryTitle=country.name)
                return true
              }
            }
          );
        });
        setPageTitle(countryTitle);
        setBoxesData(moviesByCountry);
      });
  };
  const languageFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100`
    )
      .then((res) => res.json())
      .then((series) => {
        let languageTitle=null
        let moviesBylanguage = series.filter((movie) => {          
          return movie.language != null && movie.language.some(
            (language) => {
              if(language.urlName == param.languageName){
                !languageTitle && (languageTitle=language.name)
                return true
              }
            }
          );
        });
        setPageTitle(languageTitle);
        setBoxesData(moviesBylanguage);
      });
  };
  const streamerFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100`
    )
      .then((res) => res.json())
      .then((series) => {
        let streamerTitle=null
        let streamerMovies = series.filter((serie) => {
          if(serie.streamerName!= null && serie.streamerName[0].urlName==param.streamerName){
            !streamerTitle && (streamerTitle=serie.streamerName[0].name)
            return true
          }else{
            return false
          }
          }
        );
        setPageTitle(streamerTitle);
        setBoxesData(streamerMovies);
      });
  };
  const ageFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=ageRating%3D'${param.ageName}'`
    )
      .then((res) => res.json())
      .then((series) => {
        setBoxesData(series);
      });
  };
 
  useEffect(() => {
    
    switch (subject) {
      case "series":
        allSeriesFetch();
        setPageTitle("سریال‌ها");
        break;

      case "movies":
        allMoviesFetch();
        setPageTitle("فیلم‌ها");
        break;

      case "collection":
        setPathName(`/collection/${param.collectionName}`);
        collectionFetch();
        break;

      case "list":
        setPathName(`/list/${param.listName}`);
        listFetch();
        break;

      case "genres":
        setPathName(`/genres/${param.genresName}`);
        genresFetch();
        setPageTitle(param.genresName);
        break;
      case "suggested":
        setPathName(`/suggested`);
        suggestedFetch();
        setPageTitle("پیشنهادی");
        break;
      case "movie-dub":
        setPathName(`/movie-dub`);
        movieDubFetch();
        setPageTitle("فیلم‌های دوبله");
        break;
      case "series-dub":
        setPathName(`/series-dub`);
        seriesDubFetch();
        setPageTitle("سریال‌های دوبله");
        break;
      case "korean-series":
        setPathName(`/korean-series`);
        setPageTitle("سریال‌های کره‌ای");
        koreanSeriesFetch();
        break;
      case "series-end":
        setPathName(`/series-end`);
        seriesConditionFetch("end");
        setPageTitle("سریالهای به پایان رسیده");
        break;
      case "series-current":
        setPathName(`/series-current`);
        seriesConditionFetch("current");
        setPageTitle("سریال های در حال پخش");
        break;
      case "series-renewed":
        setPathName(`/series-renewed`);
        seriesConditionFetch("renewed");
        setPageTitle("سریالهای تمدید شده");
        break;
      case "series-cancelled":
        setPathName(`/series-cancelled`);
        seriesConditionFetch("cancelled");
        setPageTitle("سریالهای کنسل شده");
        break;
      case "country":
        setPathName(`/country/${param.countryName}`);
        countryFetch();
        break;
      case "language":
        setPathName(`/language/${param.languageName}`);
        languageFetch();
        break;
      case "age":
        setPathName(`/age/${param.ageName}`);
        ageFetch();
        setPageTitle(param.ageName);
        break;
      case "streamer":
        setPathName(`/streamer/${param.streamerName}`);
        streamerFetch();
        setPageTitle(param.ageName);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <>
      {boxesData.length && (
        <>
          <NavBar />
          <div className="multi-page-container wide-screen">
            <div className="multi-boxes-header">
              <div className="multi-box-header-right">
                <h1 className="multi-box-header-title">{pageTitle}</h1>
                {
                  hasItemCount &&
                <div className="multi-box-header-desc">
                  <FaRegCirclePlay />
                  <span>
                    <strong>
                      {EnToFaNums(filterBoxesData.length.toLocaleString())}
                    </strong>{" "}
                    نتیجه یافت شد.
                  </span>
                </div>
                }
              </div>
              {subject != "list" && (
                <SelectOptCont
                  boxesData={boxesData}
                  param={param}
                  pathName={pathName}
                  filterBoxHandler={setFilterBoxesData}
                  subject={subject}
                  searchParams={location.search}
                />
              )}
            </div>
            {
              showBoxesData.length?
            <div className="multi-boxes-container">
              {showBoxesData.map((data) => (
                <Link
                  to={`/${data.isSeries ? "series" : "movies"}/${data.nameUrl}`}
                  key={data.id}
                >
                  <MoviesRowBox {...data} />
                </Link>
              ))}
            </div>
            : <NotFoundItem />
            }
              <Pagination
                boxesArr={filterBoxesData}
                showBoxesFunc={setShowBoxesData}
                pageNumber={param && param.page}
                boexesInPage={12}
                pathName={pathName}
                searchParams={location.search}
              />
          </div>
          <MainFooter />
          <MobileFooter />
        </>
      )}
    </>
  );
}

export default MultiPage;
