import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
function SwiperCard({ item }) {
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
        <img src={item?.image} />
      </div>
      <div className="rate">
        <i class="fa-regular fa-star"></i>
        9.9
      </div>
      <div className="swiper_card_content">
        <div className="swiper_card_content_title">{item?.name}</div>
        <div className="swiper_card_content_type">
          <span>Action</span>
          <span className="time">2021</span>
        </div>
      </div>
    </div>
  );
}

export default SwiperCard;
