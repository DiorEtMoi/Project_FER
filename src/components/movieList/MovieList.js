import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserStore } from "../../App";
import MovieCard from "../card/MovieCard";
import { isLoading, isFailing, isSuccess } from "../../redux/auth/slice";
import "./style.scss";
import axios from "axios";
function MovieList() {
  const dispatch = useDispatch();
  const [anime, setAnime] = useState([]);
  const { cache } = useContext(UserStore);
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
    <div className="movie_list container">
      {anime?.map((item, index) => {
        return <MovieCard item={item} key={index + "movie"} />;
      })}
    </div>
  );
}

export default MovieList;
