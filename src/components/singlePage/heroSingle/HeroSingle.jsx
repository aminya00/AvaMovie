import "./HeroSingle.css";
import HeroSingleBox from "./heroSingleBox/HeroSingleBox";
import HeroSingleDetail from "./heroSingleDetail/HeroSingleDetail";
import HeroSingleRates from "./heroSingleRates/HeroSingleRates";
import HeroSingleBtns from "./heroSingleBtns/HeroSingleBtns";
import HeroShadow from "../../header/heroHome/heroShadow/HeroShadow";
import { Link } from "react-router-dom";

function HeroSingle({
  objectId,
  nameUrl,
  hasSub,
  hasDub,
  hasOnline,
  cover,
  bgCover,
  name,
  nameFa,
  postScript,
  description,
  genres,
  year,
  imdb,
  imdbVoteCount,
  avaRating,
  avaVoteCount,
  metacritic,
  rotten,
  isSeries,
  imdbPlace,
}) {
  return (
    <div
      className="hero-single-cont"
      style={{ backgroundImage: `url(../../../../${bgCover})` }}
    >
      <div className="hero-single-right">
        <Link to={"/"}>
          <HeroSingleBox {...{ hasSub, hasDub, hasOnline, cover }} />
        </Link>
      </div>
      <div className="hero-single-left">
        <div className="hero-single-content">
          <HeroSingleDetail
            {...{ name, nameFa, postScript, description, genres, year,isSeries }}
          />
          <HeroSingleRates
            {...{
              imdb,
              imdbVoteCount,
              avaRating,
              avaVoteCount,
              metacritic,
              rotten,
            }}
          />
        </div>
        <div className="hero-single-btns-cont">
          <HeroSingleBtns {...{ hasOnline, isSeries,nameUrl,objectId}} />
          {imdbPlace ? (
            <div className="hero-single-imdb-place">
              <div className="hero-single-imdb-place-number"> {imdbPlace}</div>
              <span className="hero-single-imdb-place-title">
                جزو ۲۵۰ فیلم برتر
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <HeroShadow />
    </div>
  );
}

export default HeroSingle;
