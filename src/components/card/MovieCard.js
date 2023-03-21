import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
function MovieCard() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        paddingLeft: "15px",
        paddingRight: "15px",
        width: "calc(100%/6)",
      }}
    >
      <div className="movie_card">
        <div className="movie_card_header" onClick={() => navigate("/movie/1")}>
          <img src="https://viettoons.tv/media/movie/images/2023_02_12/56092b9cdbbc4217b93c.jpg" />
          <div className="movie_card_play">
            <div className="movie_card_play_icon">
              <i class="fa-solid fa-play"></i>
            </div>
          </div>
          <div className="movie_rate">
            <i class="fa-solid fa-star"></i>10
          </div>
        </div>
        <div className="movie_card_content">
          <div
            className="movie_card_content_title"
            onClick={() => navigate("/movie/1")}
          >
            Kick Buttowski
          </div>
          <div className="movie_card_content_type">
            <span
              style={{
                marginRight: "20px",
              }}
            >
              Action
            </span>
            <span>2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
