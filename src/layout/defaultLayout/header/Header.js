import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserStore } from "../../../App";
import { isLoading, isSuccess, isFailing } from "../../../redux/auth/slice";
import "./style.scss";
function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState([]);
  const { role, setRole } = useContext(UserStore);
  const { cache } = useContext(UserStore);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const handleSearch = async (e) => {
    setOpen(false);
    setSearch(e.target.value);
    const listAnime = await axios.get(
      `http://localhost:3000/movie?name_like=${e.target.value}`
    );
    const data = listAnime?.data;
    console.log(data);
    setList([...data]);
  };
  useEffect(() => {
    let here = true;
    const url = "http://localhost:3000/type";
    if (cache.current[url]) {
      return setType(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setType(res?.data);
        console.log(res?.data);
        cache.current[url] = res?.data;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, []);
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
          <div className="header_nav_item" onClick={() => navigate("/newMovie")}>
            Phim mới
          </div>
          <div className="header_nav_item">Bạn đang tìm ?</div>
          <div
            className={open ? "header_nav_item active" : "header_nav_item"}
            onClick={() => {
              setSearch("");
              return setOpen(!open);
            }}
          >
            Thể loại ?
          </div>
        </div>
        <div className="header_option">
          <div className="header_option_search">
            <input
              placeholder="Nhập phim muốn tìm ...."
              value={search}
              onChange={(e) => handleSearch(e)}
            />
            <i class="fa-solid fa-magnifying-glass"></i>
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
      </div>
      {search && (
        <div className="search_content">
          <div className="search_content_wrap">
            {list?.map((item, index) => {
              return (
                <div
                  className="search_content_wrap_item"
                  key={index + "searchCard"}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSearch("");
                    return navigate(`/movie/${item?.id}`);
                  }}
                >
                  <img src={item?.image} />
                  <p>{item?.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {open && (
        <div className="type_option">
          <div className="type_option_wrap">
            {type?.map((item, index) => {
              return (
                <div
                  className="type_option_wrap_item"
                  key={index + "type"}
                  onClick={() => {
                    setOpen(false);
                    return navigate(`/type/${item?.id}`);
                  }}
                >
                  <h3>{item?.typeName}</h3>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;