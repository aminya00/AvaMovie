import "./HeroSingleDetail.css";
import { Link } from "react-router-dom";
import { GrFormRefresh } from "react-icons/gr";

function HeroSingleDetail({
  name,
  nameFa,
  postScript,
  description,
  genres,
  year,
  isSeries
}) {
  return (
    <div className="hero-single-detail">
      <div className="hero-single-name-cont">
        <span className="hero-single-name">
          دانلود {isSeries?"سریال":"فیلم"} <span>{name}</span>
        </span>
        <div className="hero-single-name-fa">
          {nameFa}
          {` (${year})`}
        </div>
      </div>
      <div className="hero-single-genres">
        <span>ژانر: </span>
        {genres.map((gener, index) => (
          <>
            <Link key={index} to={`/genres/${gener}/1`}>
              <span>
                {gener}
                {index + 1 != genres.length ? "، " : null}
              </span>
            </Link>
          </>
        ))}
      </div>
      <div className="hero-single-desc">
        <span>{description}</span>
      </div>
      {postScript && (
        postScript.map((item,index)=>(
        <>
        <div className="hero-single-ps" key={item.index}>
          <GrFormRefresh />
          <span>{item}</span>
        </div>
        </>
        ))
      )}
    </div>
  );
}

export default HeroSingleDetail;
