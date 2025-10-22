import "./linkAccardion.css";
import { Link } from "react-router-dom";
import { BsCcCircleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { RiVipCrown2Fill } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";
import WithIsShow from "../../HOC/WithIsShow";
import { TbMicrophoneFilled } from "react-icons/tb";
import { EnToFaNums } from "../../../ulits";
import SeriesLinkAccardion from "../SeriesLinkAccardion/SeriesLinkAccardion";
import { authContext } from "../../../contextApi";
import { useContext } from "react";

function LinkAccardion({ isShowAccardion, accardionShowHand, links, isSub ,flagName,title,isSeries}) {

  const AuthContext=useContext(authContext)

  return (
    <>
    <div className={`download-links ${isSeries?'series':''}`}>
      <div className={`download-links-header ${isSeries?'series':''}`} onClick={accardionShowHand}>
        <div className="download-links-header-content">
          {
            isSeries ?
            <div className="downoad-links-header-flag-series">
              فصل {EnToFaNums(flagName)}
            </div>
            :
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
          }
          <div className="download-links-header-title">
            {isSeries? title : isSub ? "نسخه زیرنویس فارسی" : "نسخه دوبله فارسی (دوزبانه)"}
          </div>
        </div>
        <div
          className={`download-links-header-icon ${
            isShowAccardion ? "download-links-header-icon-active" : ""
          }`}
        >
          <IoIosArrowDown />
        </div>
      </div>
      <div
        className={`download-links-content ${
          isShowAccardion ? "download-links-content-active" : ""
        }`}
      >
        {links.map((link,index) => (
          !isSeries ?
          <div className="download-link-box" key={index}>
    
            <div className="download-link-box-right">
              {
                AuthContext.userInfos.hasLicense?
                              <Link to={""}>

                <div className={`download-link-box-premium-btn`}>
                  <span className="download-link-box-premium-span">
                     دانلود مستقیم
                  </span>
                </div>
              </Link>
                :
              <Link to={"/buy-license"}>
                <div className={`download-link-box-premium-btn`}>
                  <RiVipCrown2Fill className="download-link-box-premium-icon" />
                  <span className="download-link-box-premium-span">
                    خرید اشتراک
                  </span>
                </div>
              </Link>
              }
              {link.is10Bit && (
                <div className="download-link-box-ps">
                  <div className="download-link-box-ps-icon">
                    <IoMdInformationCircleOutline />
                  </div>
                  <div className="download-link-box-ps-text">
                    نسخه های 10bit دارای عمق رنگ بیشتر و وضوح بهتری میباشند.
                  </div>
                </div>
              )}
            </div>
            <div className="download-link-box-left">
              <div className="download-links-box-quality">
                <span className="download-links-box-quality-name">
                  {link.name}
                </span>
              {isSub &&
                <span className="download-links-box-quality-sub">
                 SoftSub
                </span>
                 }
              </div>
              <div className="download-links-box-info">
                <span className="download-links-box-quality-size">
                  حجم:
                  {link.size}
                </span>
                <span className="download-links-box-quality-encoder">
                  Encoder:
                  {link.encoder}
                </span>
              </div>
            </div>
          </div>
          :
          <>
          <SeriesLinkAccardion {...link}/>
          </>
        ))}
      </div>
    </div>
    </>
  );
}

export default WithIsShow(LinkAccardion);


