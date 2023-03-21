import React from "react";
import MovieList from "../movieList/MovieList";
import Swiper from "../swiper/Swiper";
import "./style.scss";
function Home() {
  return (
    <div className="home">
      <div className="home_silde">
        <Swiper />
      </div>
      <div className="home_movie">
        <MovieList />
      </div>
    </div>
  );
}

export default Home;
