import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.scss";

function CardMovie({ item, update, setUpdate }) {
  const navigate = useNavigate();
  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/movie/${item?.id}`);
    setUpdate(!update);
    return toast.success("Bạn đã xóa thành công !");
  };
  return (
    <div className="card_movie">
      <div className="card_movie_img">
        <img src={item?.image} />
      </div>
      <div className="card_movie_option">
        <button
          className="btn btn-light"
          onClick={() => navigate(`/admin/upload/${item?.id}`)}
        >
          Upload
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "red", marginLeft: "20px" }}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CardMovie;
