// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { LogIn } from "../../actions/AuthAction";
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    // navigate("/");
    dispatch(LogIn(user, navigate));
    // const API = axios.create({ baseURL: "http://localhost:5000" });

    // API.post("/auth/login", user)
    //   .then((res) => {
    //     // setUserDataTask(res.data);
    //     localStorage.setItem("user", JSON.stringify(res.data));
    //     navigate("/");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    setUser({ username: "", password: "" });
  };

  // const x = localStorage.getItem("store");

  // if (x) {
  //   navigate("/");
  // }

  return (
    <div className="signup-container">
      <div className="signup">
        <img
          className="signup-img"
          src="./images/undraw_Mobile_re_q4nk.png"
          alt="signupimage"
        />
        <form onSubmit={submitForm} className="signup-form">
          <h1 className="form-heading">Register</h1>

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
          <button className="signup-btn" type="submit">
            Login
          </button>
          <p>
            <Link to="/signup" className="already-sign">
              Alredy Sign up <span>Click to login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
