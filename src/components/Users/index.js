import React, { useEffect, useState } from "react";
import "./index.css";
import { BiDetail } from "react-icons/bi";
import UserModal from "../UserModal";
import SideBar from "../SideBar";
import Header from "../Header";
import axios from "axios";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { FiEdit } from "react-icons/fi";
import UserEditModal from "../UserEditModal";
import { RiH4 } from "react-icons/ri";

const Users = () => {
  const [modal, setModal] = useState(false);
  const [userDataTask, setUserDataTask] = useState([]);

  const [editModal, setEditModal] = useState(false);

  const [editUserTask, setEditUserTask] = useState([]);

  const [update, setUpdate] = useState([]);

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //hours cal
  const [completedHour, setCompletedHour] = useState("");

  const [totalCalHour, setTotalCalHour] = useState("");

  const [timerHour, setTimerHour] = useState("");

  const [description, setDescription] = useState("");
  const [options, setOptions] = useState({
    labels: ["Completed", "Incompleted"],
    colors: ["#0a5c0d", "#b52134"], //#14e610  #f53858
  });

  const editAndModel = (e) => {
    const edit = userDataTask.filter((each) => each._id === e.currentTarget.id);

    setEditUserTask(edit);
    setEditModal(true);
  };

  const UUU = useSelector((state) => state.authReducer.authData);
  // const u = localStorage.getItem("user");

  const detailsAndModel = (event) => {
    const desc = userDataTask.filter(
      (each) => each._id === event.currentTarget.id
    );
    //console.log(desc[0].description);
    setDescription(desc[0].description);
    setModal(true);
  };

  const getUserTask = async () => {
    const userName = { username: UUU.username };
    const API = axios.create({ baseURL: "http://localhost:5000" });

    // API.post("/tasks/employee", userName)
    //   .then((res) => {
    //     setUserDataTask(res.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    console.log(userName);
    API.post("/tasks/teamleader/task", userName)
      .then((res) => {
        setUserDataTask(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const allCalculation = () => {
    const filterPieValue = userDataTask.filter(
      (each) => each.status === "completed"
    );
    const compl = (filterPieValue.length / userDataTask.length) * 100;
    if (compl === 100) {
      let a = [100, 0];
      setUpdate(a);
    } else {
      let arr = [];
      arr.push(Math.round(compl));
      arr.push(100 - Math.round(compl));
      setUpdate(arr);
    }
  };

  useEffect(() => {
    getUserTask();
  }, []);

  useEffect(() => {
    allCalculation();
  }, [userDataTask]);

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //  calculate hours task start container

  const getTeamTaskCalHour = (
    c,
    e,
    ud,
    id,
    taskid,
    task,
    username,
    actualCom,
    actualExp
  ) => {
    setTotalCalHour("");
    setCompletedHour("");
    setTimerHour("");

    let total;

    const date1 = new Date(c).getTime();
    const date2 = new Date(e).getTime();
    const date3 = new Date(ud).getTime();
    const actualDate = new Date(actualCom).getTime();
    const actualExpt = new Date(actualExp).getTime();
    //console.log(date1);
    // console.log(actualCom);
    // console.log(actualExp);
    if (actualDate && actualExpt) {
      const diffTime = Math.abs(actualExpt - actualDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      total = diffDays * 8;
    } else {
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      total = diffDays * 8;
    }

    if (date3) {
      if (actualDate) {
        console.log("djkd");
        if (date3 >= actualDate) {
          console.log("updated date big");
          const diffTime1 = Math.abs(date3 - actualDate);
          const diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
          setCompletedHour(diffDays1 * 8);
          const rr = diffDays1 * 8;
          const values = {
            projectId: id,
            taskValue: taskid,
            timer: rr,
            totalHour: total,
            taskName: task,
            userName: username,
          };

          const API = axios.create({ baseURL: "http://localhost:5000" });

          API.post("/time/value", values)
            .then((res) => {
              console.log(res.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } else {
        if (date3 >= date1) {
          const diffTime1 = Math.abs(date3 - date1);
          const diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
          setCompletedHour(diffDays1 * 8);
          const rr = diffDays1 * 8;
          const values = {
            projectId: id,
            taskValue: taskid,
            timer: rr,
            totalHour: total,
            taskName: task,
            userName: username,
          };

          const API = axios.create({ baseURL: "http://localhost:5000" });

          API.post("/time/value", values)
            .then((res) => {
              console.log(res.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    } else {
      const datess = new Date();

      if (actualCom) {
        if (datess >= actualCom) {
          const diffTime = Math.abs(datess - actualCom);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setTimerHour(diffDays * 8);

          const rr = `R-${diffDays * 8}`;
          const values = {
            projectId: id,
            taskValue: taskid,
            timer: rr,
            totalHour: total,
            taskName: task,
            userName: username,
          };

          const API = axios.create({ baseURL: "http://localhost:5000" });

          API.post("/time/value", values)
            .then((res) => {
              console.log(res.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } else {
        if (datess >= date1) {
          const diffTime = Math.abs(datess - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setTimerHour(diffDays * 8);

          const rr = `R-${diffDays * 8}`;
          const values = {
            projectId: id,
            taskValue: taskid,
            timer: rr,
            totalHour: total,
            taskName: task,
            userName: username,
          };

          const API = axios.create({ baseURL: "http://localhost:5000" });

          API.post("/time/value", values)
            .then((res) => {
              console.log(res.data);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    }

    setTotalCalHour(total);
    // console.log(id);
    // console.log(taskid);
    // console.log(task);
    // console.log(username);
  };

  return (
    <div className="users">
      <div className="blur blur-h"></div>
      <div className="side-bar">
        <SideBar />
      </div>
      <div className="right-u">
        <Header />
        <div className="user-name-container">
          <div className="employee-image-container">
            {/* <h1
              className="stroke-text"
              style={{ color: "red", fontWeight: "bold" }}
            >
              Hey
            </h1> */}
            <img className="pic-img" src={UUU.profilePic} alt="pic" />
            <div>
              <h3 className="employee-name">
                {UUU.name.charAt(0).toUpperCase() + UUU.name.slice(1)}
              </h3>
              <p>{UUU.designation}</p>
            </div>
          </div>
          {/* hour cal container */}

          <div>
            <p>
              Total Hours : <span>{totalCalHour}</span>{" "}
            </p>
            {completedHour ? (
              <p>
                Completed Hours : <span>{completedHour}</span>{" "}
              </p>
            ) : (
              <>
                <p>
                  Running Hour : <span>{timerHour}</span>
                </p>
              </>
            )}
          </div>

          {/* hours cal container end */}
          <Chart options={options} series={update} type="donut" width="300" />
        </div>
        <table className="content-table">
          <thead>
            <tr>
              <th>ProjectId</th>
              <th>Task</th>
              <th>CreateDate</th>
              <th>UpdateDate</th>
              <th>ExpertDate</th>
              <th>ActualComDate</th>
              <th>ActualComDate</th>
              <th>Status</th>
              <th>Details & Edit</th>
            </tr>
          </thead>
          <tbody>
            {userDataTask.map((each, index) => (
              <tr
                key={index}
                onClick={() =>
                  getTeamTaskCalHour(
                    each.createdate,
                    each.date,
                    each.status === "completed" ? each.updatedAt : "",
                    each.project_id,
                    each._id,
                    each.task,
                    each.username,
                    each.actualComDate ? each.actualComDate : "",
                    each.actualExptDate ? each.actualExptDate : ""
                  )
                }
              >
                <td>{each.project_id}</td>
                <td>{each.task}</td>
                <td>{each.createdAt.slice(0, 10)}</td>
                <td>{each.updatedAt.slice(0, 10)}</td>
                <td>{each.date}</td>
                <td>{each.actualComDate}</td>
                <td>{each.actualExptDate}</td>
                <td>
                  <div
                    style={{
                      backgroundColor:
                        each.status === "completed"
                          ? "#0a5c0d"
                          : each.status === "In-completed"
                          ? "#b52134"
                          : "#a8ad09",
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
                <td>
                  <BiDetail
                    id={each._id}
                    onClick={detailsAndModel}
                    style={{ cursor: "pointer" }}
                  />
                  <FiEdit
                    id={each._id}
                    onClick={editAndModel}
                    style={{ marginLeft: "50px", cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* task details modal start */}
        <UserModal modal={modal} setModal={setModal} datilsTask={description} />
        {/* task details modal end */}
        {/* task change status modal start */}
        {editModal && (
          <UserEditModal
            editModal={editModal}
            setEditModal={setEditModal}
            editUserTask={editUserTask[0]._id}
            getUserTask={getUserTask}
          />
        )}
        {/* task change status modal end */}
      </div>
    </div>
  );
};

export default Users;
