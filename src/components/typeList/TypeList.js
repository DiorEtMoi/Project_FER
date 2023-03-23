import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { UserStore } from "../../App";
import { isSuccess, isLoading, isFailing } from "../../redux/auth/slice";
import MovieList from "../movieList/MovieList";

function TypeList() {
  const [anime, setAnime] = useState([]);
  const { cache } = useContext(UserStore);
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);
  useEffect(() => {
    let here = true;
    const url = `http://localhost:3000/movie?type.id=${slug}`;
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
        console.log(res?.data);
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [slug]);
  return (
    <div>
      <MovieList anime={anime} />
    </div>
  );
}

export default TypeList;
