// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../../actions/AuthAction";
import axios from "axios";
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

    // login details api call start

    const API = axios.create({ baseURL: "http://localhost:5000" });

    const newDates = new Date();

    // const strinDate = newDates.toString();

    //const newStringDate = strinDate

    // Extract the date and time components
    const year = newDates.getFullYear();
    const month = (newDates.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1 and pad with leading zeros
    const day = newDates.getDate().toString().padStart(2, "0");
    const hours = newDates.getHours().toString().padStart(2, "0");
    const minutes = newDates.getMinutes().toString().padStart(2, "0");

    // Create the final formatted string
    const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}`;

    // console.log(formattedDateString);

    const values = {
      userName: user.username,
      dateField: formattedDateString,
    };

    // console.log(strinDate);
    // console.log(typeof strinDate);

    //console.log(values.dateField);

    API.post("/login/details", values)
      .then((res) => {
        //console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    // login details api call end

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

          <div>
            {/* <p>
              <Link to="/signup" className="already-sign">
                Don't have account <span>Click to login</span>
              </Link>
            </p> */}
            <p className="reset-pass">
              <Link to="/resetpassword">Reset your password</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
