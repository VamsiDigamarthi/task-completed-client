import React from "react";
import SideBar from "../SideBar";
import Header from "../Header";
import "./index.css";
const NotAccess = () => {
  return (
    <div className="notaccess">
      <div className="left-not">
        <SideBar />
      </div>
      <div className="right-not">
        <Header />
        <div>
          <img className="not-img" src="./images/acc1-removebg-preview.png" />
        </div>
      </div>
    </div>
  );
};

export default NotAccess;
