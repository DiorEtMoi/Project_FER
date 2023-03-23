import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserStore } from "../../App";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import "./style.scss";
function Rating({ animeID, update, setUpdate }) {
  const [star, setStar] = useState(null);
  const [hover, setHover] = useState(null);
  const contentRef = useRef("");
  const { role } = useContext(UserStore);
  const starArr = Array(10).fill(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [check, setCheck] = useState(null);
  useEffect(() => {
    if (role) {
      let here = true;
      const url = `http://localhost:3000/rating?accountID=${role?.id}&animeID=${animeID}`;
      dispatch(isLoading());
      axios
        .get(url)
        .then((res) => {
          if (!here) {
            return;
          }
          setCheck(res?.data);
          console.log(res?.data);
          dispatch(isSuccess());
        })
        .catch((err) => {
          dispatch(isFailing());
        });
      return () => {
        here = false;
      };
    }
  }, [update]);
  const handleRating = async () => {
    if (!role) {
      navigate("/auth/login");
      return toast.error("Vui lòng đăng nhập để đánh giá !");
    }
    if (contentRef.current.value === "" || !star) {
      return toast.error("Vui lòng đánh giá và cho lời bình !");
    }
    try {
      dispatch(isLoading());
      if (check.length === 0) {
        const res = await axios.post(`http://localhost:3000/rating`, {
          star,
          content: contentRef.current.value,
          animeID: parseInt(animeID),
          accountID: role?.id,
          name: role?.userName,
        });
        console.log(res);
      } else {
        const res = await axios.put(
          `http://localhost:3000/rating/${check[0]?.id}`,
          {
            star,
            content: contentRef.current.value,
            animeID: parseInt(animeID),
            accountID: role?.id,
            name: role?.userName,
          }
        );
        console.log(res);
      }
      setUpdate(!update);
      setStar(null);
      contentRef.current.value = "";
      dispatch(isSuccess());
      return toast.success("Đánh giá thành công ! ");
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data);
    }
  };
  return (
    <div className="rating">
      <div
        style={{
          alignItems: "center",
        }}
      >
        <div className="rating_header">Đánh giá</div>
        <div className="rating_body">
          {starArr.map((item, index) => {
            return (
              <i
                onMouseOver={() => setHover(index + 1)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setStar(index + 1)}
                className={
                  hover
                    ? hover > index
                      ? "fa-solid fa-star"
                      : "fa-regular fa-star"
                    : star > index
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star"
                }
                key={index}
              ></i>
            );
          })}
        </div>
      </div>
      <div className="rating_content">
        <textarea ref={contentRef} />
      </div>
      <button
        className="btn"
        style={{
          marginTop: "20px",
          backgroundColor: "#151f30",
          color: "#fff",
        }}
        onClick={handleRating}
      >
        Gửi
      </button>
    </div>
  );
}

export default Rating;
