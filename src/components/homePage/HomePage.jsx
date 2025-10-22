import { Link } from "react-router-dom";
import "./HomePage.css";
import { MdOutlineSensors } from "react-icons/md";
import { BiSolidMovie } from "react-icons/bi";
import { useEffect, useState,lazy,Suspense } from "react";
import { HiMiniPlay } from "react-icons/hi2";
// import NavBar from "../header/navBar/NavBar";
const NavBar = lazy(() => import("../header/navBar/NavBar"));
// import MainRow from "../mainContent/mainRows/MainRow";
const MainRow = lazy(() => import("../mainContent/mainRows/MainRow"));
// import MotwRowContent from "../mainContent/MotwRowContent/MotwRowContent";
const MotwRowContent = lazy(() => import("../mainContent/MotwRowContent/MotwRowContent"));
// import GridRowContent from "../mainContent/SeriesRowContent/GridRowContent";
const GridRowContent = lazy(() => import("../mainContent/SeriesRowContent/GridRowContent"));
// import MoviesRowContent from "../mainContent/moviesRowContent/moviesRowContent";
const MoviesRowContent = lazy(() => import("../mainContent/moviesRowContent/MoviesRowContent"));
// import HeroHome from "../header/heroHome/HeroHome";
const HeroHome = lazy(() => import("../header/heroHome/HeroHome"));
// import MainFooter from "../footer/mainFooter/MainFooter";
const MainFooter = lazy(() => import("../footer/mainFooter/MainFooter"));
// import MobileFooter from "../footer/mobileFooter/MobileFooter";
const MobileFooter = lazy(() => import("../footer/mobileFooter/MobileFooter"));


function HomePage() {

  const [databaseState, setDatabaseState] = useState([]);
  const [seriesState, setSeriesState] = useState([]);
  const [moviesState, setMoviesState] = useState([]);
  const [animeState, setAnimeState] = useState([]);
  const [asianState, setAsianState] = useState([]);
  
  async function allMoviesFetch() {
    await fetch(
      "https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDatabaseState(data);
      });
  }
  async function seriesFetch() {
    await fetch(
      "https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=isSeries%3Dtrue"
    )
      .then((res) => {
        return res.json();
      })
      .then((series) => {
        setSeriesState(series);
      });
  }
  async function moviesFetch() {
    await fetch(
      "https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=isSeries%3Dfalse"
    )
      .then((res) => {
        return res.json();
      })
      .then((movies) => {
        setMoviesState(movies);
      });
  }
  async function animeFetch() {
    await fetch(
      "https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=kind%3D'anime'"
    )
      .then((res) => {
        return res.json();
      })
      .then((anime) => {
        setAnimeState(anime);
      });
  }
  async function asianFetch() {
    await fetch(
      "https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=kind%3D'east-asian'"
    )
      .then((res) => {
        return res.json();
      })
      .then((asian) => {
        setAsianState(asian);
      });
  }

  useEffect(() => {
    allMoviesFetch();
    seriesFetch()
    moviesFetch()
    animeFetch()
    asianFetch()
  }, []);

  return (
    <>
      {databaseState.length && seriesState.length && moviesState.length && animeState.length && asianState.length &&   (
        <>
        <Suspense>
          <NavBar />
        </Suspense>
        <Suspense>
          <HeroHome movieArr={databaseState} />        </Suspense>
        <Suspense>

          <MainRow
            headerTitle={"پربازدیدترین‌های هفته"}
            headerIcon={
              <MdOutlineSensors
                className="main-row-header-icon"
              />
            }
            headerBtnTitle={""}
          >        <Suspense>
            <MotwRowContent movieArr={[...databaseState].splice(0,8)} />        </Suspense>
          </MainRow>
        </Suspense>
        <Suspense>

          <MainRow
            headerTitle={"سریال‌های بروز شده"}
            headerIcon={
              <BiSolidMovie
                className="main-row-header-icon"
              />
            }
            headerBtnTitle={"تمامی سریال‌ها"}
            headerBtnLink={'/series/page/1'}
          >        <Suspense>
            <GridRowContent gridRowCount={2} movieArr={[...seriesState].splice(0,8)} />        </Suspense>
          </MainRow>
        </Suspense>
        <Suspense>

          <MainRow
            headerTitle={"انیمه‌های بروز شده"}
            headerIcon={
              <BiSolidMovie
                className="main-row-header-icon"
              />
            }
            headerBtnLink={'/series/page/1/?kind=anime&category=همه'}
            headerBtnTitle={"تمامی سریال‌ها"}
            >        <Suspense>
            <GridRowContent gridRowCount={1} movieArr={[...animeState].splice(0,4)} />        </Suspense>
          </MainRow>
        </Suspense>
        <Suspense>

          <MainRow
            headerTitle={"سریال‌های آسیای شرقی"}
            headerIcon={
              <BiSolidMovie
              className="main-row-header-icon"
              />
            }
            headerBtnLink={'/series/page/1/?kind=east-asian&category=همه'}
            headerBtnTitle={"تمامی سریال‌ها"}
            >        <Suspense>
            <GridRowContent gridRowCount={1} movieArr={[...asianState].splice(0,4)} />        </Suspense>
          </MainRow>
        </Suspense>
        <Suspense>
          <MainRow
            headerTitle={"جدیدترین فیلم‌ها"}
            headerIcon={
              <HiMiniPlay
              className="main-row-header-icon"
              />
            }
            headerBtnLink={'/movies/page/1'}
            headerBtnTitle={"مشاهده بیشتر"}
          >        <Suspense>
            <MoviesRowContent gridRowCount={2} movieArr={[...moviesState].splice(0,10)} />        </Suspense>
          </MainRow>        </Suspense>
        <Suspense>
          <MainFooter />        </Suspense>
        <Suspense>
          <MobileFooter />        </Suspense>
        </>
      )}
    </>
  );
}
export default HomePage;
