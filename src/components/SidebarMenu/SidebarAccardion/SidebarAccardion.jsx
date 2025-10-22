import "./SidebarAccardion.css";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import WithIsShow from "../../HOC/WithIsShow";
import SidebarInnerAccardion from "../SidebarInnerAccardion/SidebarInnerAccardion";
import { LuFilm } from "react-icons/lu";
import { TiDocumentText } from "react-icons/ti";
import { BiCameraMovie } from "react-icons/bi";
import { allGenres, allParts } from "../../header/menu/Menu";
import { useContext } from "react";
import { moviesCountContext } from "../../../contextApi";
import { EnToFaNums } from "../../../ulits";

function SidebarAccardion({ isShowAccardion, accardionShowHand }) {

      const MoviesCountContext=useContext(moviesCountContext)
      
    
  return (
    <div>
      <div
        className={`sidebar-menu-item ${isShowAccardion ? "active" : ""}`}
        onClick={accardionShowHand}
      >
        <div className="sidebar-menu-item-title">
          <HiOutlineSquares2X2 />
          ‌دسته‌بندی‌ها
        </div>
        <IoIosArrowDown
          className={`sidebar-menu-item-icon ${
            isShowAccardion ? "active" : ""
          }`}
        />
      </div>
      <div
        className={`sidebar-menu-item-body ${isShowAccardion ? "active" : ""}`}
      >
     
        <SidebarInnerAccardion
          {...{ title: "بخش‌ها", icon: <TiDocumentText /> }}
        >
          {allParts.map((item) => (
            <a key={item.id} href={item.link}>
                <span>{item.title}</span>
                {
                          item.id=='movies'?
                          <span className="menu-content-body-item-desc">({EnToFaNums(MoviesCountContext.seriesCount.toLocaleString())})</span>
                          :item.id=='series'?
                          <span className="menu-content-body-item-desc">({EnToFaNums(MoviesCountContext.moviesCount.toLocaleString())})</span>
                          :null
                          }
            </a>
          ))}
        </SidebarInnerAccardion>
        <SidebarInnerAccardion
          {...{ title: "ژانر فیلم", icon: <BiCameraMovie /> }}
        >
            {
                 allGenres.map((item)=>(
                                <a key={item.id} href={`/genres/${item.id}/1/?category=فیلم`}>
                          <span>{item.title}</span>
                                </a>
                              ))
            }
        </SidebarInnerAccardion>
        <SidebarInnerAccardion
          {...{ title: "ژانر سریال", icon: <LuFilm /> }}
        >
            {
                allGenres.map((item,index)=>(
                    <a className={`${index+1==allGenres.length?'last-item':''}`} key={item.id} href={`/genres/${item.id}/1/?category=سریال`}>
              <span>{item.title}</span>
                    </a>
                  ))
            }
        </SidebarInnerAccardion>
        
      </div>
    </div>
  );
}
export default WithIsShow(SidebarAccardion);
