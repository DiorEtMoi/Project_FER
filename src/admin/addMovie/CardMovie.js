import React from "react";
import "./style.scss";

function CardMovie({ item }) {
  return (
    <div className="card_movie">
      <div className="card_movie_img">
        <img src={item?.image} />
      </div>
      <div className="card_movie_option">
        <button className="btn btn-light">Upload</button>
        <button
          className="btn"
          style={{ backgroundColor: "red", marginLeft: "20px" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CardMovie;
