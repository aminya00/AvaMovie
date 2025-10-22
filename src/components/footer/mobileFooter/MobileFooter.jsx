import "./MobileFooter.css";
import { useContext, lazy, Suspense } from "react";
// import MobileFooterMenu from "./mobileFooterMenu/MobileFooterMenu";
const MobileFooterMenu = lazy(() =>
  import("./mobileFooterMenu/MobileFooterMenu")
);
import { RiHome5Line, RiHome5Fill } from "react-icons/ri";
import { HiOutlineSquares2X2, HiSquares2X2 } from "react-icons/hi2";
import { AiFillPlaySquare } from "react-icons/ai";
import { LuSquarePlay } from "react-icons/lu";
import { TbUserSquareRounded } from "react-icons/tb";
import { Link } from "react-router-dom";
import { memo, useReducer, useState } from "react";
// import SidebarMenu from "../../SidebarMenu/SidebarMenu";
const SidebarMenu = lazy(() => import("../../SidebarMenu/SidebarMenu"));
import { authContext } from "../../../contextApi";

const mobileFooterReduceHand = (state, action) => {
  switch (action.title) {
    case "homeIcon":
      return action.isHover
        ? { ...state, homeIcon: action.hoverData }
        : { ...state, homeIcon: action.mainData };
    case "menuIcon":
      return action.isHover
        ? { ...state, menuIcon: action.hoverData }
        : { ...state, menuIcon: action.mainData };
    case "playIcon":
      return action.isHover
        ? { ...state, playIcon: action.hoverData }
        : { ...state, playIcon: action.mainData };
    case "userIcon":
      return action.isHover
        ? { ...state, userIcon: action.hoverData }
        : { ...state, userIcon: action.mainData };
  }
};

const MobileFooter = memo(() => {
  const AuthContext = useContext(authContext);

  const [mobileFooterIcon, dispatch] = useReducer(mobileFooterReduceHand, {
    homeIcon: <RiHome5Line />,
    menuIcon: <HiOutlineSquares2X2 />,
    playIcon: <LuSquarePlay />,
    userIcon: <TbUserSquareRounded />,
  });
  const [isShowSideMenu, setIsShowSideMenu] = useState(false);

  return (
    <>
      <div className="mobile-footer-backup">
        <div className="mobile-footer-cont">
          <Link to={"/"}>
            <Suspense>
              <MobileFooterMenu
                icon={mobileFooterIcon.homeIcon}
                dispatchFunc={dispatch}
                dispatchData={{
                  title: "homeIcon",
                  hoverData: <RiHome5Fill />,
                  mainData: <RiHome5Line />,
                }}
                title={"خانه"}
              />
            </Suspense>
          </Link>
          <div
            className="mobile-footer-item"
            onClick={() => !isShowSideMenu && setIsShowSideMenu(true)}
          >
            <MobileFooterMenu
              icon={mobileFooterIcon.menuIcon}
              dispatchFunc={dispatch}
              dispatchData={{
                title: "menuIcon",
                hoverData: <HiSquares2X2 />,
                mainData: <HiOutlineSquares2X2 />,
              }}
              title={"منو"}
            />
          </div>
          <Link to={"/"}>
            <MobileFooterMenu
              icon={mobileFooterIcon.playIcon}
              dispatchFunc={dispatch}
              dispatchData={{
                title: "playIcon",
                hoverData: <AiFillPlaySquare />,
                mainData: <LuSquarePlay />,
              }}
              title={"پخش آنلاین"}
            />
          </Link>
          <Link to={AuthContext.isLoggedIn ? "/panel/dashboard" : "/login"}>
            <MobileFooterMenu
              icon={mobileFooterIcon.userIcon}
              dispatchFunc={dispatch}
              dispatchData={{
                title: "userIcon",
                hoverData: <TbUserSquareRounded />,
                mainData: <TbUserSquareRounded />,
              }}
              title={AuthContext.isLoggedIn ? "داشبورد" : "ورود به حساب"}
            />
          </Link>
        </div>
      </div>{" "}
      <Suspense>
        <SidebarMenu
          setIsShowSideMenu={setIsShowSideMenu}
          isShowSideMenu={isShowSideMenu}
        />{" "}
      </Suspense>
    </>
  );
});

export default MobileFooter;
