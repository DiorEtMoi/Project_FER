import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
function SwiperCard() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="swiper_card" onClick={() => navigate("/movie/1")}>
      <div className="swiper_card_img">
        <img src="https://viettoons.tv/media/movie/images/2021_06_15/29_3930ea0126624b55bdf8.jpg" />
      </div>
      <div className="rate">
        <i class="fa-regular fa-star"></i>
        9.9
      </div>
      <div className="swiper_card_content">
        <div className="swiper_card_content_title">Nguyen Dinh Hoan</div>
        <div className="swiper_card_content_type">
          <span>Action</span>
          <span className="time">2021</span>
        </div>
      </div>
    </div>
  );
}

export default SwiperCard;
