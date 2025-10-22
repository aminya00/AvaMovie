import HeaderIcon from "../HeaderIcon/HeaderIcon";
import { Link } from "react-router-dom";
import { RiVipCrown2Fill } from "react-icons/ri";
import "./NavBar.css";
import { memo, useEffect, useState,lazy,Suspense } from "react";
import { authContext } from "../../../contextApi";
import { useContext } from "react";
// import Menu from "../menu/Menu";
const Menu = lazy(() => import("../menu/Menu"));
// import HeaderBtn from "../headerBtn/HeaderBtn";
const HeaderBtn = lazy(() => import("../headerBtn/HeaderBtn"));
// import NotificationBtnComp from "../NotificationBtnComp/NotificationBtnComp";
const NotificationBtnComp = lazy(() => import("../NotificationBtnComp/NotificationBtnComp"));
// import AccountBtnComp from "../AccountBtnComp/AccountBtnComp";
const AccountBtnComp = lazy(() => import("../AccountBtnComp/AccountBtnComp"));
// import SearchBox from "../SearchBox/SearchBox";
const SearchBox = lazy(() => import("../SearchBox/SearchBox"));


const NavBar = memo(() => {
  
  const [isTopOfPage, setIsTopOfPage] = useState(window.scrollY?false:true);
  const [isOpenSearch, setOpenSearch] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const AuthContext = useContext(authContext);

  function openCloseSearch() {
    setOpenSearch((prev) => !prev);
  }
  const notificationFetch=async(objectId)=>{
    await fetch(`https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/6FC78056-1993-4ACC-9010-38680BAD8042/data/avaUsers?pageSize=100&where=objectId%3D'${objectId}'&loadRelations=licenseType`)
    .then(res=>res.json())
    .then(user=>{
      setUserInfo(user[0])})
  }
  const scrollEventHandler=()=>{
    !window.scrollY ? setIsTopOfPage(true) : setIsTopOfPage(false)
  }

  useEffect(()=>{
    window.removeEventListener("scroll",scrollEventHandler)
    window.addEventListener("scroll",scrollEventHandler)
    AuthContext.isLoggedIn&&
    notificationFetch(AuthContext.userInfos.objectId)
  },[AuthContext.userInfos.objectId])

  return (

    <div className={`nav-bar-Container ${isTopOfPage ? 'nav-bar-Container-without-background' :''}`}>
      <div className={`nav-bar-right ${isOpenSearch?"disappeared":''}`}>
      <Link to={"/"}>
        <HeaderIcon />
        <img className={'nav-bar-mini-logo'} src="/assets/icon/logo-min.png" alt="" />
      </Link>
      <Suspense>
        <Menu />
      </Suspense>
      </div>
      <div className={`nav-bar-left ${isOpenSearch?"disappeared":''}`}>      <Suspense>
        <SearchBox isOpenSearch={isOpenSearch} openCloseSearch={openCloseSearch} setOpenSearch={setOpenSearch}/>      </Suspense>
        
        {!AuthContext.userInfos.hasLicense && (
          <Link to={'/buy-license'} className={isOpenSearch?"disappeared":''}>      <Suspense>

            <HeaderBtn
              addClassBtn={"nav-premium-btn"}
              btnValue={
                <>
                  <RiVipCrown2Fill className="nav-premium-icon" />
                  <span className="nav-premium-span">خرید اشتراک</span>
                </>
              }
            />      </Suspense>

          </Link>
        )}
        {AuthContext.isLoggedIn ? (
          <>
          {
            userInfo?      <Suspense>
            <NotificationBtnComp {...{userInfo}} isOpenSearch={isOpenSearch}/>      </Suspense>
            :null
          }      <Suspense>
          <AccountBtnComp userInfo={AuthContext.userInfos}/>      </Suspense>
          </>
        ) : (
          <>
            <Link className="header-login-btn" to={"/login"}>
              <HeaderBtn
                addClassBtn={"header-login-btn-style"}
                btnValue={"ورود"}
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
});
export default NavBar;
