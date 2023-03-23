import React from "react";
import "./style.scss";
function TypeMovie() {
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
        <button className="btn btn-light">Tạo thể loại mới</button>
      </div>
      <div className="admin_type_content">
        <div className="admin_type_content_item">
          <h3>Action</h3>
        </div>
      </div>
    </div>
  );
}

export default TypeMovie;
