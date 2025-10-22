import { Link } from "react-router-dom";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import "./Menu.css";
import { LuFilm } from "react-icons/lu";
import { TiDocumentText } from "react-icons/ti";
import { BiCameraMovie } from "react-icons/bi";
import { useEffect, useState } from "react";
import { EnToFaNums } from "../../../ulits";
import { useContext } from "react";
import { moviesCountContext } from "../../../contextApi";

const allGenres = [
  {
    id: "استندآپ کمدی",
    title: "استندآپ کمدی",
  },
  {
    id: "اکشن",
    title: "اکشن",
  },
  {
    id: "انیمیشن",
    title: "انیمیشن",
  },
  {
    id: "بیوگرافی",
    title: "بیوگرافی",
  },
  {
    id: "پزشکی",
    title: "پزشکی",
  },
  {
    id: "تئاتر",
    title: "تئاتر",
  },
  {
    id: "تاریخی",
    title: "تاریخی",
  },
  {
    id: "تاک شو",
    title: "تاک شو",
  },
  {
    id: "ترسناک",
    title: "ترسناک",
  },
  {
    id: "جنایی",
    title: "جنایی",
  },
  {
    id: "جنگی",
    title: "جنگی",
  },
  {
    id: "خانوادگی",
    title: "خانوادگی",
  },
  {
    id: "خبری",
    title: "خبری",
  },
  {
    id: "درام",
    title: "درام",
  },
  {
    id: "رئالیتی‌تی‌وی",
    title: "رئالیتی‌تی‌وی",
  },
  {
    id: "رئالیتی‌شو",
    title: "رئالیتی‌شو",
  },
  {
    id: "رازآلود",
    title: "رازآلود",
  },
  {
    id: "عاشقانه",
    title: "عاشقانه",
  },
  {
    id: "علمی‌و‌تخیلی",
    title: "علمی‌و‌تخیلی",
  },
  {
    id: "فانتزی",
    title: "فانتزی",
  },
  {
    id: "کمدی",
    title: "کمدی",
  },
  {
    id: "کوتاه",
    title: "کوتاه",
  },
  {
    id: "ماجراجویی",
    title: "ماجراجویی",
  },
  {
    id: "مراسم تلویزیونی",
    title: "مراسم تلویزیونی",
  },
  {
    id: "مسابقه‌تلویزیونی",
    title: "مسابقه‌تلویزیونی",
  },
  {
    id: "مستند",
    title: "مستند",
  },
  {
    id: "معمایی",
    title: "معمایی",
  },
  {
    id: "موزیک",
    title: "موزیک",
  },
  {
    id: "موزیکال",
    title: "موزیکال",
  },
  {
    id: "نوآر",
    title: "نوآر",
  },
  {
    id: "هیجان انگیز",
    title: "هیجان انگیز",
  },
  {
    id: "ورزشی",
    title: "ورزشی",
  },
  {
    id: "وسترن",
    title: "وسترن",
  },
];
const allParts = [
  {
    id: "movies",
    link: "/movies/page/1",
    title: "فیلم‌ها",
  },
  {
    id: "series",
    link: "/series/page/1",
    title: "سریال‌ها",
  },
  {
    id: "movie-dub",
    link: "/movie-dub/1",
    title: "فیلم‌های دوبله",
  },
  {
    id: "series-dub",
    link: "/series-dub/1",
    title: "سریال‌های دوبله",
  },
  {
    id: "250movies",
    link: "/250movies/1",
    title: "250 فیلم برتر",
  },
  {
    id: "250series",
    link: "/250series/1",
    title: "250 سریال برتر",
  },
  {
    id: "boxoffice",
    link: "/boxoffice",
    title: "باکس‌آفیس",
  },
  {
    id: "collection",
    link: "/collection/1",
    title: "کالکشن",
  },
  {
    id: "korean-series",
    link: "/korean-series/1",
    title: "سریال کره‌ای",
  },
  {
    id: "list",
    link: "/list/1",
    title: "لیست کاربران",
  },
  {
    id: "series-current",
    link: "/series-current/1",
    title: "سریال در حال پخش",
  },
  {
    id: "series-renewed",
    link: "/series-renewed/1",
    title: "سریال تمدید شده",
  },
  {
    id: "series-cancelled",
    link: "/series-cancelled/1",
    title: "سریال کنسل شده",
  },
  {
    id: "series-end",
    link: "/series-end/1",
    title: "سریال به پایان رسیده",
  },
  {
    id: "suggested",
    link: "/suggested/1",
    title: "پیشنهادی",
  },
];

function Menu() {
  const MoviesCountContext = useContext(moviesCountContext);
  const [activeMenu, setActiveMenu] = useState("parts");
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [menuContent, setMenuContent] = useState([
    {
      id: "parts",
      title: "بخش ها",
      icon: <TiDocumentText />,
      items: allParts,
    },
    {
      id: "movie-genres",
      title: "فیلم ها",
      icon: <BiCameraMovie />,
      items: allGenres,
    },
    {
      id: "series-genres",
      title: "سریال ها",
      icon: <LuFilm />,
      items: allGenres,
    },
  ]);

  const menuContentHandler = (title) => {
    setActiveMenu(title);
  };
  

  return (
    <div className="menu-container">
      <ul className="menu-ul">
        <li
          onMouseEnter={() => setIsShowMenu(true)}
          onMouseLeave={() => setIsShowMenu(false)}
        >
          <HiOutlineSquares2X2 className="menu-icon" />
          <span>دسته‌بندی‌ها</span>
        </li>
        <li>
          <Link to={"/people/1"}>هنرمندان</Link>
        </li>
        <li>
          <Link to={"/"}>تماشای آنلاین</Link>
        </li>
      </ul>
      {Boolean(MoviesCountContext.seriesCount) && Boolean(MoviesCountContext.moviesCount) && (
        <div
          className={`menu-content-container ${isShowMenu ? "active" : ""}`}
          onMouseEnter={() => setIsShowMenu(true)}
          onMouseLeave={() => setIsShowMenu(false)}
        >
          <div className="menu-content-header">
            {menuContent.map((menu) => (
              <div
                key={menu.id}
                className={`menu-content-header-item ${
                  activeMenu == menu.id ? "active" : ""
                }`}
                onMouseEnter={() => {
                  menuContentHandler(menu.id);
                }}
              >
                {menu.icon}
                <span>{menu.title}</span>
              </div>
            ))}


          </div>
          <div
            className={`menu-content-body ${
              activeMenu != "parts" ? "fix-border" : ""
            }`}
          >
            {menuContent.map((menu) =>
              menu.id == activeMenu
                ? menu.items.map((item) => (
                    <a
                      href={`${
                        menu.id == "movie-genres"
                          ? `/genres/${item.id}/1/?category=فیلم`
                          : menu.id == "series-genres"
                          ? `/genres/${item.id}/1/?category=سریال`
                          :item.link
                      }`}
                    key={item.id}
                    >
                      <div className="menu-content-body-item">
                        <span>{item.title}</span>
                        {item.id == "movies" ? (
                          <span className="menu-content-body-item-desc">
                            (
                            {EnToFaNums(
                              MoviesCountContext.moviesCount.toLocaleString()
                            )}
                            )
                          </span>
                        ) : item.id == "series" ? (
                          <span className="menu-content-body-item-desc">
                            (
                            {EnToFaNums(
                              MoviesCountContext.seriesCount.toLocaleString()
                            )}
                            )
                          </span>
                        ) : null}
                      </div>
                    </a>
                  ))
                : null
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}
export default Menu;
export { allGenres, allParts };
