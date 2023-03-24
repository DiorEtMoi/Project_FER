import axios from "axios";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";

function AddNewType() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nameRef = useRef("");
  const handleCreateNewType = async () => {
    try {
      dispatch(isLoading());
      await axios.post("http://localhost:3000/type", {
        typeName: nameRef.current.value,
      });
      dispatch(isSuccess());
      navigate("/admin/type");
      return toast.success("Thêm thành công !");
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data);
    }
  };
  return (
    <div className="add_new_type">
      <div className="add_new_type_header">
        <h3
          style={{
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Thêm thể loại mới
        </h3>
      </div>
      <div className="add_new_type_content container">
        <label>Type : </label>
        <input ref={nameRef} />
      </div>
      <button className="btn btn-light" onClick={handleCreateNewType}>
        Thêm
      </button>
    </div>
  );
}

export default AddNewType;
