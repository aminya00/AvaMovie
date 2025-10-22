import "./BoxAccardion.css";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import WithIsShow from "../../HOC/WithIsShow";

function BoxAccardion({ icon,children ,title,isShowAccardion,accardionShowHand}) {
  return (
    <div className="single-responsive-box wide-screen">
      <div className={`single-body-box-accardion deactive`} onClick={accardionShowHand}>
        <div className="single-body-box-accardion-title">
          {icon}
          <span className="single-body-box-accardion-text">
            {title}
          </span>
        </div>
        <div
          className={`single-body-box-accardion-btn ${
            isShowAccardion ? "active" : ""
          }`}
        >
          <IoIosArrowDown />
          <IoIosArrowDown />
        </div>
      </div>
      <div className={`${!isShowAccardion ? 'single-responsive-box-body': ''}`}>
      {children}
      </div>
    </div>
  );
}

export default WithIsShow(BoxAccardion);
