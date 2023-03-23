import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/scss";
import SwiperMovieCard from "./SwiperMovieCard";
import "swiper/scss/navigation";
import "./style.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
export default ({ movie }) => {
  const swiper = useSwiper();
  const { slug } = useParams();
  useEffect(() => {
    if (movie.length > 0) {
      const index = movie?.findIndex((item) => item?.id == slug);
      swiper?.slideTo(index);
    }
  }, [slug, movie]);
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={5}
      pagination={{ clickable: true }}
      className="swiper_movie"
    >
      {movie?.map((item, index) => {
        return (
          <SwiperSlide key={index + "swiperMovie"}>
            <SwiperMovieCard item={item} index={index} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
