import './SidebarMenu.css'
import { IoClose } from "react-icons/io5";
import { TbCloudDownload } from "react-icons/tb";
import { FaAngleLeft } from "react-icons/fa6";
import SidebarAccardion from './SidebarAccardion/SidebarAccardion';
import { memo } from 'react';

const SidebarMenu=memo(({setIsShowSideMenu,isShowSideMenu})=>{

    const colseSidebarHandler=(id)=>{
        id==('sidebar-menu-bg-container')&&
        setIsShowSideMenu(false)
    }
    return(
        <div className={`sidebar-menu-bg-container ${isShowSideMenu?'active':''}`} id={'sidebar-menu-bg-container'} onClick={(e)=>colseSidebarHandler(e.target.id)
        }>
        <div className={`sidebar-menu-container ${isShowSideMenu?'sidebar-active':''}`}>
            <div className="sidebar-manu-top">
                <div className="sidebar-manu-header">
                    <IoClose onClick={()=>setIsShowSideMenu(false)}/>
                    <a href={'/'}>
                    <img src="/assets/icon/logo2-x1.png" alt="" />
                    </a>
                </div>
                <div className="sidebar-manu-body">
                    
                    <SidebarAccardion />
                    <a href={'/movies/page/1'}>
                    <div className="sidebar-menu-item">فیلم‌ها</div>
                    </a>
                    <a href={'/series/page/1'}>
                    <div className="sidebar-menu-item">سریال‌ها</div>
                    </a>
                    <a href={'/people/1'}>
                    <div className="sidebar-menu-item">هنرمندان</div>
                    </a>
                </div>
            </div>
            <div className="sidebar-manu-down">
                <a href={"/"}>
          <div className="sidebar-menu-app-btn">
            <TbCloudDownload style={{ fontSize: 20 }} />
            <span>دانلود اپلیکیشن</span>
            <FaAngleLeft style={{ fontSize: 17 }} />
          </div>
        </a>
            </div>
        </div>
        </div>
    )
})

export default SidebarMenu