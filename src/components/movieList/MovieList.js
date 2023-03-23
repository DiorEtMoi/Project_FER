import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserStore } from "../../App";
import MovieCard from "../card/MovieCard";
import { isLoading, isFailing, isSuccess } from "../../redux/auth/slice";
import "./style.scss";
import axios from "axios";
function MovieList({ anime, type }) {
  const dispatch = useDispatch();
  return (
    <div className="movie_list container">
      {anime?.map((item, index) => {
        return <MovieCard item={item} key={index + "movie"} type={type} />;
      })}
    </div>
  );
}

export default MovieList;
