import "./MoviesRowContent.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import { Link } from "react-router-dom";
import { Grid } from "swiper/modules";
import { FreeMode } from "swiper/modules";
import "swiper/css/free-mode";
import MoviesRowBox from "./MoviesRowBox/MoviesRowBox";

function MoviesRowContent({ movieArr, gridRowCount }) {  
  
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
      style={{ height: `${gridRowHeight}px` }}
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
      {movieArr.map((movie) => (
        <SwiperSlide key={movie.id}>
          <Link
            to={`/${movie.isSeries ? "series" : "movies"}/${
              movie.nameUrl
            }`}
          >
            <MoviesRowBox {...movie} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export default MoviesRowContent;
