import React from "react";
import MovieCard from "../card/MovieCard";
import "./style.scss";
function MovieList() {
  return (
    <div className="movie_list container">
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
      <MovieCard />
    </div>
  );
}

export default MovieList;
