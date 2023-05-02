import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import "./index.css";
import EmployeAddModal from "../EmployeAddModal";
import SideBar from "../SideBar";
import Header from "../Header";
import { useSelector } from "react-redux";
import axios from "axios";
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
  const [filterUser, setFilterUser] = useState([]);
  const [taskAddModal, setTaskAddModal] = useState(false);
  const [teamUserList, setTeamUserList] = useState([]);
  const [teamAllTask, setTeamAllTask] = useState([]);
  const [adminChangeTeamValue, setAdminChangeTeamValue] = useState("");

  const a = {};

  const UUU = useSelector((state) => state.authReducer.authData);

  // const teamUserAccess = { role: UUU.role };

  const teamUserAccess =
    UUU.role === "admin" ? { role: adminChangeTeamValue } : { role: UUU.role };

  const getData = (n) => {
    const filterTask = teamAllTask.filter((each) => each.username === n);
    console.log(filterTask);
    setFilterUser(filterTask);
  };

  const adminChangeTeam = (e) => {
    setAdminChangeTeamValue(e.target.value);
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

  const getTeamOfTeaks = async () => {
    const API = axios.create({ baseURL: "http://localhost:5000" });
    API.post("/team/allTaskFetch", teamUserAccess)
      .then((res) => {
        setTeamAllTask(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTeamOfEmployee();
    getTeamOfTeaks();
  }, [adminChangeTeamValue]);

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
          <div className="team-leade-container">
            <div>
              <h2>{UUU.name}</h2>
              <p style={{ color: "#d6385d" }}>Welcome to Dash Board</p>
            </div>
            {UUU.role === "admin" ? (
              <div className="selected">
                <select onChange={adminChangeTeam}>
                  <option disabled selected hidden>
                    Please select team
                  </option>
                  <option>software team</option>
                  <option>market team</option>
                  <option>Team3</option>
                  <option>Team4</option>
                </select>
              </div>
            ) : (
              <button className="add-task-button">
                <button onClick={() => setTaskAddModal(true)}>
                  Add User Task
                </button>
              </button>
            )}
          </div>

          <div className="employ">
            {teamUserList.map((i, index) => (
              <div className="emp" onClick={() => getData(i.name)}>
                <div>
                  <h3 style={{ color: "#d6385d" }}>{i.name}</h3>
                  <span>no of tasks</span>
                </div>
              </div>
            ))}
          </div>
          {filterUser.length !== 0 ? (
            <>
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filterUser.map((each) => (
                    <tr>
                      <td>{each.task}</td>
                      <td>{each.date}</td>
                      <td>{each.status}</td>
                      <td>
                        <BiDetail id={each._id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <div className="loder-container">
                <div className="card">
                  <div
                    className="percent"
                    style={{
                      "--clr": "#04fc43",
                      "--num": a[filterUser.username],
                    }}
                  >
                    <div className="dot"></div>
                    <svg>
                      <circle cx="44" cy="44" r="44"></circle>
                      <circle cx="44" cy="44" r="44"></circle>
                    </svg>
                    <div className="number">
                      <h3 style={{ color: "#d6385d" }}>
                        85<span>%</span>
                      </h3>
                      <p>tasks</p>
                    </div>
                  </div>
                </div>
              </div> */}
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
        </div>
      </div>
    </div>
  );
};

export default Teams;
