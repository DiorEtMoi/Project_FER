import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserStore } from "../../App";
import { isSuccess, isLoading, isFailing } from "../../redux/auth/slice";
import MovieList from "../movieList/MovieList";
import Swiper from "../swiper/Swiper";
import "./style.scss";
function Home() {
  const [anime, setAnime] = useState([]);
  const { cache } = useContext(UserStore);
  const dispatch = useDispatch();
  useEffect(() => {
    let here = true;
    const url = "http://localhost:3000/movie";
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
    <div className="home">
      <div className="home_silde">
        <Swiper anime={anime} />
      </div>
      <div className="home_movie">
        <MovieList />
      </div>
    </div>
  );
}

export default Home;
