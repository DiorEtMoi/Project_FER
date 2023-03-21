import React, { useState } from "react";
import "./style.scss";
import SwiperMovie from "./SwiperMovie";
function WatchMovie() {
  return (
    <div className="watch_movie">
      <div className="watch_movie_video">
        <iframe
          width="100%"
          height="100%"
          src="https://short.ink/pwyB0vlJzy"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div className="watch_movie_chap">
        <div className="watch_movie_chap_header container">
          <i class="fa-solid fa-list"></i>
          <h3>Danh sách tập</h3>
        </div>
        <SwiperMovie />
      </div>
    </div>
  );
}

export default WatchMovie;
