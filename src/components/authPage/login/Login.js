import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
function Login() {
  const [show, setShow] = useState(false);

  return (
    <div className="login">
      <div className="login_wrap">
        <h3>Login</h3>
        <div className="login_wrap_content">
          <input placeholder="Enter Username" />
          {show ? (
            <input placeholder="Enter Password" />
          ) : (
            <input placeholder="Enter Password" type="password" />
          )}
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
