import "./UserPanelPage.css";
import { FaCaretLeft } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { memo, useEffect, useState } from "react";
import { authContext } from "../../contextApi";
import { useContext } from "react";
import NotificationBtnComp from "../header/NotificationBtnComp/NotificationBtnComp";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaRegBookmark } from "react-icons/fa";
import { RiVipCrown2Line } from "react-icons/ri";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MobileFooter from "../footer/mobileFooter/MobileFooter";

const UserPanelPage = () => {
  const [userInfo, setUserInfo] = useState();
  const AuthContext = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();

  const notificationFetch = async (objectId) => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/avaUsers?pageSize=100&where=objectId%3D'${objectId}'&loadRelations=licenseType`
    )
      .then((res) => res.json())
      .then((user) => {
        setUserInfo(user[0]);
      });
  };

  const logOutHandler = () => {
    AuthContext.logout();
    navigate("/login");
  };

  useEffect(() => {
    AuthContext.isLoggedIn && notificationFetch(AuthContext.userInfos.objectId);
  }, [AuthContext.userInfos.objectId]);

  return (
    <>
      {AuthContext.isLoggedIn ? (
        <>
          <div className="user-panel-page-header">
            <div
              className="user-panel-logo"
              title="user-panel-page-header-title"
            >
              <a href="/">
                <img src="/assets/icon/logo-x3.png" alt="" />
              </a>
            </div>
            <div className="user-panel-nav">
              <div className="user-panel-breadcrumb">
                <Link to="/">صفحه اصلی</Link>
                <FaCaretLeft />
                {[
                  { id: "dashboard", title: "داشبورد" },
                  { id: "buy-license", title: "خرید اشتراک" },
                  { id: "watchlist", title: "لیست تماشا" },
                ].map(
                  (item) =>
                    location.pathname.split("/")[2] == item.id && (
                      <span className="active-breadcrumb-item" key={item.id}>
                        {item.title}
                      </span>
                    )
                )}
              </div>
              <div className="user-panel-header-btn-contaienr">
                {userInfo ? <NotificationBtnComp {...{ userInfo }} /> : null}
                <div className="user-panel-logout-btn" onClick={logOutHandler}>
                  <AiOutlineLogout />
                  <span>خروج از حساب</span>
                </div>
              </div>
            </div>
          </div>
          <div className="user-panel-page-body">
            <div className="user-panel-page-meun">
              <NavLink to={"/panel/dashboard"} className="panel-page-meun-item">
                <HiOutlineSquares2X2 />
                داشبورد
              </NavLink>
              <NavLink
                to={"/panel/buy-license"}
                className="panel-page-meun-item"
              >
                <RiVipCrown2Line />
                خرید اشتراک
              </NavLink>
              <NavLink
                to={"/panel/watchlist/1"}
                className="panel-page-meun-item"
              >
                <FaRegBookmark />
                لیست تماشا
              </NavLink>
            </div>
            <Outlet />
          </div>
        </>
      ) : (
        <NotFoundPage />
      )
    }
    <MobileFooter/>
    </>
  );
};

export default UserPanelPage;
