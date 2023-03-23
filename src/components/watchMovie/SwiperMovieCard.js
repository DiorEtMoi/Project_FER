import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function SwiperMovieCard({ item, index }) {
  const navigate = useNavigate();
  const { slug } = useParams();

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
      <div
        className={
          item?.id == slug
            ? "swiper_movie_card_content active"
            : "swiper_movie_card_content"
        }
      >
        {item?.name}
      </div>
    </div>
  );
}

export default SwiperMovieCard;
