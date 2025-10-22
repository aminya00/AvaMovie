import "./MoviesListRow.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import { Link } from "react-router-dom";
import { Grid } from "swiper/modules";
import { FreeMode } from "swiper/modules";
import "swiper/css/free-mode";
import MoviesListRowBox from "./MoviesListRowBox/MoviesListRowBox";

function MoviesListRow({ listArr, gridRowCount }) {  
  
  let gridRowHeight = null;
  gridRowCount != 1
    ? (gridRowHeight = 352 * gridRowCount + 20)
    : (gridRowHeight = 352);

  return (
    <Swiper
      className="mySwiper2"
      spaceBetween={20}
      grid={{
        rows: gridRowCount,
      }}
      freeMode={true}
      onSwiper={(swiper) => {}}
      // style={{ height: `${gridRowHeight}px` }}
      breakpoints={{
        0: {
          slidesPerView: "auto",
          grid: {
            rows: 1,
          },
        },
        1047: {
          slidesPerView: 5,
          grid: {
            rows: gridRowCount,
          },
        },
      }}
      modules={[FreeMode, Grid]}
    >
      {listArr.map((list) => (
        <SwiperSlide key={list.id}>
          <Link
            to={`/list/${list.urlName}/1`}
          >
            <MoviesListRowBox {...list} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export default MoviesListRow;
