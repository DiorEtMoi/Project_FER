import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../../redux/auth/slice";
import "./style.scss";
function Register() {
  const [show, setShow] = useState(false);
  const userRef = useRef("");
  const passRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  useEffect(() => {
    let here = true;
    const url = `http://localhost:3000/user`;
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setList(res?.data);
        console.log(res?.data);
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, []);
  const handleRegister = async () => {
    const acc = list.find((item) => {
      if (item?.userName === userRef.current.value) {
        return item;
      }
    });
    if (!acc) {
      axios.post("http://localhost:3000/user", {
        userName: userRef.current.value,
        password: passRef.current.value,
        role: "role_user",
      });
      navigate("/auth/login");
      return toast.success("Bạn đã đăng ký thành công");
    }
    return toast.error("Tài Khoản đã tồn tại");
  };
  return (
    <div className="login">
      <div className="login_wrap">
        <h3>Register</h3>
        <div className="login_wrap_content">
          <input placeholder="Enter Username" ref={userRef} />

          <input
            ref={passRef}
            placeholder="Enter Password"
            type={show ? "text" : "password"}
          />
        </div>
        <div
          style={{
            textAlign: "start",
          }}
        >
          <input
            type="checkbox"
            style={{
              marginLeft: "4px",
            }}
            onClick={() => setShow(!show)}
          />
          <span
            style={{
              marginLeft: "10px",
              color: "#fff",
            }}
          >
            Show
          </span>
        </div>
        <button
          className="btn"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
          }}
          onClick={handleRegister}
        >
          Register
        </button>
        <div
          style={{
            marginTop: "20px",
            textAlign: "right",
            color: "#fff",
            cursor: "pointer",
            transition: "0.5s",
          }}
          className="login_register"
        >
          <Link to="/auth/login"> Login ?</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
