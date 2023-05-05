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
// const u = [
//   {
//     name: "ravi",
//     image:
//       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
//   },
//   {
//     name: "vamsi",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO1Fc5vaHDmiu5H6nUaxUvSQ7zOeNtdu1nUM1qECs&s",
//   },
//   {
//     name: "mani",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80",
//   },
//   {
//     name: "akhil",
//     image:
//       "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
//   },
//   {
//     name: "sha",
//     image:
//       "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
//   },
// ];

// const tasks = [
//   {
//     task: "project",
//     date: "11/2/2023",
//     name: "ravi",
//     status: "completed",
//   },
//   {
//     task: "project-1",
//     date: "11/2/2023",
//     name: "ravi",
//     status: "incompleted",
//   },
//   {
//     task: "project-2",
//     date: "11/2/2023",
//     name: "ravi",
//     status: "completed",
//   },
//   {
//     task: "project-3",
//     date: "11/2/2023",
//     name: "ravi",
//     status: "in-completed",
//   },
//   {
//     task: "project-4",
//     date: "11/2/2023",
//     name: "ravi",
//     status: "completed",
//   },
//   {
//     task: "project-1",
//     date: "11/2/2023",
//     name: "vamsi",
//     status: "incompleted",
//   },
//   {
//     task: "project-2",
//     date: "11/2/2023",
//     name: "vamsi",
//     status: "incompleted",
//   },
//   {
//     task: "project-3",
//     date: "11/2/2023",
//     name: "vamsi",
//     status: "completed",
//   },
//   {
//     task: "project-1",
//     date: "11/2/2023",
//     name: "akhil",
//     status: "completed",
//   },
//   {
//     task: "project-2",
//     date: "11/2/2023",
//     name: "akhil",
//     status: "incompleted",
//   },
//   {
//     task: "project-3",
//     date: "11/2/2023",
//     name: "akhil",
//     status: "incompleted",
//   },
//   {
//     task: "project-5",
//     date: "11/2/2023",
//     name: "akhil",
//     status: "completed",
//   },
//   {
//     task: "project-1",
//     date: "11/2/2023",
//     name: "mani",
//     status: "completed",
//   },
//   {
//     task: "project-2",
//     date: "11/2/2023",
//     name: "mani",
//     status: "incompleted",
//   },
// ];

const Teams = () => {
  // const [filterUser, setFilterUser] = useState([]);
  const [taskAddModal, setTaskAddModal] = useState(false);
  const [teamUserList, setTeamUserList] = useState([]);
  const [teamAllTask, setTeamAllTask] = useState([]);

  const [adminTeams, setAdminTeams] = useState([]);

  // add User modal state

  const [addUserModal, setAddUserModal] = useState(false);

  const [adminChangeTeamValue, setAdminChangeTeamValue] = useState("");

  // teams leader details array

  const [adminGetOneTeam, setAdminGetOneTeam] = useState([]);

  const [teamLeaderTask, setTeamLeaderTask] = useState([]);

  // team leader details array

  // const a = {};

  // pagination start
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

  // pagination end

  const UUU = useSelector((state) => state.authReducer.authData);

  // const teamUserAccess = { role: UUU.role };

  const teamUserAccess =
    UUU.role === "admin" ? { role: adminChangeTeamValue } : { role: UUU.role };

  const adminAndTams =
    UUU.role === "admin" ? { role: adminChangeTeamValue } : { role: UUU.role };

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

  let loaderValue = 0;

  const filtee = teamAllTask.filter((each) => each.status === "completed");

  const compl = Math.round((filtee.length / teamAllTask.length) * 100);

  // console.log(compl);

  if (compl >= 0) {
    loaderValue = compl;
  } else {
    loaderValue = 0;
  }

  // const getOneTeamLeader = () => {
  //   const API = axios.create({ baseURL: "http://localhost:5000" });

  //   API.post("/team/oneteamleader", teamUserAccess)
  //     .then((res) => {
  //       // setTeamUserList(res.data);
  //       // setAdminTeams(res.data);
  //       setAdminGetOneTeam(res.data);
  //     })

  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const adminChangeTeam = (e) => {
    setAdminChangeTeamValue(e.target.value);
    // getOneTeamLeader();
  };

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

  // get team leader tasks start

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

  // get team leader tasks end

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

  // console.log(teamAllTask);
  // const [pageCount, setPageCount] = useState(
  //   Math.ceil(teamUserList.length / pageSize)
  // );
  // console.log(teamUserList);

  const v = Math.ceil(teamUserList.length / pageSize);

  // console.log(adminTeams);

  // console.log(v);

  // console.log(adminGetOneTeam);

  // console.log(teamLeaderTask);

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

          {/* show team leader task */}
          {teamLeaderTask.length !== 0 && (
            <div className="team-leader-task-collaps">
              <TeamLeadTaska
                teamLeaderTask={teamLeaderTask}
                getUserTask={getUserTask}
              />
            </div>
          )}

          {/* show team leader task */}

          {/* add team leader end */}
          <div className="user-and-loader">
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
            )}
          </div>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            ""
          )}
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
        </div>
      </div>
    </div>
  );
};

export default Teams;
