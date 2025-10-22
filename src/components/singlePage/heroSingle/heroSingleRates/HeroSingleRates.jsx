import "./HeroSingleRates.css";
import RatingNumbers from "../../../RatingNumbers/RatingNumbers";
import { EnToFaNums } from "../../../../ulits";

function HeroSingleRates({
  imdb,
  imdbVoteCount,
  avaRating,
  avaVoteCount,
  metacritic,
  rotten,
}) {
  return (
    <div className="hero-single-rates-container">
      <div className="hero-single-rates">
        {imdb && (
          <div className="hero-single-rate-cont">
            <div className="hero-single-rate">
              <RatingNumbers {...{mainClasses:'hero-single-max-rate',rateClasses:"hero-rate-number",rate:imdb,maxRate:10}}/>
              <img
                src="/assets/rating/img-medium.png"
                alt=""
              />
            </div>
            <span className="hero-single-rate-count">
              {EnToFaNums(imdbVoteCount.toLocaleString())} رای
            </span>
          </div>
        )}
        {avaRating && (
          <div className="hero-single-rate-cont hero-single-avaRate-cont">
            <div className="hero-single-rate">
              <RatingNumbers {...{mainClasses:'hero-single-max-rate',rateClasses:"hero-rate-number",rate:avaRating,maxRate:10}}/>
              <img
                src="/assets/rating/logo-ava-circle.png"
                alt=""
              />
            </div>
            <span className="hero-single-rate-count">
              {EnToFaNums(avaVoteCount.toLocaleString())} رای
            </span>
          </div>
        )}
        {rotten && (
          <div className="hero-single-rate-cont">
            <div className="hero-single-rate">
              <span style={{ fontSize: 14, opacity: "0.9" }}>{rotten}</span>
              <img
                src="/assets/rating/logo-rotten.png"
                alt=""
              />
            </div>
          </div>
        )}
        {metacritic && (
          <div className="hero-single-rate-cont">
            <div className="hero-single-rate">
              <span style={{ fontSize: 14, opacity: "0.9" }}>{metacritic}</span>
              <img
                src="/assets/rating/logo-meta.png"
                alt=""
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSingleRates;
