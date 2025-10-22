import "./NotificationPage.css";
import NavBar from "../header/navBar/NavBar";
import MainFooter from "../footer/mainFooter/MainFooter";
import MobileFooter from "../footer/mobileFooter/MobileFooter";
import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { authContext } from "../../contextApi";
import { useContext } from "react";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import NotFoundItem from "../NotFoundItem/NotFoundItem";

const NotificationPage = () => {
  const AuthContext = useContext(authContext);

  const updateNotificationFetch = async (objectId) => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/avaUsers?pageSize=100&where=objectId%3D'${objectId}'&loadRelations=licenseType`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notificationRead: AuthContext.userInfos.notifications.length,
          objectId,
        }),
      }
    ).then((res) => console.log(res));
  };
  useEffect(() => {
    AuthContext.userInfos.objectId &&
      AuthContext.userInfos.notifications &&
      AuthContext.userInfos.notifications.length !=
        AuthContext.userInfos.notificationRead &&
      updateNotificationFetch(AuthContext.userInfos.objectId);
  }, [AuthContext.userInfos.objectId]);
  return (
    <>
      {AuthContext.isLoggedIn ? (
        <>
          {AuthContext.userInfos.objectId && (
            <>
              <NavBar />
              <div className="notification-page-cont wide-screen">
                <div className="notification-page-header">
                  <h1 className="notification-page-header-title">اعلانات</h1>
                </div>
                {AuthContext.userInfos.notifications ? (
                  <div className="notification-page-body">
                    {AuthContext.userInfos.notifications.map((notification) => (
                      <div
                        className="notification-page-box"
                        key={notification.id}
                      >
                        <div className="notification-page-box-header">
                          <div className="notification-page-box-header-title">
                            <IoMdNotificationsOutline />
                            {notification.title}
                          </div>
                          <span> {notification.date}</span>
                        </div>
                        <div className="header-notification-message-text">
                          {notification.text}
                        </div>
                      </div>
                    ))}
                    
                  </div>
                ) : (
                  <NotFoundItem />
                )}
              </div>
              <MainFooter />
              <MobileFooter />
            </>
          )}
        </>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};
export default NotificationPage;
