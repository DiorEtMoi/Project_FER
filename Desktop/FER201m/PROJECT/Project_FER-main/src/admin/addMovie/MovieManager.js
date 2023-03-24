import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoading, isSuccess, isFailing } from "../../redux/auth/slice";
import CardMovie from "./CardMovie";
import "./style.scss";
function MovieManager() {
  const [anime, setAnime] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    let here = true;
    const url = "http://localhost:3000/movie";

    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setAnime(res?.data);
        console.log(res?.data);
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [update]);
  return (
    <div className="movie_manager">
      <div className="movie_manager_header">
        <h3
          style={{
            color: "#fff",
          }}
        >
          Quản lý phim
        </h3>
        <button
          className="btn btn-light"
          style={{
            marginTop: "10px",
          }}
          onClick={() => navigate("/admin/add_movie")}
        >
          Thêm Phim
        </button>
      </div>
      <div className="movie_manager_body">
        {anime?.map((item, index) => {
          return (
            <CardMovie
              item={item}
              key={index + "cardManager"}
              update={update}
              setUpdate={setUpdate}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MovieManager;
