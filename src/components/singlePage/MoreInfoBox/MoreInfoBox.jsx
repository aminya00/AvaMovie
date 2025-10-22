import "./MoreInfoBox.css";
import { TbWorld } from "react-icons/tb";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { TbUsersGroup } from "react-icons/tb";
import { TbMicrophoneFilled } from "react-icons/tb";

function MoreInfoBox({ moreInfoArr, movieObj }) {
  return (
    <>
      <div className="single-more-info-header">
        <div className="single-more-info-header-title">
          <div className="single-more-info-header-icon">
            <IoMdInformationCircleOutline />
          </div>
          <div className="single-more-info-header-text">اطلاعات بیشتر</div>
        </div>
      </div>
      <div className="single-more-info-content">
        <div className="single-more-info-grid-container">
          {moreInfoArr.map(
            (movieInfo, index) =>
              (movieObj.isSeries ||
                !["streamer", "showDay", "seriesCondition"].includes(
                  movieInfo.id
                )) &&
              movieInfo.data && (
                <div
                  className={`single-more-info-grid-boxes pad-left-50-column`}
                  key={movieInfo.id}
                >
                  <div className="single-more-info-grid-boxes-title">
                    <div className="single-more-info-grid-boxes-title-icon">
                      {movieInfo.icon}
                    </div>
                    <div className="single-more-info-grid-boxes-title-text">
                      {movieInfo.title}
                    </div>
                  </div>
                  <div className="single-more-info-grid-boxes-text">
                    {Array.isArray(movieInfo.data) ? (
                      movieInfo.data.map((obj, index) => (
                        <>
                          <Link to={`/${movieInfo.id}/${obj.urlName}/1`} key={obj.urlName}>
                            {obj.name}
                          </Link>
                          {index + 1 != movieInfo.data.length && ", "}
                        </>
                      ))
                    ) : !movieInfo.noLink ? (
                      <Link to={`/${movieInfo.id}/${movieInfo.data}/1`}>
                        {movieInfo.data}
                      </Link>
                    ) : (
                      movieInfo.data
                    )}
                  </div>
                </div>
              )
          )}
        </div>
        <div className="single-more-info-grid-boxes">
          <div className="single-more-info-grid-boxes-title">
            <div className="single-more-info-grid-boxes-title-icon">
              <TbUsersGroup />
            </div>
            <div className="single-more-info-grid-boxes-title-text">
              بازیگران
            </div>
          </div>
        </div>
        <div className="single-more-info-grid-starring-conatiner">
          {movieObj.starring.map((star) => (
            <Link
              to={`/people/${star.urlName}/1`}
              key={star.id}
              className="single-more-info-grid-starring-box-cont"
            >
              <div className="single-more-info-grid-starring-box">
                <div className="single-more-info-grid-starring-box-img">
                  <img src={star.imgUrl} alt="" />
                </div>
                <div className="single-more-info-grid-starring-box-name">
                  {star.name}
                </div>
              </div>
            </Link>
          ))}
          
        </div>
        {movieObj.hasDub && movieObj.dubDesc && (
          <>
            <div className="single-more-info-grid-boxes">
              <div className="single-more-info-grid-boxes-title">
                <div className="single-more-info-grid-boxes-title-icon">
                  <TbMicrophoneFilled />
                </div>
                <div className="single-more-info-grid-boxes-title-text">
                  توضیحات دوبله
                </div>
              </div>
            </div>
            <div className="single-more-info-grid-boxes single-more-info-dub-desc">
              {movieObj.dubDesc.map((dubText, index) => (
                <>
                  <span key={index}>{dubText}</span>
                  {index + 1 != movieObj.dubDesc.length && <br />}
                </>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default MoreInfoBox;
