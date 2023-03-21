import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  return (
    <header className="header">
      <div className="container header">
        <div className="header_img">
          <img src="https://res.cloudinary.com/db7xtr0t6/image/upload/v1677930694/Anime_Project/Logo_kkus6y.png" />
        </div>
        <div className="header_nav">
          <div className="header_nav_item" onClick={() => navigate("/")}>
            Trang chủ
          </div>
          <div className="header_nav_item">Bạn đang tìm ?</div>
          <div className="header_nav_item">Không biết xem gì ?</div>
          <div className="header_nav_item">Bộ sưu tập</div>
        </div>
        <div className="header_option">
          <div className="header_option_search">
            <input
              placeholder="Nhập phim muốn tìm ...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <div
            className="header_option_login"
            onClick={() => navigate("/auth/login")}
          >
            Đăng Nhập <i class="fa-solid fa-right-to-bracket"></i>
          </div>
        </div>
      </div>
      {search && (
        <div className="search_content">
          <div className="search_content_wrap">
            <div className="search_content_wrap_item">
              <img src="https://viettoons.tv/media/movie/images/2023_02_12/56092b9cdbbc4217b93c.jpg" />
              <p>Kick Buttowski</p>
            </div>
            <div className="search_content_wrap_item">
              <img src="https://viettoons.tv/media/movie/images/2023_02_12/56092b9cdbbc4217b93c.jpg" />
              <p>Kick Buttowski</p>
            </div>
            <div className="search_content_wrap_item">
              <img src="https://viettoons.tv/media/movie/images/2023_02_12/56092b9cdbbc4217b93c.jpg" />
              <p>Kick Buttowski</p>
            </div>
            <div className="search_content_wrap_item">
              <img src="https://viettoons.tv/media/movie/images/2023_02_12/56092b9cdbbc4217b93c.jpg" />
              <p>Kick Buttowski</p>
            </div>{" "}
            <div className="search_content_wrap_item">
              <img src="https://viettoons.tv/media/movie/images/2023_02_12/56092b9cdbbc4217b93c.jpg" />
              <p>Kick Buttowski</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
