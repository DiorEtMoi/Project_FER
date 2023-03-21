import React from "react";

function SwiperMovieCard() {
  return (
    <div className="swiper_movie_card">
      <div className="swiper_movie_card_img">
        <img src="https://viettoons.tv/media/movie/episode/thumbnail/2021_08_03/1283_6410b3bd41394df7a638.jpeg" />
        <div className="swiper_movie_card_time">
          <i class="fa-sharp fa-regular fa-circle-play"></i>
          <span>20:23</span>
        </div>
      </div>
      <div className="swiper_movie_card_content">
        Ep 1: The Lake Nose Monster
      </div>
    </div>
  );
}

export default SwiperMovieCard;
