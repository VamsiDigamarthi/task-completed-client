import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import "./index.css";
import EmployeAddModal from "../EmployeAddModal";
import SideBar from "../SideBar";
import Header from "../Header";
import { useSelector } from "react-redux";
import axios from "axios";
import AddUserTeamModal from "../AddUserTeamModal";
import TeamLeadTaska from "../TeamLeadTasks";
import { AiOutlineDelete } from "react-icons/ai";
import TeamDeleteTaskModal from "../TeamDeleteTaskModal";

const Teams = () => {
  // teams leader states
  //
  //

  const [addUserModal, setAddUserModal] = useState(false);

  const [taskAddModal, setTaskAddModal] = useState(false);

  // team leader all employess state
  const [teamUserList, setTeamUserList] = useState([]);

  // employess all task state variable
  const [teamAllTask, setTeamAllTask] = useState([]);

  // team leader task state variable
  const [teamLeaderTask, setTeamLeaderTask] = useState([]);

  //
  const [teamDeleteTask, setTeamDeleteTask] = useState(false);

  const [deletedTaskDetails, setDeletedTaskDetails] = useState("");

  //
  //
  //
  // teams leader end states variables
  //
  // =======================================================================
  //
  // admin state variable start container
  //
  //

  // admin change drop down to fetch corresponding task fetch
  const [adminChangeTeamValue, setAdminChangeTeamValue] = useState("");

  const [adminTeams, setAdminTeams] = useState([]);

  const [adminGetOneTeam, setAdminGetOneTeam] = useState([]);

  //
  //
  // admin state variable end container
  //
  //  ==================================================================================

  // pagination start container
  //
  //
  const [currentPage, setCurrentPage] = useState(0);

  const [pageSize, setPageSize] = useState(2);

  const [currentItems, setCurrentItems] = useState(
    teamUserList.slice(0, pageSize)
  );

  const onPage = (index) => {
    setCurrentPage(index);
    let cuurentItem = teamUserList.slice(
      index * pageSize,
      pageSize * (index + 1)
    );
    setCurrentItems(cuurentItem);
  };
  //
  //
  // pagination end container
  // ===========================================================================================
  const UUU = useSelector((state) => state.authReducer.authData);

  // const teamUserAccess = { role: UUU.role };

  const teamUserAccess =
    UUU.role === "admin" ? { role: adminChangeTeamValue } : { role: UUU.role };

  const adminAndTams =
    UUU.role === "admin" ? { role: adminChangeTeamValue } : { role: UUU.role };
  //
  // ========================------------==================================--------------------------========
  // by click the employee corresponding task loaded apis start
  //
  //
  //

  const getTeamOfTeaks = async (n) => {
    const role = { name: n };
    const API = axios.create({ baseURL: "http://localhost:5000" });
    API.post("/tasks/employee", role)
      .then((res) => {
        setTeamAllTask(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getData = (n) => {
    getTeamOfTeaks(n);
  };

  //
  //
  //
  // by click the employee corresponding task loaded apis end
  //
  // ==========================================================================
  //
  // calculate the task percentage start container
  //
  //
  let loaderValue = 0;

  const filtee = teamAllTask.filter((each) => each.status === "completed");

  const compl = Math.round((filtee.length / teamAllTask.length) * 100);

  if (compl >= 0) {
    loaderValue = compl;
  } else {
    loaderValue = 0;
  }

  //
  //
  // calculate the task percentage start container
  //
  // ===============================================================================
  //
  // admin change dropdown corresponding teams display start
  //
  //

  const adminChangeTeam = (e) => {
    setAdminChangeTeamValue(e.target.value);
  };

  //
  //
  // admin change dropdown corresponding teams display end

  // team leader all employess get api call start container
  //
  //
  //

  const getTeamOfEmployee = async () => {
    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.post("/team/user", teamUserAccess)
      .then((res) => {
        setTeamUserList(res.data);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  //
  //
  //
  // team leader all employees get api call end container
  // -------------------------------------------------------------------------------
  // get team leader all task fetch api start container
  //
  //
  //

  const getUserTask = async () => {
    const userName = { name: UUU.name };

    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.post("/tasks/employee", userName)
      .then((res) => {
        setTeamLeaderTask(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //
  //
  //
  // get team leader all task fetch api start container
  // -------------------------------------------------------------------------------------

  const teamDeleteTaskFromId = (e) => {
    const deleteTask = teamAllTask.filter(
      (each) => each._id === e.currentTarget.id
    );
    setTeamDeleteTask(true);
    setDeletedTaskDetails(deleteTask[0]);
  };

  useEffect(() => {
    const getVVVaa = () => {
      if (UUU.role === "admin" && adminGetOneTeam.length !== 0) {
        const nameValue = adminGetOneTeam[0];
        const { name } = nameValue;
        console.log(nameValue);
        console.log(name);
        const userName =
          UUU.role === "admin" ? { name: name } : { name: UUU.name };
        const API = axios.create({ baseURL: "http://localhost:5000" });
        API.post("/tasks/employee", userName)
          .then((res) => {
            setTeamLeaderTask(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    getVVVaa();
  }, [adminGetOneTeam]);

  useEffect(() => {
    getTeamOfEmployee();

    // getTeamOfTeaks();

    if (UUU.role === "admin") {
      const adminrole = { role: UUU.role };

      const getAllTeamsByAdmin = () => {
        const API = axios.create({ baseURL: "http://localhost:5000" });

        API.post("/team/user", adminrole)
          .then((res) => {
            setAdminTeams(res.data);
          })

          .catch((e) => {
            console.log(e);
          });
      };

      getAllTeamsByAdmin();
    }

    // api call fetch teams leader data
    const getOneTeamLeader = () => {
      const API = axios.create({ baseURL: "http://localhost:5000" });

      API.post("/team/oneteamleader", adminAndTams)
        .then((res) => {
          setAdminGetOneTeam(res.data);
        })

        .catch((e) => {
          console.log(e);
        });
    };
    getOneTeamLeader();

    getUserTask();

    // api call fetch team leader data end
  }, [adminChangeTeamValue]);

  const v = Math.ceil(teamUserList.length / pageSize);

  console.log(deletedTaskDetails);

  return (
    <div className="teams">
      <div className="side-bar-t">
        <SideBar />
      </div>
      <div className="right-side-team">
        <div className="team-header">
          <Header />
        </div>
        <div className="team-right-side-container">
          {/* login user details container start */}
          <div className="team-leade-container">
            <div>
              <h2 style={{ color: "#44e3db" }}>
                {UUU.name.charAt(0).toUpperCase() + UUU.name.slice(1)}
              </h2>
              <p style={{ color: "#d6385d" }}>Welcome to Dash Board</p>
            </div>

            {UUU.role === "admin" ? (
              <div className="selected">
                <select onChange={adminChangeTeam}>
                  <option disabled selected hidden>
                    Please select team
                  </option>
                  {adminTeams.map((each) => (
                    <option>{each.role}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="team-add-user-container">
                <div>
                  <button
                    onClick={() => setAddUserModal(true)}
                    className="add-user-btn"
                  >
                    Add User
                  </button>
                </div>
                <button className="add-task-button">
                  <button onClick={() => setTaskAddModal(true)}>
                    Add User Task
                  </button>
                </button>
              </div>
            )}
          </div>
          {/* login user details container end */}
          {/* add team leaders */}
          {/* login admin show the team leader details start container */}
          {adminChangeTeamValue && (
            <div className="admin-teams-con">
              {adminGetOneTeam.map((each) => (
                <li className="team-card-inadmin">
                  <div className="user-details-container">
                    <h3 className="team-name">
                      Team Leader{" "}
                      <span>
                        {each.name.charAt(0).toUpperCase() + each.name.slice(1)}
                      </span>
                    </h3>
                    <p className="user-designation">Designation {each.role}</p>
                  </div>
                  <img
                    src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                    className="admin-team-image"
                    alt="avatar"
                  />
                </li>
              ))}
            </div>
          )}

          {/* login admin show the team leader details end container */}

          {/* show team leader task  collapss container */}
          {teamLeaderTask.length !== 0 && (
            <div className="team-leader-task-collaps">
              <TeamLeadTaska
                teamLeaderTask={teamLeaderTask}
                getUserTask={getUserTask}
              />
            </div>
          )}

          {/* show team leader task  collapss container */}

          {/* add team leader end */}
          <div className="user-and-loader">
            {/* all employee profiles start container */}
            <div className="user-and-2">
              <ul className="ul-container">
                {/* page count user list add */}
                {currentItems.map((i, index) => (
                  <li
                    className="user-card-container"
                    onClick={() => getData(i.name)}
                  >
                    <img
                      src="./images/photo-1494790108377-be9c29b29330.jpg"
                      className="avatar"
                      alt="avatar"
                    />
                    <div className="user-details-container">
                      <h3 className="user-name">
                        {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                      </h3>
                      <p className="user-designation"> software developer </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div>
                <button
                  className="prev-btn"
                  onClick={() => onPage(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  prev
                </button>
                {Array(v)
                  .fill(null)
                  .map((page, index) => (
                    <button
                      className="number-btn"
                      onClick={() => onPage(index)}
                      key={index}
                    >
                      {index + 1}
                    </button>
                  ))}
                <button
                  onClick={() => onPage(currentPage + 1)}
                  disabled={currentPage === v - 1}
                  className="prev-btn"
                >
                  next
                </button>
              </div>
            </div>
            {/* all employee profiles end container */}
            {/* // employeee calculate loader start container */}
            {teamAllTask.length !== 0 && (
              <div className="loder-container">
                <div className="card">
                  <div
                    className="percent"
                    style={{
                      "--clr": "#04fc43",
                      "--num": loaderValue,
                    }}
                  >
                    <div className="dot"></div>
                    <svg>
                      <circle cx="70" cy="70" r="70"></circle>
                      <circle cx="70" cy="70" r="70"></circle>
                    </svg>
                    <div className="number">
                      <h3 style={{ color: "#d6385d" }}>
                        {loaderValue}
                        <span>%</span>
                      </h3>
                      <p>tasks</p>
                    </div>
                  </div>
                </div>
              </div>
              // employeee calculate loader end container
            )}
          </div>
          {/* employee all task by click employee image start container */}
          {teamAllTask.length !== 0 ? (
            <>
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Create</th>
                    <th>Update</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {teamAllTask.map((each) => (
                    <tr>
                      <td>{each.task}</td>
                      <td>{each.createdAt}</td>
                      <td>{each.updatedAt}</td>
                      <td>
                        <div
                          style={{
                            backgroundColor:
                              each.status === "completed"
                                ? "#b1f26f"
                                : "#ff9cc5",
                            // ? "#14e610"

                            // : "#f53858",
                            fontSize: "16px",
                            fontWeight: 400,
                            padding: "2px",
                            color: "#ffffff",
                            paddingLeft: "19px",
                            borderTopRightRadius: "10px",
                            borderBottomRightRadius: "10px",
                          }}
                        >
                          {each.status}
                        </div>
                      </td>
                      <td>
                        <BiDetail id={each._id} />
                        <AiOutlineDelete
                          id={each._id}
                          style={{ margin: "0px 18px" }}
                          onClick={teamDeleteTaskFromId}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            ""
          )}
          {/* employee all task end container */}

          {/* details and edit modals start container */}
          <EmployeAddModal
            taskAddModal={taskAddModal}
            setTaskAddModal={setTaskAddModal}
            teamUserList={teamUserList}
            getTeamOfTeaks={getTeamOfTeaks}
          />
          <AddUserTeamModal
            addUserModal={addUserModal}
            setAddUserModal={setAddUserModal}
            getTeamOfEmployee={getTeamOfEmployee}
          />
          <TeamDeleteTaskModal
            setTeamDeleteTask={setTeamDeleteTask}
            teamDeleteTask={teamDeleteTask}
            deletedTaskDetails={deletedTaskDetails}
            getTeamOfTeaks={getTeamOfTeaks}
          />
          {/* details and edit modal end container */}
        </div>
      </div>
    </div>
  );
};

export default Teams;
