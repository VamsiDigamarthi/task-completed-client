import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GiHumanTarget } from "react-icons/gi";
import { AiFillHome, AiOutlineTeam } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import "./index.css";
import { Link } from "react-router-dom";
//import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// import { logout } from "../../actions/AuthActions";

import { logout } from "../../actions/AuthAction";

const SideBar = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className="dash-board">
      <div>
        <h3>Welcome</h3>
        <GiHamburgerMenu />
      </div>
      {/* second -constaioner */}
      <div className="dash-image-container">
        <div className="dash-img">
          <img
            className="img-dash"
            // src="https://expertphotography.b-cdn.net/wp-content/uploads/2018/10/cool-profile-pictures-retouching-1.jpg"
            src="./images/brihaspathi.png"
            alt="im"
          />
        </div>
        {/* <h3>Honey</h3> */}
      </div>

      <Link to={"/dashboard"} className="link">
        <div className="dash-home">
          <AiFillHome />
          <h5>Admin</h5>
        </div>
      </Link>

      <Link to={"/teams"} className="link">
        <div className="employe-icons">
          <AiOutlineTeam />
          <h5>Teams</h5>
        </div>
      </Link>

      <Link to={"/employee"} className="link">
        <div className="employe-icons">
          <GiHumanTarget />
          <h5>Employe</h5>
        </div>
      </Link>
      <div className="logout">
        <RiLogoutCircleLine />
        <button onClick={handleLogOut}>LogOut</button>
      </div>
    </div>
  );
};

export default SideBar;
