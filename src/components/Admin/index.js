import React, { useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import "./index.css";
import SideBar from "../SideBar";
import Header from "../Header";
import { SiMulesoft } from "react-icons/si";
import { SiMarketo } from "react-icons/si";
import { MdAccountBalanceWallet } from "react-icons/md";
import { SiPolymerproject } from "react-icons/si";
import Chart from "react-apexcharts";
import AdminAddTeams from "../AdminAddTeams";
import axios from "axios";
import { useSelector } from "react-redux";
import AdminAddTaskToTeam from "../AdminAddTaskToTeam";
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
  const [addTeams, setAddTeams] = useState(false);

  const [adminAddTask, setAdminAddTask] = useState(false);

  const [adminAllTeams, setAdminAllTeams] = useState([]);

  const [loading, setLoading] = useState(false);

  // const [options, setOptions] = useState({
  //   colors: ["#ff0000", "#f0f", "#ded821"],
  // });

  // const [series, setSeries] = useState([
  //   {
  //     name: "software team",
  //     data: [100, 200, 400, 150],
  //   },
  //   {
  //     name: "market team",
  //     data: [80, 100, 300, 270],
  //   },
  //   {
  //     name: "projects team",
  //     data: [140, 500, 200, 80],
  //   },
  // ]);

  const UUU = useSelector((state) => state.authReducer.authData);

  // const adminrole = { role: UUU.role };

  const adminrole = { role: UUU.role };

  const getAllTeamsByAdmin = () => {
    const API = axios.create({ baseURL: "http://localhost:5000" });

    // API.post("/team/user", adminrole)
    //   .then((res) => {
    //     // setTeamUserList(res.data);
    //     setAdminAllTeams(res.data);
    //   })

    //   .catch((e) => {
    //     console.log(e);
    //   });
    setLoading(true);
    API.get(`team/admin/team/${UUU._id}`)
      .then((res) => {
        // setTeamUserList(res.data);

        setAdminAllTeams(res.data);
        setLoading(false);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllTeamsByAdmin();
  }, []);

  console.log(adminAllTeams);

  return (
    <>
      <div className="admin">
        <div className="side-bar">
          <SideBar />
        </div>
        <div className="right-a">
          <Header />
          {/* add team and task container */}
          <div className="admin-image-container">
            <div>
              <img
                className="admin-image"
                src={UUU.profilePic} //"https://i.pinimg.com/736x/52/29/5f/52295fa7746c2d69256c25a88b6343f4.jpg"
                alt="admin-image"
              />
              <div>
                {/* {i.name.charAt(0).toUpperCase() + i.name.slice(1)} */}
                <h2 className="admin-heading">{UUU.name}</h2>
                <p className="admin-desc">{UUU.designation}</p>
              </div>
            </div>
            <div className="admin-add-btn">
              <button
                className="admin-left-btn"
                onClick={() => setAddTeams(true)}
              >
                Add Teams
              </button>
              <button
                className="admin-right-btn"
                onClick={() => setAdminAddTask(true)}
              >
                Add Project to Teams
              </button>
            </div>
          </div>

          {/* add team and task container end */}
          {/* <div className="teams-admin">
            {employessTeams.map((each, index) => (
              <div key={index} className="no-of-employee">
                <p>{each.icons}</p>
                <h3>{each.title}</h3>
                <p>
                  Employees<span>{each.noOfEmployess}</span>
                </p>
              </div>
            ))}
          </div> */}

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <SpinnerCircular enabled={loading} />
            </div>
          ) : (
            <div className="admin-employee-f-container">
              {adminAllTeams.map((each) => (
                <div className="admin-employess-s-container">
                  <img
                    className="admin-employee-images-card"
                    src={each.profilePic}
                  />
                  <p className="para-name">
                    {each.name.charAt(0).toUpperCase() + each.name.slice(1)}
                  </p>
                  <p className="admin-emp-role">
                    <span>{each.role}</span>
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* <div className="charts-container">
            <Chart
              options={options}
              series={series}
              type="area"
              width={1000}
              height={400}
            />
          </div> */}
        </div>
      </div>
      <AdminAddTeams
        setAddTeams={setAddTeams}
        addTeams={addTeams}
        getAllTeamsByAdmin={getAllTeamsByAdmin}
      />
      <AdminAddTaskToTeam
        setAdminAddTask={setAdminAddTask}
        adminAddTask={adminAddTask}
        adminAllTeams={adminAllTeams}
      />
    </>
  );
};

export default Admin;
