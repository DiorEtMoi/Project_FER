import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoading, isSuccess, isFailing } from "../../redux/auth/slice";
import "./style.scss";
function TypeMovie() {
  const [type, setType] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let here = true;
    dispatch(isLoading());
    let url = "http://localhost:3000/type";
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setType(res?.data);
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
    <div className="admin_type">
      <div className="admin_type_header">
        <h3
          style={{
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Quản lý thể loại
        </h3>
        <button
          className="btn btn-light"
          onClick={() => navigate("/admin/type/add")}
        >
          Tạo thể loại mới
        </button>
      </div>
      <div className="admin_type_content container">
        {type?.map((item, index) => {
          return (
            <div className="admin_type_content_item" key={index + "typeName"}>
              <h3>{item?.typeName}</h3>
              <button className="btn btn-light">Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TypeMovie;
