import "./MotwRowContent.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import MotwBox from "./MoteBox/MotwBox";
import { Link } from "react-router-dom";

function MotwRowContent({ movieArr }) {
  return (
    <Swiper
      slidesPerView={8}
      spaceBetween={15}
      onSwiper={(swiper) => {}}
      style={{ height: 227 }}
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        400: {
          slidesPerView: 3,
        },
        650: {
          slidesPerView: 4,
        },
        810: {
          slidesPerView: 5,
        },
        950: {
          slidesPerView: 6,
        },
        1050: {
          slidesPerView: 7,
        },
        1200: {
          slidesPerView: 8,
        },
      }}
    >
      {movieArr.map((movie) => (
        <SwiperSlide key={movie.id}>
          <Link
            to={`/${movie.isSeries ? "series" : "movies"}/${
              movie.nameUrl
            }`}
          >
            <MotwBox {...movie} />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export default MotwRowContent;
