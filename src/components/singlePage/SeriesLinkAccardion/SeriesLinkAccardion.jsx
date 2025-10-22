import "./SeriesLinkAccardion.css";
import "../linkAccardion/linkAccardion.css";
import { Link } from "react-router-dom";
import { BsCcCircleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { RiVipCrown2Fill } from "react-icons/ri";
import WithIsShow from "../../HOC/WithIsShow";
import { TbMicrophoneFilled } from "react-icons/tb";
import { EnToFaNums } from "../../../ulits";
import { TbFile } from "react-icons/tb";
import { TbSquareRoundedArrowDown } from "react-icons/tb";
import { authContext } from "../../../contextApi";
import { useContext } from "react";

function SeriesLinkAccardion({
  isShowAccardion,
  accardionShowHand,
  name,
  isSub,
  size,
  downloadLink,
}) {
  const AuthContext=useContext(authContext)

  return (
    <>
      <div className="download-links">
        <div className="download-links-header" onClick={accardionShowHand}>
          <div className="download-links-header-content">
            <div
              className={`download-links-header-flag ${
                !isSub ? "download-links-header-flag-dub" : ""
              }`}
            >
              <div className="download-links-header-flag-icon">
                {isSub ? <BsCcCircleFill /> : <TbMicrophoneFilled />}
              </div>
              <div className="download-links-header-flag-text">
                {isSub ? "زیرنویس" : "دوبله"}
              </div>
            </div>
            <div className="download-links-header-title">
              <div className="download-link-series-detail">کیفیت: {name}</div>
              <div className="download-link-series-detail">
                <TbFile />
                تعداد قسمت: {downloadLink.length}
              </div>
              <div className="download-link-series-detail no-padd">
                <TbSquareRoundedArrowDown />
                حجم: {size}
              </div>
            </div>
          </div>
          <div className="download-links-header-icons">
            {isSub && (
              <span className="download-links-box-series-quality-sub">
                SoftSub
              </span>
            )}
            <div
              className={`download-links-header-icon ${
                isShowAccardion ? "download-links-header-icon-active" : ""
              }`}
            >
              <IoIosArrowDown />
            </div>
          </div>
        </div>
        <div
          className={`download-links-content ${
            isShowAccardion ? "download-links-content-active" : ""
          }`}
        >
          <div className="download-links-header-title mobile-device">
            <div className="download-link-series-detail">
              <TbFile />
              {downloadLink.length}
            </div>
            <div className="download-link-series-detail no-padd">
              <TbSquareRoundedArrowDown />
              {size}
            </div>
            {isSub && (
              <span className="download-links-box-quality-sub-mobile-device">
                SoftSub
              </span>
            )}
          </div>
          {
            AuthContext.userInfos.hasLicense?
             <div className="download-links-box-series-premium">
            {downloadLink.map((episode,index) => (
              <Link to={""} key={index}>
                <div className={`download-link-box-premium-btn series`}>
                  <span className="download-link-box-premium-span">
                   قسمت {EnToFaNums(index+1)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
            :
          <div className="download-links-box-series-no-premium">
            <span className="download-links-box-series-no-premium-title">
              برای فعال شدن لینک‌های دانلود باید اشتراک داشته باشید.
            </span>
            <Link to={"/buy-license"}>
              <div className={`download-link-box-premium-btn series`}>
                <RiVipCrown2Fill className="download-link-box-premium-icon" />
                <span className="download-link-box-premium-span">
                  خرید اشتراک
                </span>
              </div>
            </Link>
          </div>
          }
         
        </div>
      </div>
    </>
  );
}

export default WithIsShow(SeriesLinkAccardion);
