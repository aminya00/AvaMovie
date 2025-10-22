import "./HeroDetail.css";
import { Link } from "react-router-dom";
import { lazy,Suspense } from "react";
// import RatingNumbers from "../../../RatingNumbers/RatingNumbers";
const RatingNumbers = lazy(() => import("../../../RatingNumbers/RatingNumbers"));


function HeroDetail({ name, imdb, description, nameUrl, isSeries }) {
  return (
    <div className="hero-detail-cont">
      <h2 className="hero-detail-name">{name}</h2>
      <div className="hero-detail-line"></div>
      <div className="hero-detail-rate-cont">
        <Suspense>
        <RatingNumbers {...{mainClasses:'hero-detail-max-rate',rateClasses:'hero-detail-rate-num',maxRate:10,rate:imdb}}/>
        </Suspense>
        <img src="/assets/rating/img-medium.png" alt="" />
      </div>
      <div className="hero-detail-desc">{description}</div>

      <Link to={`${isSeries ? "series" : "movies"}/${nameUrl}`}>
        <div className="hero-detail-btn">مشاهده</div>
      </Link>

    </div>
  );
}

export default HeroDetail;
