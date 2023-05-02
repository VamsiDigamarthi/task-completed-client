import React, { useState } from "react";

import "./index.css";
import SideBar from "../SideBar";
import Header from "../Header";
import { SiMulesoft } from "react-icons/si";
import { SiMarketo } from "react-icons/si";
import { MdAccountBalanceWallet } from "react-icons/md";
import { SiPolymerproject } from "react-icons/si";
import Chart from "react-apexcharts";
// import User from "../Users";

const employessTeams = [
  {
    title: "Software Team",
    noOfEmployess: 8,
    icons: <SiMulesoft />,
  },
  {
    title: "Market Team",
    noOfEmployess: 12,
    icons: <SiMarketo />,
  },
  {
    title: "Accounts Team",
    noOfEmployess: 11,
    icons: <MdAccountBalanceWallet />,
  },
  {
    title: "Project Team",
    noOfEmployess: 11,
    icons: <SiPolymerproject />,
  },
];

const Admin = () => {
  const [options, setOptions] = useState({
    colors: ["#ff0000", "#f0f", "#ded821"],
  });

  const [series, setSeries] = useState([
    {
      name: "software team",
      data: [100, 200, 400, 150],
    },
    {
      name: "market team",
      data: [80, 100, 300, 270],
    },
    {
      name: "projects team",
      data: [140, 500, 200, 80],
    },
  ]);

  return (
    <div className="admin">
      <div className="side-bar">
        <SideBar />
      </div>
      <div className="right-a">
        <Header />
        <div className="teams-admin">
          {employessTeams.map((each) => (
            <div className="no-of-employee">
              <p>{each.icons}</p>
              <h3>{each.title}</h3>
              <p>
                Employees<span>{each.noOfEmployess}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="charts-container">
          <Chart
            options={options}
            series={series}
            type="area"
            width={1000}
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;
