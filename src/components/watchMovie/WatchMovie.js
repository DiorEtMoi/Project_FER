import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { UserStore } from "../../App";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import "./style.scss";
import SwiperMovie from "./SwiperMovie";
function WatchMovie() {
  const { slug } = useParams();
  const { cache } = useContext(UserStore);
  const dispatch = useDispatch();
  const [anime, setAnime] = useState({});
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    let here = true;
    const url = `http://localhost:3000/chapAnime/${slug}`;
    if (cache.current[url]) {
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
  }, [slug]);
  useEffect(() => {
    if (anime) {
      let here = true;
      const url = `http://localhost:3000/chapAnime?animeID=${anime?.animeID}`;
      if (cache.current[url]) {
        return setMovie(cache.current[url]);
      }
      dispatch(isLoading());
      axios
        .get(url)
        .then((res) => {
          if (!here) {
            return;
          }
          setMovie(res?.data);
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
    }
  }, [anime]);
  return (
    <div className="watch_movie">
      <div className="watch_movie_video">
        <iframe
          width="100%"
          height="100%"
          src={anime?.video}
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <div className="watch_movie_chap">
        <div className="watch_movie_chap_header container">
          <i class="fa-solid fa-list"></i>
          <h3>Danh sách tập</h3>
        </div>
        <SwiperMovie movie={movie} />
      </div>
    </div>
  );
}

export default WatchMovie;
