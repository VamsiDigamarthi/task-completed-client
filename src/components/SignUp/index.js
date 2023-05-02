// import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
// import { BiUserPin } from "react-icons/bi";
import "./index.css";
const SignUp = () => {
  const [isEmployee, setIsEmployee] = useState(false);

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const employeeRole = (e) => {
    console.log(e.target.value);
    if (e.target.value === "employee") {
      setIsEmployee(true);
    } else {
      setIsEmployee(false);
    }
  };

  const teamLeadeRole = () => {};

  const submitForm = (e) => {};

  //   const submitForm = async (e) => {
  //     e.preventDefault();

  //     const API = axios.create({ baseURL: "http://localhost:5000" });

  //     API.post("/auth/register", user)
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });

  //     setUser({ firstname: "", lastname: "", username: "", password: "" });
  //   };

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
            <AiOutlineUser className="form-icons" />
            <input
              placeholder="Name"
              className="form-input"
              type="text"
              onChange={usernameChange}
              name="firstname"
              value={user.firstname}
            />
          </div>

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
          {/* <p className="text-xs text-red-500">
            {emailError && "username not valid"}
          </p> */}
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
          <div className="form-input-container">
            <select className="employee-type" onChange={employeeRole}>
              <option value="employee">Employee</option>
              <option value="team leader">Team Leader</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {isEmployee && (
            <div className="form-input-container">
              <select className="employee-type" onChange={teamLeadeRole}>
                <option value="employee">team-1</option>
                <option value="team leader">team-2</option>
                <option value="admin">team-3</option>
              </select>
            </div>
          )}
          {/* <p className="text-xs text-red-500">
            {passwordError && "username not valid"}
          </p> */}
          <button className="signup-btn" type="submit">
            SignUp
          </button>
          <p>
            <Link to="/login" className="already-sign">
              Alredy Sign up <span>Click to login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
