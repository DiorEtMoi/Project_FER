import React from "react";
import { useNavigate } from "react-router-dom";

function SwiperMovieCard({ item, index }) {
  const navigate = useNavigate();
  console.log(item);
  return (
    <div
      className="swiper_movie_card"
      onClick={() => navigate(`/watch/${item?.id}`)}
    >
      <div className="swiper_movie_card_img">
        <img src={item?.image} />
        <div className="swiper_movie_card_time">
          <i class="fa-sharp fa-regular fa-circle-play"></i>
          <span>20:23</span>
        </div>
      </div>
      <div className="swiper_movie_card_content">{item?.name}</div>
    </div>
  );
}

export default SwiperMovieCard;
