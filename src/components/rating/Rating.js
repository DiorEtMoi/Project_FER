import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
function Rating() {
  const [star, setStar] = useState(null);
  const [hover, setHover] = useState(null);
  const starArr = Array(10).fill(0);

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
    </div>
  );
}

export default Rating;
