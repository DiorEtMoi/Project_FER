import axios from "axios";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { isLoading, isSuccess, isFailing } from "../../../redux/auth/slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserStore } from "../../../App";
import "./style.scss";

function Header() {
  const { cache } = useContext(UserStore);
  const [option, setOption] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    let here = true;
    const url = "http://localhost:3000/type";
    if (cache.current[url]) {
      console.log(cache.current[url]);
      return setOption(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setOption(res?.data);
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

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { role, setRole } = useContext(UserStore);
  const [list, setList] = useState([]);
  const handleSearch = async (e) => {
    setSearch(e.target.value);
    const listAnime = await axios.get(
      `http://localhost:3000/movie?name_like=${e.target.value}`
    );
    const data = listAnime?.data;
    console.log(data);
    setList([...data]);
  };
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
          <div className="header_nav_item">Bộ sưu tập</div>
          <div className="header_nav_item">
            <select>
              <option>Chọn thể loại</option>
              {option.map(p =>
                <option value={p.typeID}>{p.typeName}</option>
              )}
            </select>
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
    </header>
  );
}

export default Header;
