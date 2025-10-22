import "./GridRowContent.css";
import { lazy,Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import { Link } from "react-router-dom";
import { Grid } from "swiper/modules";
import { FreeMode } from "swiper/modules";
import "swiper/css/free-mode";
// import GridRowBox from "./gridRowBox/GridRowBox";
const GridRowBox = lazy(() => import("./gridRowBox/GridRowBox"));

function GridRowContent({ movieArr, gridRowCount }) {
  let gridRowHeight = null;
  gridRowCount != 1
    ? (gridRowHeight = 309 * gridRowCount + 20)
    : (gridRowHeight = 309);

  return (
    <Swiper
      className="mySwiper"
      spaceBetween={20}
      grid={{
        rows: gridRowCount,
      }}
      freeMode={true}
      onSwiper={(swiper) => {}}
      style={{ height: `${gridRowHeight}px` }}
      breakpoints={{
        0: {
          slidesPerView: "auto",
          grid: {
            rows: 1,
          },
        },
        1047: {
          slidesPerView: 4,
          grid: {
            rows: gridRowCount,
          },
        },
      }}
      modules={[FreeMode, Grid]}
    >
      {movieArr.map((movie) => (
        <SwiperSlide key={movie.id}>
          <Link
            to={`/${movie.isSeries ? "series" : "movies"}/${
              movie.nameUrl
            }`}
          >
          <Suspense>
             <GridRowBox {...movie} />
            </Suspense> 
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export default GridRowContent;
