import React from "react";
import { Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperCard from "../card/SwiperCard";
export default ({ anime, type }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={30}
      slidesPerView={3.5}
      pagination
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
    >
      {anime?.map((item, index) => {
        return (
          <SwiperSlide key={index + "swiperHome"}>
            <SwiperCard item={item} type={type} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
