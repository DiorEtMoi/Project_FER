import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
function MovieCard({ item, type }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    const check = type?.find((ite) => ite?.id === item?.type?.id);
    setCurrent(check);
  }, [type]);
  return (
    <div
      style={{
        paddingLeft: "15px",
        paddingRight: "15px",
        width: "calc(100%/6)",
      }}
    >
      <div className="movie_card">
        <div
          className="movie_card_header"
          onClick={() => navigate(`/movie/${item?.id}`)}
        >
          <img src={item?.image} />
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
            onClick={() => navigate(`/movie/${item?.id}`)}
          >
            {item?.name}
          </div>
          <div className="movie_card_content_type">
            <span
              style={{
                marginRight: "20px",
              }}
            >
              {current?.typeName}
            </span>
            <span>2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
