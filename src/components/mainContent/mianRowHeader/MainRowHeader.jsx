import "./MainRowHeader.css";
import { Link } from "react-router-dom";

function MianRowHeader({
  headerTitle,
  headerIcon,
  headerBtnTitle,
  headerBtnLink,
}) {
  return (
    <div className="main-row-header">
      <div className="main-row-title">
        {headerIcon}
        <span>{headerTitle}</span>
      </div>
      {headerBtnTitle && (
        <>
        <Link to={headerBtnLink} className="main-row-btn-computer-form">
          <div className="main-row-btn">{headerBtnTitle}</div>
        </Link>
        <Link to={headerBtnLink} className="main-row-btn-mobile-form">
          <div className="main-row-btn mobile-form">بیشتر</div>
        </Link>
        </>
      )}
    </div>
  );
}
export default MianRowHeader;
