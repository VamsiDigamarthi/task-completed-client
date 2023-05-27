// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../../actions/AuthAction";
import "./index.css";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  //console.log(UUU?.response);

  const err = useSelector((state) => state.authReducer.fail);

  const error = useSelector((state) => state.authReducer.error);

  // console.log(error);

  // console.log(err);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    dispatch(LogIn(user, navigate));

    setUser({ username: "", password: "" });
  };

  return (
    <div className="login-container">
      <div className="login">
        <img
          className="login-img"
          src="./images/undraw_Mobile_re_q4nk.png"
          alt="loginimage"
        />
        <form onSubmit={submitForm} className="login-form">
          <h1 className="form-heading">Login</h1>

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
            Login
          </button>
          <p>
            <Link to="/signup" className="already-sign">
              Don't have account <span>Click to login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
