import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserStore } from "../../../App";
import { isFailing, isLoading, isSuccess } from "../../../redux/auth/slice";
import "./style.scss";
function Login() {
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const { setRole } = useContext(UserStore);
  const navigate = useNavigate();
  const userName = useRef("");
  const passRef = useRef("");
  const dispatch = useDispatch();
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
  const handleLogin = () => {
    const account = list.find((item) => {
      if (
        item?.userName === userName.current.value &&
        item?.password === passRef.current.value
      ) {
        return item;
      }
    });

    if (account?.role === "role_admin") {
      toast.success("Đăng nhập thành công !");
      setRole(account);
      return navigate("/admin/movie_manager");
    }
    if (account) {
      toast.success("Đăng nhập thành công !");
      setRole(account);
      return navigate("/");
    }
    return toast.error("Tài khoản hoặc mật khẩu không đúng ?");
  };
  return (
    <div className="login">
      <div className="login_wrap">
        <h3>Login</h3>
        <div className="login_wrap_content">
          <input placeholder="Enter Username" ref={userName} />
          <input
            placeholder="Enter Password"
            type={show ? "text" : "password"}
            ref={passRef}
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
          onClick={handleLogin}
        >
          Login
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
          <Link to="/auth/register"> Register ?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
