import "./SidebarInnerAccardion.css";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import WithIsShow from "../../HOC/WithIsShow";
import { Link } from "react-router-dom";

function SidebarInnerAccardion({ isShowAccardion, accardionShowHand,children,icon,title}) {
  return (
        <div>
        <div className="sidebar-menu-item-accardion" onClick={accardionShowHand}>
          <div className="sidebar-menu-item-title">
            {icon}
            {title}
          </div>
          <IoIosArrowDown className={`sidebar-menu-item-icon ${isShowAccardion ? "active" : ""}`} />
        </div>
        <div className={`sidebar-menu-item-accardion-body ${isShowAccardion ? "active" : ""}`}>
        {children}   
        </div>
        </div>
      
  );
}
export default WithIsShow(SidebarInnerAccardion);
