import React from "react";

function SwiperMovieCard({ item }) {
  console.log(item);
  return (
    <div className="swiper_movie_card">
      <div className="swiper_movie_card_img">
        <img src={item?.image} />
        <div className="swiper_movie_card_time">
          <i class="fa-sharp fa-regular fa-circle-play"></i>
          <span>20:23</span>
        </div>
      </div>
      <div className="swiper_movie_card_content">EP {item?.id}</div>
    </div>
  );
}

export default SwiperMovieCard;
