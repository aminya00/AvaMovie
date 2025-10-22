import "./MainFooter.css";
import { memo, useState,lazy,Suspense } from "react";
// import FooterMenu from "./footerMenu/FooterMenu";
const FooterMenu = lazy(() => import("./footerMenu/FooterMenu"));
import { TbSquareRoundedChevronUp } from "react-icons/tb";
import { TbCloudDownload } from "react-icons/tb";
import { FaAngleLeft } from "react-icons/fa6";
import { LuTwitter } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { TbBrandTelegram } from "react-icons/tb";
import { Link } from "react-router-dom";

const MainFooter = memo(() => {

  return (
    <div className="main-footer-cont">
      <div className="main-footer">
        <div className="footer-right-side">
          <Suspense>
          <FooterMenu />
          </Suspense>
          <div className="copyright-cont">
            <div
              className="scroll-to-top"
              onClick={()=>{window.scrollTo({
                top:0,
                behavior: "smooth",
              })}}
            >
              <TbSquareRoundedChevronUp className="footer-scroll-icon" />
            </div>
            <div className="copyright-text">
              کلیه حقوق این سایت متعلق به آوامووی می‌باشد.
            </div>
          </div>
        </div>
        <div className="footer-left-side">
          <div className="main-footer-social">
            <a href="https://telegram.me/avamovie_in">
              <TbBrandTelegram className="footer-social-telegram" target="_blank"/>
            </a>
            <a href="https://instagram.com/avamovie_in" target="_blank">
              <FaInstagram className="footer-social-insta" />
            </a>
            <a href="https://twitter.com/avamovie_in" target="_blank">
              <LuTwitter className="footer-social-twitter" />
            </a>
          </div>

          <Link to={"/"}>
            <div className="main-footer-btn">
              <TbCloudDownload style={{ fontSize: 20 }} />
              <span>دانلود اپلیکیشن</span>
              <FaAngleLeft style={{ fontSize: 17 }} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default MainFooter;
