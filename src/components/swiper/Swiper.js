import React from "react";
import { Pagination, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperCard from "../card/SwiperCard";
export default () => {
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
      <SwiperSlide>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperCard />
      </SwiperSlide>{" "}
      <SwiperSlide>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperCard />
      </SwiperSlide>
      <SwiperSlide>
        <SwiperCard />
      </SwiperSlide>
    </Swiper>
  );
};
