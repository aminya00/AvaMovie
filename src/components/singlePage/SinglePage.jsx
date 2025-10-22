import "./SinglePage.css";
import { useEffect, lazy } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { BsFillFileEarmarkArrowDownFill } from "react-icons/bs";
import { FaCircleExclamation } from "react-icons/fa6";
import { TbMessage2Filled } from "react-icons/tb";
import { BsFillCollectionFill } from "react-icons/bs";
import { MdFeaturedPlayList } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { HiMiniPlay } from "react-icons/hi2";
import { BsPlayCircleFill } from "react-icons/bs";
import { TbCalendarEvent } from "react-icons/tb";
import { TbLanguageHiragana } from "react-icons/tb";
import { TbCalendarPlus } from "react-icons/tb";
import { TbClockHour11 } from "react-icons/tb";
import { TbUserCircle } from "react-icons/tb";
import { TbDeviceTvOld } from "react-icons/tb";
import { MdOutlineSensors } from "react-icons/md";

// import HeroSingle from "./heroSingle/heroSingle";
const HeroSingle = lazy(() => import("./heroSingle/HeroSingle"));
// import NavBar from "../header/navBar/NavBar";
const NavBar = lazy(() => import("../header/navBar/NavBar"));
// import MainFooter from "../footer/mainFooter/MainFooter";
const MainFooter = lazy(() => import("../footer/mainFooter/MainFooter"));
// import MobileFooter from "../footer/mobileFooter/MobileFooter";
const MobileFooter = lazy(() => import("../footer/mobileFooter/MobileFooter"));
// import LinkAccardion from "./linkAccardion/linkAccardion";
const LinkAccardion = lazy(() => import("./linkAccardion/linkAccardion"));
// import MoreInfoBox from "./MoreInfoBox/MoreInfoBox";
const MoreInfoBox = lazy(() => import("./MoreInfoBox/MoreInfoBox"));
// import MainRow from "../mainContent/mainRows/MainRow";
const MainRow = lazy(() => import("../mainContent/mainRows/MainRow"));
// import MoviesRowContent from "../mainContent/moviesRowContent/moviesRowContent";
const MoviesRowContent = lazy(() =>
  import("../mainContent/moviesRowContent/MoviesRowContent")
);
// import MoviesListRow from "./MoviesListRow/MoviesListRow";
const MoviesListRow = lazy(() => import("./MoviesListRow/MoviesListRow"));
// import CommentsSection from "./CommentsSection/CommentsSection";
const CommentsSection = lazy(() => import("./CommentsSection/CommentsSection"));
// import BoxAccardion from "./BoxAccardion/BoxAccardion";
const BoxAccardion = lazy(() => import("./BoxAccardion/BoxAccardion"));
// import SingleShortHandComp from "./SingleShortHand/SingleShortHandComp";
const SingleShortHandComp = lazy(() =>
  import("./SingleShortHand/SingleShortHandComp")
);

