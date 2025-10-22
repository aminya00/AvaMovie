import './AccountBtnComp.css'
import { VscTriangleUp } from "react-icons/vsc";
import { EnToFaNums } from "../../../ulits";
import { useState,useContext, memo } from "react";
import { LuSquareUserRound } from "react-icons/lu";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdOutlineBookmarks } from "react-icons/md";
import { authContext } from '../../../contextApi';
import {  useNavigate } from 'react-router-dom';

const AccountBtnComp=memo(({userInfo})=>{
    const [isOpenAccount, setIsOpenAccount] = useState(false);
    const AuthContext=useContext(authContext)
    const navigate=useNavigate()

    const logOutHandler=()=>{
    AuthContext.logout()
    navigate('/login')
  }

    return(
        <div className={'header-account-btn-container'}>
            <div
              className={`header-btn-Container header-search-btn header-account-btn`}
              onMouseEnter={() => setIsOpenAccount(true)}
          onMouseLeave={() => setIsOpenAccount(false)}
            >
              <LuSquareUserRound className="nav-icon-size" />
            </div>
            <div 
            className={`header-account-btn-body ${
                isOpenAccount ? "isHovered" : ""
              }`}
              onMouseEnter={() => setIsOpenAccount(true)}
              onMouseLeave={() => setIsOpenAccount(false)}>
              <div className='header-account-btn-body-header'>
                 <div className='header-account-btn-body-title'>
                    <div className='header-account-btn-body-title-logo'>
                    {userInfo.nickName.slice(0,1).toUpperCase()}
                    </div>
                     <div className='header-account-btn-body-title-content'>
                        <span className='header-account-btn-body-user-name'>
                        {userInfo.nickName}
                        </span>
                        <span className={`header-account-btn-body-has-lisence ${userInfo.hasLicense?'vip':''}`}>
                            {
                                userInfo.hasLicense?
                                'اشتراک دارید'
                                :
                                "اشتراک ندارید"
                            }
                        </span>
                     </div>
                 </div>
                 
                 <a href='/panel/buy-license' className='header-account-lisence-btn'>
                 خرید اشتراک
                 </a>
                 
              </div>
              <div  className="header-account-btn-line">
              </div>
              <ul className='header-account-btn-body-ul'>
                <a href="/panel/dashboard">
                <li className='header-account-btn-body-li'>
                  <HiOutlineSquares2X2 />
                  داشبورد
                </li>
                </a>
                <a href="/panel/watchlist/1">
                <li className='header-account-btn-body-li'>
                  <MdOutlineBookmarks />
                  لیست تماشا
                </li>
                </a>
              </ul>
              <div className="header-logout-btn" onClick={logOutHandler}>
              خروج
              </div>
              <VscTriangleUp className="header-notification-body-svg" />
            </div>
          </div>
    )
}
)
export default AccountBtnComp