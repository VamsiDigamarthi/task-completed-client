import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import "./index.css";
import EmployeAddModal from "../EmployeAddModal";
import SideBar from "../SideBar";
import Header from "../Header";
import { useSelector } from "react-redux";
import axios from "axios";
import AddUserTeamModal from "../AddUserTeamModal";
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

  // add User modal state

  const [addUserModal, setAddUserModal] = useState(false);

  const [adminChangeTeamValue, setAdminChangeTeamValue] = useState("");

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

  // const getData = (n) => {
  //   const filterTask = teamAllTask.filter((each) => each.username === n);
  //   console.log(filterTask);
  //   setFilterUser(filterTask);
  // };

  let loaderValue = 0;

  const filtee = teamAllTask.filter((each) => each.status === "completed");

  const compl = Math.round((filtee.length / teamAllTask.length) * 100);

  console.log(compl);

  if (compl >= 0) {
    loaderValue = compl;
  } else {
    loaderValue = 0;
  }

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

  useEffect(() => {
    getTeamOfEmployee();
    // getTeamOfTeaks();
  }, [adminChangeTeamValue]);

  // console.log(teamAllTask);
  const [pageCount, setPageCount] = useState(
    Math.ceil(teamUserList.length / pageSize)
  );
  console.log(teamUserList);

  const v = Math.ceil(teamUserList.length / pageSize);

  console.log(v);

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
                  <option>software team</option>
                  <option>market team</option>
                  <option>Team3</option>
                  <option>Team4</option>
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
                  onClick={() => onPage(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  prev
                </button>
                {Array(v)
                  .fill(null)
                  .map((page, index) => (
                    <button onClick={() => onPage(index)} key={index}>
                      {index + 1}
                    </button>
                  ))}
                <button
                  onClick={() => onPage(currentPage + 1)}
                  disabled={currentPage === v - 1}
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
                    <th>Date</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {teamAllTask.map((each) => (
                    <tr>
                      <td>{each.task}</td>
                      <td>{each.createdAt}</td>
                      <td>{each.status}</td>
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
