import "./HeroSwiper.css";
import HeroSwiperBox from "./heroSwiperBox/HeroSwiperBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";

function HeroSwiper({ movieArr, onHeroBg }) {
  return (
    <>
    <Swiper
      init={false}
      className="heroSwiper vartical-swiper"
      loop={true}
      centeredSlides={true}
      direction="vertical"
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      slidesPerView={5}
      spaceBetween={10}
      onSlideChange={(swiper) => {
        onHeroBg(swiper.realIndex);
      }}
      onClick={(swiper) => {
     if(swiper.clickedIndex != swiper.activeIndex){
          if ( swiper.clickedIndex > swiper.activeIndex) {
            swiper.slideNext();
          } else {
            swiper.slidePrev();
          }
        }
      }}
      modules={[Autoplay]}
      style={{ width: 190, height: "100%" }}
    >
      {[...movieArr].slice(0, 10).map((movie) => (
        <SwiperSlide onClick={(event) => {}} id={movie.id} key={movie.id}>
          <HeroSwiperBox {...movie} />
        </SwiperSlide>
      ))}
    </Swiper>
    <Swiper
      init={false}
      className="heroSwiper horizental-swiper"
      loop={true}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      slidesPerView={2}
      spaceBetween={10}
      breakpoints={{
        400:{
          slidesPerView:2.5
        },
        500:{
          slidesPerView:3
        },
        700:{
          slidesPerView:4
        }
      }}
      onSlideChange={(swiper) => {
        onHeroBg(swiper.realIndex);
      }}
      onClick={(swiper) => {
        if(swiper.clickedIndex != swiper.activeIndex){
          if ( swiper.clickedIndex > swiper.activeIndex) {
            swiper.slideNext();
          } else {
            swiper.slidePrev();
          }
        }
      }}
      modules={[Autoplay]}
      style={{ width: '100%', height: "100%" ,display:"none"}}
    >
      {[...movieArr].slice(0, 10).map((movie) => (
        <SwiperSlide onClick={(event) => {}} id={movie.id} key={movie.id}>
          <HeroSwiperBox {...movie} />
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
}

export default HeroSwiper;
