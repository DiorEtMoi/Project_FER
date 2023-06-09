import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UserStore } from "../../App";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import Rating from "../rating/Rating";
import "./style.scss";
function MovieDetails() {
  const [update, setUpdate] = useState(false);
  const [rate, setRate] = useState([]);
  const navigate = useNavigate();
  const [anime, setAnime] = useState([]);
  const { cache } = useContext(UserStore);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [start, setStart] = useState(0);
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
  useEffect(() => {
    let total = 0;
    rate?.forEach((item) => {
      total += item?.star;
    });
    setStart(total / rate.length);
  }, [rate]);
  useEffect(() => {
    let here = true;
    const url = `http://localhost:3000/rating?animeID=${slug}`;
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setRate(res?.data);
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [update]);
  useEffect(() => {
    let here = true;
    const url = `http://localhost:3000/movie/${slug}`;
    if (cache.current[url]) {
      setBg(cache.current[url]?.background);
      return setAnime(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setAnime(res?.data);
        setBg(res?.data?.background);
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
    <div className="movie_detail">
      <div
        className="movie_detail_background"
        style={{
          background: `url(${anime?.image}) center top / cover no-repeat`,
        }}
      ></div>
      <div className="container movie_detail_content">
        <div
          className="movie_detail_content_item"
          onClick={() =>
            navigate(`/watch/${anime?.chap[anime?.chap.length - 1]?.chapID}`)
          }
        >
          <i className="fa-regular fa-circle-play"></i>
          <span>Xem tập mới nhất</span>
        </div>
        <div
          className="movie_detail_content_item"
          onClick={() => navigate(`/watch/${anime?.chap[0]?.chapID}`)}
        >
          <i className="fa-solid fa-circle-play"></i>
          <span>Xem từ đầu</span>
        </div>
        <div className="movie_detail_content_title">
          <h3>{anime?.name}</h3>
        </div>
        <div className="movie_detail_content_details">
          <div className="movie_detail_content_details_item">
            <i className="fa-regular fa-star"></i>
            <span>{start}</span>
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
            {anime?.chap?.map((item, index) => {
              return (
                <div
                  className="movie_detail_content_chap_wrap_item"
                  key={index + "chap"}
                  onClick={() => navigate(`/watch/${item?.chapID}`)}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>
        <div className="movie_detail_content_demo">
          <div className="movie_detail_content_demo_header">
            <i className="fa-solid fa-bars"></i>
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
            {anime?.content}
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
              <i className="fa-brands fa-facebook-f"></i>
              Share
            </div>
          </div>
          <div className="type_movie_share">
            <h3>Bộ sưu tập</h3>
            <div className="type_movie_share_link">
              <i className="fa-solid fa-bookmark"></i>
              Lưu
            </div>
          </div>
        </div>
        <Rating animeID={slug} update={update} setUpdate={setUpdate} />
        <div className="list_rate">
          {rate?.map((item, index) => {
            return (
              <div className="list_rate_item" key={index + "rate"}>
                <div className="list_rate_item_header">
                  <h3>{item?.name}</h3>
                  <span>
                    <i className="fa-regular fa-star"></i> {item?.star}
                  </span>
                </div>
                <div className="list_rate_item_content">{item?.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
