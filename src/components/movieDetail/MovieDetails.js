import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../rating/Rating";
import "./style.scss";
function MovieDetails() {
  const navigate = useNavigate();
  const [bg, setBg] = useState(
    "https://viettoons.tv/media/movie/images/2023_02_12/3cf33aa8f4a74818a6a8.jpg"
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="movie_detail">
      <div
        className="movie_detail_background"
        style={{ background: `url(${bg}) center top / cover no-repeat` }}
      ></div>
      <div className="container movie_detail_content">
        <div
          className="movie_detail_content_item"
          onClick={() => navigate("/watch/1")}
        >
          <i class="fa-regular fa-circle-play"></i>
          <span>Xem tập mới nhất</span>
        </div>
        <div
          className="movie_detail_content_item"
          onClick={() => navigate("/watch/1")}
        >
          <i class="fa-solid fa-circle-play"></i>
          <span>Xem từ đầu</span>
        </div>
        <div className="movie_detail_content_title">
          <h3>Kick Buttowski</h3>
        </div>
        <div className="movie_detail_content_details">
          <div className="movie_detail_content_details_item">
            <i class="fa-regular fa-star"></i>
            <span>10</span>
          </div>
          <div className="movie_detail_content_details_item">
            <span>Action</span>
          </div>
          <div className="movie_detail_content_details_item">
            <span>2002 Lượt xem</span>
          </div>
        </div>
        <div className="movie_detail_content_chap">
          <div className="movie_detail_content_chap_wrap">
            <div className="movie_detail_content_chap_wrap_item">1</div>
            <div className="movie_detail_content_chap_wrap_item">1</div>
            <div className="movie_detail_content_chap_wrap_item">1</div>
            <div className="movie_detail_content_chap_wrap_item">1</div>
            <div className="movie_detail_content_chap_wrap_item">1</div>
            <div className="movie_detail_content_chap_wrap_item">1</div>
            <div className="movie_detail_content_chap_wrap_item">1</div>
            <div className="movie_detail_content_chap_wrap_item">1</div>
            <div className="movie_detail_content_chap_wrap_item">1</div>
            <div className="movie_detail_content_chap_wrap_item">1</div>
            <div className="movie_detail_content_chap_wrap_item">1</div>
          </div>
        </div>
        <div className="movie_detail_content_demo">
          <div className="movie_detail_content_demo_header">
            <i class="fa-solid fa-bars"></i>
            <span>Mùa</span>
          </div>
          <div className="movie_detail_content_demo_ss">
            <div>Season 2</div>
            <div>Season 2</div>
            <div>Season 2</div>
          </div>
        </div>
        <div className="movie_detail_content_demo">
          <div className="movie_detail_content_demo_header">
            <i class="fa-sharp fa-solid fa-circle-info"></i>
            <span>Giới thiệu</span>
          </div>
          <div className="movie_detail_content_demo_content">
            Kick Buttowski: Suburban Daredevil
          </div>
        </div>
        <div className="type_movie">
          <div className="type_movie_content">
            <h3>Thể loại</h3>
            <div>
              <span>Action</span>
            </div>
          </div>
          <div className="type_movie_share">
            <h3>Chia sẻ</h3>
            <div className="type_movie_share_link">
              <i class="fa-brands fa-facebook-f"></i>
              Share
            </div>
          </div>
          <div className="type_movie_share">
            <h3>Bộ sưu tập</h3>
            <div className="type_movie_share_link">
              <i class="fa-solid fa-bookmark"></i>
              Lưu
            </div>
          </div>
        </div>
        <Rating />
      </div>
    </div>
  );
}

export default MovieDetails;
