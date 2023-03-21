import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/scss";
import SwiperMovieCard from "./SwiperMovieCard";
import "swiper/scss/navigation";
import "./style.scss";
export default () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={5}
      pagination={{ clickable: true }}
      className="swiper_movie"
    >
      <SwiperSlide>
        <SwiperMovieCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperMovieCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperMovieCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperMovieCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperMovieCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperMovieCard />
      </SwiperSlide>
    </Swiper>
  );
};
