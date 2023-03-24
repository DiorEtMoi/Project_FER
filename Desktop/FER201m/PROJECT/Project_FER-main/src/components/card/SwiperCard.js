import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
function SwiperCard({ item, type }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    const check = type?.find((ite) => ite?.id === item?.type?.id);
    setCurrent(check);
  }, [type]);
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
          <span>{current?.typeName}</span>
          <span className="time">2021</span>
        </div>
      </div>
    </div>
  );
}

export default SwiperCard;
