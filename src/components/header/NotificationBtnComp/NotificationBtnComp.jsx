import './NotificationBtnComp.css'
import { IoMdNotificationsOutline } from "react-icons/io";
import { VscTriangleUp } from "react-icons/vsc";
import { EnToFaNums } from "../../../ulits";
import { useState } from "react";

const NotificationBtnComp=({userInfo,isOpenSearch})=>{
  
    const [isOpenNotification, setOpenNotification] = useState(false);
    return(
        <div className={`header-notification-container ${isOpenSearch?"disappeared":''}`}>
        <div
          className={`header-btn-Container header-search-btn header-notification-btn`}
          onMouseEnter={() => setOpenNotification(true)}
          onMouseLeave={() => setOpenNotification(false)}
        >
          <IoMdNotificationsOutline className="nav-icon-size" />
          {
            (userInfo.notifications &&(userInfo.notifications.length-userInfo.notificationRead)) ?
          <div className="header-notification-count">
            {EnToFaNums(userInfo.notifications.length-userInfo.notificationRead)}
          </div>:null
          }
        </div>
        <div
          className={`header-notification-body ${
            isOpenNotification ? "isHovered" : ""
          }`}
          onMouseEnter={() => setOpenNotification(true)}
          onMouseLeave={() => setOpenNotification(false)}
        >
          {
            (userInfo.notifications &&(userInfo.notifications.length-userInfo.notificationRead))?
          <div className="header-notification-message-container">
            {
              [...userInfo.notifications].splice(userInfo.notificationRead).map((notification,index)=>(
                <>
            <div className="header-notification-message" key={notification.id}>
              <div className="header-notification-message-title">
                <IoMdNotificationsOutline />
                {notification.title}
              </div>
              <div className="header-notification-message-text">
                {notification.text}
              </div>
            </div>
            {
              (index+1!=[...userInfo.notifications].splice(userInfo.notificationRead).length)&&
              <div className="header-notification-message-line"></div>
            }
                </>
              
              ))
            }
          </div>
          :null
          }
          <a href="/notifications" className="header-notification-body-btn">
            مشاهده همه اعللانات
          </a>
          <VscTriangleUp className="header-notification-body-svg" />
        </div>
      </div>
    )
}

export default NotificationBtnComp