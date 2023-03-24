import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserStore } from "../../App";
import "../defaultLayout/header/style.scss";
function HeaderAdmin() {
  const navigate = useNavigate();
  const { role, setRole } = useContext(UserStore);
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
          <div
            className="header_nav_item"
            onClick={() => navigate("/admin/type")}
          >
            Quản lý thể loại
          </div>

          <div
            className="header_nav_item"
            onClick={() => navigate("/admin/movie_manager")}
          >
            Quản lý Phim
          </div>
          <div
            className="header_nav_item"
            onClick={() => navigate("/admin/manage")}
          >
            Thống kê
          </div>
        </div>
        {role ? (
          <div
            className="header_option_login"
            onClick={() => {
              toast.success("Đăng xuất thành công !");
              navigate("/");
              return setRole(null);
            }}
          >
            <h3>{role?.userName}</h3>
            Đăng xuất
          </div>
        ) : (
          <div
            className="header_option_login"
            onClick={() => navigate("/auth/login")}
          >
            Đăng Nhập <i class="fa-solid fa-right-to-bracket"></i>
          </div>
        )}
      </div>
    </header>
  );
}

export default HeaderAdmin;
