import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import "./index.css";
const ResetPassword = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const API = axios.create({ baseURL: "http://localhost:5000" });
    API.put("/auth/reset/password", user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    // setUser({ username: "", password: "" });
    // let res = await axios({
    //   method: 'PUT',
    //   data: user,
    //   url: '/auth/reset/password',

    // });
    // if (res.status == 200) {
    //   success(res);
    // };
  };

  return (
    <div className="login-container">
      <form onSubmit={submitForm} className="login-form reset-form">
        <h1 className="form-heading">Reset Your Password</h1>

        <div className="form-input-container">
          <HiOutlineMail className="form-icons" />
          <input
            placeholder="Email"
            className="form-input"
            type="text"
            onChange={usernameChange}
            name="username"
            value={user.username}
          />
        </div>
        <div className="form-input-container">
          <RiLockPasswordLine className="form-icons" />
          <input
            placeholder="Password"
            className="form-input"
            type="text"
            onChange={usernameChange}
            name="password"
            value={user.password}
          />
        </div>

        <button className="login-btn" type="submit">
          submit
        </button>
        <div>
          <p>
            <Link to="/login" className="already-sign">
              <span> back to login page</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
