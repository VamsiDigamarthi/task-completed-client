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

import { RiDeleteBin5Line } from "react-icons/ri";
import AdminDeleteTeamsModal from "../AdminDeleteTeamsModal";

import { BiDetail } from "react-icons/bi";

// const employessTeams = [
//   {
//     title: "Software Team",
//     noOfEmployess: 8,
//     icons: <SiMulesoft />,
//   },
//   {
//     title: "Market Team",
//     noOfEmployess: 12,
//     icons: <SiMarketo />,
//   },
//   {
//     title: "Accounts Team",
//     noOfEmployess: 11,
//     icons: <MdAccountBalanceWallet />,
//   },
//   {
//     title: "Project Team",
//     noOfEmployess: 11,
//     icons: <SiPolymerproject />,
//   },
// ];

const taskStatus = ["completed", "In-completed", "In-progress"];

const Admin = () => {
  const [addTeams, setAddTeams] = useState(false);

  const [adminAddTask, setAdminAddTask] = useState(false);

  const [adminAllTeams, setAdminAllTeams] = useState([]);

  const [loading, setLoading] = useState(false);

  const [deletedTeams, setDeletedTeams] = useState([]);

  const [adminDeleteModal, setAdminDeleteModal] = useState(false);

  const [accessAllProjectToAdmin, setAccessAllProjectToAdmin] = useState([]);

  const [selectedDropDwonAdmin, setSelectedDropDwonAdmin] = useState("");

  const [
    adminClickSpecificTaskCoressTaskFetch,
    setAdminClickSpecificTaskCoressTaskFetch,
  ] = useState([]);

  const [totalTaskProject, setTotalTaskProject] = useState("");

  const [completedTaskProject, setCompletedTaskProject] = useState("");

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

  const accessAllProjectsToAdmin = () => {
    const API = axios.create({ baseURL: "http://localhost:5000" });
    API.get(`/tasks/admin/allprojects/${UUU._id}`)
      .then((res) => {
        // setTeamUserList(res.data);

        setAccessAllProjectToAdmin(res.data);
        // setLoading(false);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllTeamsByAdmin();
    accessAllProjectsToAdmin();
  }, []);

  // console.log(adminAllTeams);

  const deletedAdminToTeamLeadr = (event) => {
    const desc = adminAllTeams.filter(
      (each) => each._id === event.currentTarget.id
    );
    console.log(desc);
    setDeletedTeams(desc[0]);
    setAdminDeleteModal(true);
  };

  const adminChangeTeam = (e) => {
    setSelectedDropDwonAdmin(e.target.value);
  };

  const valuesFilter = accessAllProjectToAdmin.filter(
    (each) => each.status === selectedDropDwonAdmin
  );

  const fetchTheOneOfTask = (id) => {
    const API = axios.create({ baseURL: "http://localhost:5000" });
    const sss = {
      project_id: id,
    };

    API.post("/tasks/admin/project/idbase", sss)
      .then((res) => {
        // setTeamUserList(res.data);

        setAdminClickSpecificTaskCoressTaskFetch(res.data);
        //setLoading(false);
      })

      .catch((e) => {
        console.log(e);
      });
  };
  console.log(adminClickSpecificTaskCoressTaskFetch);

  // adminClickSpecificTaskCoressTaskFetch?.shift();

  let newArray = adminClickSpecificTaskCoressTaskFetch.slice(1);

  console.log(newArray);

  const newArrayLength = newArray.length;

  const filterPieValue = newArray?.filter(
    (each) => each.status === "completed"
  );

  // console.log(newArrayLength);

  // console.log(filterPieValue.length);

  // if (newArrayLength && filterPieValue) {
  //   setTotalTaskProject(newArrayLength);
  //   setCompletedTaskProject(filterPieValue.length);
  // }

  // console.log(totalTaskProject);

  // console.log(completedTaskProject);

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
              {adminAllTeams.map((each, index) => (
                <div className="admin-employess-s-container" key={index}>
                  <img
                    className="admin-employee-images-card"
                    src={each.profilePic}
                  />
                  <div className="admin-team-delete">
                    <RiDeleteBin5Line
                      id={each._id}
                      onClick={deletedAdminToTeamLeadr}
                    />
                  </div>
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

          {/* all projects list show container */}

          {/* {newArrayLength.length !== 0 && (
            <div>
              <p>
                Total task
                <span>{newArrayLength}</span>
              </p>
              <p>
                completed task
                <span>{filterPieValue.length}</span>
              </p>
            </div>
          )} */}

          {accessAllProjectToAdmin.length !== 0 && (
            <div className="selectAdminChangeValue">
              <div style={{ width: "40%" }}>
                {newArrayLength.length !== 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <p
                      style={{
                        color: "#cec5b6",
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      Total task
                      <span className="admin-project-count">
                        {newArrayLength}
                      </span>
                    </p>
                    <p
                      style={{
                        color: "#cec5b6",
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      completed task
                      <span className="admin-project-count">
                        {filterPieValue.length}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <div className="selected dropdown">
                <select onChange={adminChangeTeam}>
                  <option disabled selected hidden>
                    Please select status
                  </option>
                  {taskStatus.map((each, index) => (
                    <option key={index}>{each}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div>
            {/* {valuesFilter.length !== 0()} */}

            {valuesFilter.length !== 0 && (
              <table className="content-table ee">
                <thead>
                  <tr>
                    <th>ProjectId</th>
                    <th>ProjectName</th>
                    <th>UserName</th>
                    <th>CreateDate</th>
                    {/* <th>Update Date</th> */}
                    <th>Expert Date</th>
                    {/* <th>ActualComDate</th>
                  <th>ActualExptDate</th> */}
                    <th>Status</th>
                    {/* <th>Details & Edit</th> */}
                  </tr>
                </thead>
                <tbody>
                  {valuesFilter.map((each, index) => (
                    <tr
                      key={index}
                      // onClick={() =>
                      //   getTeamTaskCalHour(
                      //     each.createdate,
                      //     each.date,
                      //     // each.status === "completed" ? each.updatedAt : "",
                      //     each.project_id,
                      //     each.actualComDate && each.actualComDate,
                      //     each.actualExptDate && each.actualExptDate
                      //   )
                      // }
                      onClick={() => fetchTheOneOfTask(each.project_id)}
                    >
                      <td>{each.project_id}</td>
                      <td>{each.task}</td>
                      <td>{each.username}</td>
                      <td>{each.createdate}</td>
                      {/* <td>{each.updatedAt.slice(0, 10)}</td> */}
                      <td>{each.date}</td>
                      {/* <td>{each.actualComDate}</td>
                    <td>{each.actualExptDate}</td> */}
                      <td>
                        <div
                          style={{
                            backgroundColor:
                              each.status === "completed"
                                ? "#0e8214" //"#14e610"
                                : each.status === "In-completed"
                                ? "#b52134"
                                : "#b8ad14",
                            fontSize: "16px",
                            fontWeight: 400,
                            padding: "2px",
                            color: "#ffffff",
                            paddingLeft: "19px",
                            borderTopRightRadius: "10px",
                            borderBottomRightRadius: "10px",
                            borderTopLeftRadius: "7px",
                          }}
                        >
                          {each.status}
                        </div>
                      </td>
                      {/* <td>
                    <BiDetail id={each._id} onClick={detailsAndModel} />
                    {UUU.role !== "admin" ? (
                      <button
                        id={each._id}
                        onClick={editAndModel}
                        disabled={each.status === "completed"}
                        style={{
                          background: "transparent",
                          border: "none",
                          width: "fit-content",
                        }}
                      >
                        <FiEdit
                          // id={each._id}
                          // onClick={editAndModel}
                          style={{ marginLeft: "50px" }}
                        />
                      </button>
                    ) : (
                      <>
                        <RiDeleteBinLine
                          id={each._id}
                          style={{ margin: "0px 18px" }}
                          onClick={teamDeleteTaskFromId}
                        />
                        <FiEdit
                          id={each._id}
                          onClick={adminClickEditAccDateSet}
                          // style={{ marginLeft: "50px" }}
                        />
                      </>
                    )}
                  </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* all projects list show container end */}
        </div>
      </div>

      {/* modal */}
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
      <AdminDeleteTeamsModal
        setAdminDeleteModal={setAdminDeleteModal}
        deletedTeams={deletedTeams}
        adminDeleteModal={adminDeleteModal}
        getAllTeamsByAdmin={getAllTeamsByAdmin}
      />
    </>
  );
};

export default Admin;
