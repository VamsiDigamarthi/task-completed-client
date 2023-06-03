import React from "react";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";

import { FiMoon } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { BiSearchAlt } from "react-icons/bi";
import "./index.css";
const Header = () => {
  return (
    <div className="search-dark-container">
      {/* <div>
        <input className="search" type="text" />
        <AiOutlineSearch className="search-icon" />
      </div> */}
      <div className="employee-serach-container eeeeee">
        <div>
          <input type="text" className="change" placeholder="search" />
          <div>
            <BiSearchAlt className="employee-seacrh-icon" />
          </div>
        </div>
      </div>
      <div>
        <FiMoon className="header-icons" />
        <CiSettings className="header-icons" />
        <AiOutlineUser className="header-icons" />
      </div>
    </div>
  );
};

export default Header;
