import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import "./index.css";
const ResetPassword = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [eyeIconsValue, setEyeIconsValue] = useState(true);

  const [resetPassWordApi, setResetPassWordApi] = useState({});

  const [acknow, setAcknow] = useState("");

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const API = axios.create({ baseURL: "http://localhost:5000" });
    API.put("/auth/reset/password", user)
      .then((res) => {
        //console.log(res.data);
        setResetPassWordApi(res.data);
        setAcknow(res.data.acknowledged);
      })
      .catch((e) => {
        console.log(e);
      });

    setUser({ username: "", password: "" });
    // let res = await axios({
    //   method: 'PUT',
    //   data: user,
    //   url: '/auth/reset/password',

    // });
    // if (res.status == 200) {
    //   success(res);
    // };
  };

  // const eyeValueIcon = () => {
  //   setEyeIconsValue(!false);
  // };

  //console.log(resetPassWordApi);

  console.log(acknow);

  return (
    <div className="login-container">
      <form onSubmit={submitForm} className="login-form reset-form">
        <h1 className="form-heading" style={{ fontStyle: "italic" }}>
          Reset Your Password
        </h1>

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
            type={eyeIconsValue ? "password" : "text"}
            onChange={usernameChange}
            name="password"
            value={user.password}
          />
          <AiOutlineEye
            onClick={() => setEyeIconsValue(!eyeIconsValue)}
            className="eye-icon"
          />
        </div>

        {acknow && <p className="reset-msg">password reset successfully</p>}

        <button className="login-btn" type="submit">
          submit
        </button>
        <div>
          <p>
            <Link to="/login" className="already-sign">
              <span className="reset-msg">back to login page</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
