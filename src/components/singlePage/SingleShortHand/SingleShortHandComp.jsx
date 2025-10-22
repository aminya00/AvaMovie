import { useEffect, useState } from "react";
import "./SingleShortHandComp.css";

function SingleShortHandComp({ shortHand, shortHandHandler ,commentsCount}) {


  return (
    <li
      className={`single-shorthand-menu-li ${
        shortHand.isActive ? "single-shorthand-li-active" : ""
      }`}
      onClick={() => shortHandHandler(shortHand.id, shortHand.refElement)}
    >
      <div
        className={`single-shorthand-menu-icon ${
          shortHand.isActive ? "single-shorthand-icon-active" : ""
        }`}
      >
        {shortHand.icon}
        {Boolean(commentsCount) && shortHand.id=="comments" ? (
          <div className="single-shorthand-comment-count-icon">
            {commentsCount}
          </div>
        ) : null}
      </div>
      <div className="single-shorthand-menu-title">{shortHand.name}</div>
    </li>
  );
}
export default SingleShortHandComp;