function SinglePage({ isSeries }) {
  const movieParam = useParams();
  const [movieObj, setMovieObj] = useState("");
  const [moviesArr, setMoviesArr] = useState([]);
  const [relatedList, setRelatedList] = useState([]);
  const [movieCollection, setMovieCollection] = useState([]);
  const [moreInfoObj, setMoreInfoObj] = useState([]);
  const [comments, setComments] = useState([]);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [commentsCount, useCommentsCount] = useState(0);
  const linkRef = useRef(null);
  const moreInfoRef = useRef(null);
  const movieListsRef = useRef(null);
  const movieCollectionRef = useRef(null);
  const commentstRef = useRef(null);
  const [singleShortHands, setSingleShortHands] = useState([
    {
      id: "downloads",
      name: "دانلود",
      icon: <BsFillFileEarmarkArrowDownFill />,
      isActive: true,
      refElement: linkRef,
    },
    {
      id: "informations",
      name: "اطلاعات بیشتر",
      icon: <FaCircleExclamation />,
      isActive: false,
      refElement: moreInfoRef,
    },
    {
      id: "comments",
      name: "دیدگاه‌ها",
      icon: <TbMessage2Filled />,
      isActive: false,
      refElement: commentstRef,
    },
    {
      id: "collection",
      name: "کالکشن",
      icon: <BsFillCollectionFill />,
      isActive: false,
      refElement: movieCollectionRef,
    },
    {
      id: "relatedLists",
      name: "لیست‌های مرتبط",
      icon: <MdFeaturedPlayList />,
      isActive: false,
      refElement: movieListsRef,
    },
  ]);

  useEffect(() => {
    let commentsCountVar = comments.length;
    comments.map((comment) => {
      comment.subComments && (commentsCountVar += comment.subComments.length);
    });
    useCommentsCount(commentsCountVar);
  }, [comments]);

  async function singleMovieFetch() {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&where=nameUrl%3D'${movieParam.moviesName}'&loadRelations=collections.movies%2Cdirectors%2Clists.owner%2Clists.movies%2Cstarring%2CmoviesLinks%2CseriesLinks`
    )
      .then((res) => res.json())
      .then((movie) => {
        let movieTemp = movie[0];
        let moreInfoTemp = [
          {
            id: "country",
            icon: <TbWorld />,
            title: "محصول",
            data: movieTemp.countries,
          },
          {
            id: "year",
            icon: <TbCalendarEvent />,
            title: "سال انتشار",
            data: movieTemp.year,
          },
          {
            id: "language",
            icon: <TbLanguageHiragana />,
            title: "زبان",
            data: movieTemp.language,
          },
          {
            id: "age",
            icon: <TbCalendarPlus />,
            title: "رده‌سنی",
            data: movieTemp.ageRating,
          },
          {
            id: "duration",
            icon: <TbClockHour11 />,
            title: "مدت زمان",
            data: `${movieTemp.duration} دقیقه`,
            noLink: true,
          },
          {
            id: "director",
            icon: <TbUserCircle />,
            title: "کارگردان",
            data: movieTemp.directors,
          },
          {
            id: "streamer",
            icon: <TbDeviceTvOld />,
            title: "شبکه پخش‌کننده",
            data: movieTemp.streamerName,
          },
          {
            id: "showDay",
            icon: <TbCalendarPlus />,
            title: "روز پخش",
            data: movieTemp.showDay,
            noLink: true,
          },
          {
            id: "seriesCondition",
            icon: <MdOutlineSensors />,
            title: "وضعیت پخش",
            data:
              movieTemp.seriesCondition == "current"
                ? "در حال پخش"
                : movieTemp.seriesCondition == "renewed"
                ? "تمدید شده"
                : movieTemp.seriesCondition == "cancelled"
                ? "کنسل شده"
                : movieTemp.seriesCondition == "end"
                ? "به پایان رسیده"
                : "",
            noLink: true,
          },
        ];

        setMovieObj(movieTemp);
        setRelatedList(movieTemp.lists);
        setMovieCollection(movieTemp.collections);
        setMoreInfoObj(moreInfoTemp);
        setDownloadLinks(
          movieTemp.moviesLinks.length
            ? movieTemp.moviesLinks
            : movieTemp.seriesLinks
        );
      });
  }
  async function moviesFetch() {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Movies?pageSize=100&loadRelations=collections%2Cdirectors%2Clists%2Cstarring`
    )
      .then((res) => res.json())
      .then((movie) => {
        setMoviesArr(movie.toSorted(() => 0.5 - Math.random()));
      });
  }
  async function commentsFetch() {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/Comments?pageSize=100&where=movieNameUrl%3D'${movieParam.moviesName}'`
    )
      .then((res) => res.json())
      .then((comments) => {
        setComments(comments);
      });
  }

  useEffect(() => {
    singleMovieFetch();
    moviesFetch();
    commentsFetch();
  }, [movieParam.moviesName]);

  const shortHandHandler = (id, element) => {
    setSingleShortHands((prev) => {
      let newSingleShortHands = prev.map((shortHand) => {
        return shortHand.id == id
          ? { ...shortHand, isActive: true }
          : { ...shortHand, isActive: false };
      });
      return newSingleShortHands;
    });
    window.scrollTo({
      top: element.current.offsetTop - 90,
      behavior: "smooth",
    });
  };

  return (
    <>
      {movieObj && (
        <>
          <NavBar />
          <HeroSingle {...movieObj} />
          <div className="single-shorthand-menu">
            <ul className="single-shorthand-menu-ul">
              {singleShortHands.map((shortHand) =>
                shortHand.id == "relatedLists" &&
                !Boolean(relatedList.length) ? null : shortHand.id ==
                    "collection" && !Boolean(movieCollection.length) ? null : (
                    <SingleShortHandComp
                      key={shortHand.id}
                      shortHand={shortHand}
                      shortHandHandler={shortHandHandler}
                      commentsCount={commentsCount}
                    />
                )
              )}
            </ul>
          </div>
          <BoxAccardion
            icon={singleShortHands[0].icon}
            title={"لینک‌های دانلود"}
          >
            <div
              className={`single-body-box-container ${
                isSeries ? "series" : ""
              }`}
              ref={linkRef}
            >
              {downloadLinks
                .toSorted((a, b) => a.flagName - b.flagName)
                .map((links, index) => (
                  <LinkAccardion key={index} {...links} isSeries={isSeries} />
                ))}
            </div>
          </BoxAccardion>
          <BoxAccardion icon={singleShortHands[1].icon} title={"اطلاعات بیشتر"}>
            <div className="single-body-box-container" ref={moreInfoRef}>
              <MoreInfoBox moreInfoArr={moreInfoObj} movieObj={movieObj} />
            </div>
          </BoxAccardion>
          <>
            {Boolean(relatedList.length) && (
              <BoxAccardion
                icon={singleShortHands[4].icon}
                title={"لیست‌های مرتبط"}
              >
                <MainRow
                  headerTitle={"لیست‌های مرتبط"}
                  headerIcon={<HiMiniPlay className="main-row-header-icon" />}
                  mainRowRef={movieListsRef}
                  classes={"single-main-row-container"}
                >
                  <MoviesListRow gridRowCount={1} listArr={relatedList} />
                </MainRow>
              </BoxAccardion>
            )}
            {Boolean(movieCollection.length) && (
              <BoxAccardion icon={singleShortHands[3].icon} title={"کالکشن"}>
                <MainRow
                  headerTitle={"کالکشن"}
                  headerIcon={<HiMiniPlay className="main-row-header-icon" />}
                  mainRowRef={movieCollectionRef}
                  classes={"single-main-row-container"}
                >
                  <MoviesRowContent
                    gridRowCount={1}
                    movieArr={movieCollection[0].movies.filter(
                      (movie) => movie.nameUrl != movieParam.moviesName
                    )}
                  />
                </MainRow>
              </BoxAccardion>
            )}
            <BoxAccardion
              icon={<BsPlayCircleFill />}
              title={"پیشنهاد میکنیم تماشا کنید"}
            >
              <MainRow
                headerTitle={"پیشنهاد میکنیم تماشا کنید"}
                headerIcon={<HiMiniPlay className="main-row-header-icon" />}
                classes={"single-main-row-container"}
              >
                <MoviesRowContent
                  gridRowCount={1}
                  movieArr={moviesArr.slice(0, 10)}
                />
              </MainRow>
            </BoxAccardion>
          </>
          <BoxAccardion icon={singleShortHands[2].icon} title={"دیدگاه‌ها"}>
            <CommentsSection
              commentRef={commentstRef}
              comments={comments}
              commentsCount={commentsCount}
              scrollToComment={singleShortHands[2].refElement}
            />
          </BoxAccardion>
          <MainFooter />
          <MobileFooter />
        </>
      )}
    </>
  );
}

export default SinglePage;
