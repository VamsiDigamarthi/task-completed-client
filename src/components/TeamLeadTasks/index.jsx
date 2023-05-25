import { useCollapse } from "react-collapsed";
import { BiDetail } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import "./index.css";
import { useEffect, useState } from "react";
import UserModal from "../UserModal";
import UserEditModal from "../UserEditModal";
import { useSelector } from "react-redux";
import { RiContactsBookLine, RiDeleteBinLine } from "react-icons/ri";
import TeamDeleteTaskModal from "../TeamDeleteTaskModal";
import ReactApexChart from "react-apexcharts";

import { AiOutlineDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";

import axios from "axios";
import TimerAllDetailsModal from "../TimerAllDetailsModal/TimerAllDetailsModal";

function TeamLeadTaska({ teamLeaderTask, getUserTask }) {
  const UUU = useSelector((state) => state.authReducer.authData);

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState("");

  const [editModal, setEditModal] = useState(false);

  const [editUserTask, setEditUserTask] = useState([]);

  const [teamDeleteTask, setTeamDeleteTask] = useState(false);

  const [deletedTaskDetails, setDeletedTaskDetails] = useState("");

  const [totalCalHour, setTotalCalHour] = useState("");

  const [completedHour, setCompletedHour] = useState("");

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  // user list based on select project click

  const [userListBasedOnProjectClick, setUserListBasedOnProjectClick] =
    useState([]);

  const [teamAllTask, setTeamAllTask] = useState([]);

  // const [teamDeleteTask, setTeamDeleteTask] = useState(false);

  // const [deletedTaskDetails, setDeletedTaskDetails] = useState("");

  //this state value store in times based on employee task click

  const [timerStoreEmployeeTask, setTimerStoreEmployeeTask] = useState([]);

  const [timeValuesCalProject, setTimeValuesCalProject] = useState([]);

  const [timerModal, setTimerModal] = useState(false);

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  //description modal state

  const [options, setOptions] = useState({
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
      },
    },
    grid: {
      padding: {
        bottom: -80,
      },
    },
    labels: ["Completed", "Incompleted"],
    colors: ["#0a5c0d", "#b52134"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const [update, setUpdate] = useState([44, 55]);

  const allCalculation = () => {
    const filterPieValue = teamAllTask.filter(
      (each) => each.status === "completed"
    );
    const compl = (filterPieValue.length / teamAllTask.length) * 100;
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
    allCalculation();
  }, [teamAllTask]);

  const detailsAndModels = (event) => {
    const desc = teamAllTask.filter(
      (each) => each._id === event.currentTarget.id
    );
    //console.log(desc[0].description);
    setDescription(desc[0].description);
    setModal(true);
  };

  // delete task

  const teamDeleteTaskFromIds = (e) => {
    const deleteTask = teamAllTask.filter(
      (each) => each._id === e.currentTarget.id
    );
    setTeamDeleteTask(true);
    setDeletedTaskDetails(deleteTask[0]);
  };

  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

  const detailsAndModel = (event) => {
    const desc = teamLeaderTask.filter(
      (each) => each._id === event.currentTarget.id
    );
    //console.log(desc[0].description);
    setDescription(desc[0].description);
    setModal(true);
  };

  const editAndModel = (e) => {
    const edit = teamLeaderTask.filter(
      (each) => each._id === e.currentTarget.id
    );

    setEditUserTask(edit);
    setEditModal(true);
  };

  const teamDeleteTaskFromId = (e) => {
    const deleteTask = teamLeaderTask.filter(
      (each) => each._id === e.currentTarget.id
    );
    //console.log(deleteTask);
    setTeamDeleteTask(true);
    setDeletedTaskDetails(deleteTask[0]);
    // setDeletedTaskDetails(deleteTask[0]);
  };

  const basedOnProjectUserGet = (id) => {
    const API = axios.create({ baseURL: "http://localhost:5000" });
    API.get(`auth/project/click/user/${id}`)
      .then((res) => {
        //setTeamUserList(res.data);
        console.log(res.data);
        setUserListBasedOnProjectClick(res.data);
        setTeamAllTask([]);
        //res.data;
      })

      .catch((e) => {
        console.log(e);
      });
  };

  const basedOnProjectClickCorreTimerGet = (id) => {
    const API = axios.create({ baseURL: "http://localhost:5000" });
    API.get(`/time/value/${id}`)
      .then((res) => {
        //setTeamUserList(res.data);
        console.log(res.data);
        setTimeValuesCalProject(res.data);
      })

      .catch((e) => {
        console.log(e);
      });
  };

  let timerAllValue = 0;

  timeValuesCalProject?.forEach((each) => {
    if (each.timer.split("-")[0] === "R") {
      let www = each.timer.split("-")[1];

      timerAllValue = timerAllValue + parseInt(www);
    } else {
      const eeee = parseInt(each.timer);

      timerAllValue = timerAllValue + parseInt(eeee);
    }
  });

  const getTeamTaskCalHour = (create, up, id) => {
    setTotalCalHour("");
    setCompletedHour("");
    setTimerStoreEmployeeTask([]);
    basedOnProjectUserGet(id);
    basedOnProjectClickCorreTimerGet(id);
    // console.log(r, p);
    const date1 = new Date(create).getTime();
    const date2 = new Date(up).getTime();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setTotalCalHour(diffDays * 8);
  };

  const getTeamOfTeaks = async (n) => {
    const role = { username: n };
    const API = axios.create({ baseURL: "http://localhost:5000" });
    // API.post("/tasks/employee", role)
    //   .then((res) => {
    //     setTeamAllTask(res.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    //const API = axios.create({ baseURL: "http://localhost:5000" });
    API.post("/tasks/teamleader/task", role)
      .then((res) => {
        setTeamAllTask(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getData = (n) => {
    //console.log(`===${n}`);
    getTeamOfTeaks(n);
    // setClickUserHighletColor(true);
    // setClickUserHighletColorByName(n);
    // setTotalCalHour("");
    // setCompletedHour("");
  };

  // ftech the timer based on employee task

  const fetchTheTimersBasedOnTask = (id) => {
    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.get(`/time/taskvalue/${id}`)
      .then((res) => {
        // console.log(res.data);
        setTimerStoreEmployeeTask(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //console.log(userListBasedOnProjectClick);

  //console.log(teamAllTask);

  const timerModalDetails = () => {
    setTimerModal(true);
  };

  console.log(timerStoreEmployeeTask);

  console.log(`value ${timerAllValue}`);

  return (
    <div className="TeamLeadTaska">
      <div className="header" {...getToggleProps()}>
        {isExpanded ? "Close Your Projects" : "Show Your Projects"}
      </div>
      {/* <div> */}
      <div {...getCollapseProps()}>
        <div className="content">
          <table className="content-table">
            <thead>
              <tr>
                <th>ProjectId</th>
                <th>ProjectName</th>
                <th>CreateDate</th>
                <th>Update Date</th>
                <th>Expert Date</th>
                <th>Status</th>
                <th>Details & Edit</th>
              </tr>
            </thead>
            <tbody>
              {teamLeaderTask.map((each, index) => (
                <tr
                  key={index}
                  onClick={() =>
                    getTeamTaskCalHour(
                      each.createdate,
                      each.date,
                      // each.status === "completed" ? each.updatedAt : "",
                      each.project_id
                    )
                  }
                >
                  <td>{each.project_id}</td>
                  <td>{each.task}</td>
                  <td>{each.createdate}</td>
                  <td>{each.updatedAt.slice(0, 10)}</td>
                  <td>{each.date}</td>
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
                  <td>
                    <BiDetail id={each._id} onClick={detailsAndModel} />
                    {UUU.role !== "admin" ? (
                      <FiEdit
                        id={each._id}
                        onClick={editAndModel}
                        style={{ marginLeft: "50px" }}
                      />
                    ) : (
                      <RiDeleteBinLine
                        id={each._id}
                        style={{ margin: "0px 18px" }}
                        onClick={teamDeleteTaskFromId}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalCalHour && (
            <>
              <div>
                <p>Total Hours : {totalCalHour}</p>
                <p>Completed Hours : {timerAllValue}</p>
              </div>
              <div>
                <GrView onClick={timerModalDetails} />
              </div>
            </>
          )}

          <UserModal
            modal={modal}
            setModal={setModal}
            datilsTask={description}
          />
          {editModal && (
            <UserEditModal
              editModal={editModal}
              setEditModal={setEditModal}
              editUserTask={editUserTask[0]._id}
              getUserTask={getUserTask}
            />
          )}
          <TeamDeleteTaskModal
            setTeamDeleteTask={setTeamDeleteTask}
            teamDeleteTask={teamDeleteTask}
            deletedTaskDetails={deletedTaskDetails}
            // getTeamOfTeaks={getTeamOfTeaks}
            getUserTask={getUserTask}
          />
          <TimerAllDetailsModal
            timerModal={timerModal}
            setTimerModal={setTimerModal}
            timeValuesCalProject={timeValuesCalProject}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {userListBasedOnProjectClick.length !== 0 && (
            <ul className="ul-container new-ul-user-list-container">
              {/* page count user list add */}
              {userListBasedOnProjectClick.map((i, index) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <li
                    key={index}
                    className="user-card-container"
                    onClick={() => getData(i.username)}
                    // style={{
                    //   backgroundColor:
                    //     clickUserHighletColorByName === i.name &&
                    //     clickUserHighletColor &&
                    //     "#edeceb",
                    //   borderRadius:
                    //     clickUserHighletColorByName === i.name &&
                    //     clickUserHighletColor &&
                    //     "3px",
                    // }}
                  >
                    <img
                      src={i.profilePic} //"./images/photo-1494790108377-be9c29b29330.jpg"
                      className="avatar"
                      alt="avatar"
                    />
                    <div className="user-details-container">
                      <h3 className="user-name">
                        {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                      </h3>
                      <p className="user-designation"> {i.designation} </p>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          )}
          {timerStoreEmployeeTask.length !== 0 && (
            <div>
              {timerStoreEmployeeTask.map((each) => (
                <div>
                  <p>
                    Total Hours : <span>{each.totalHour}</span>
                  </p>
                  {each.timer.split("-")[0] === "R" ? (
                    <p>
                      Running Hour : <span>{each.timer.split("-")[1]}</span>
                    </p>
                  ) : (
                    <p>
                      Completed Hours : <span>{each.timer}</span>{" "}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          <div>
            {teamAllTask.length !== 0 && (
              <ReactApexChart
                options={options}
                series={update}
                type="donut"
                width="400"
                // style={{ position: "fixed" }}
              />
            )}
          </div>
        </div>
        <div></div>
        <div className="user-task-container">
          {teamAllTask.length !== 0 && (
            <table className="content-table">
              <thead>
                <tr>
                  <th>ProjectId</th>
                  <th>Task</th>
                  <th>Create</th>
                  <th>Update</th>
                  <th>Expert Date</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {teamAllTask.map((each) => (
                  <tr onClick={() => fetchTheTimersBasedOnTask(each._id)}>
                    <td>{each.project_id}</td>
                    <td>{each.task}</td>
                    <td>{each.createdate}</td>
                    <td>{each.updatedAt.slice(0, 10)}</td>
                    <td>{each.date}</td>
                    <td>
                      <div
                        style={{
                          backgroundColor:
                            each.status === "completed"
                              ? "#0a5c0d" //"#14e610"
                              : each.status === "In-completed"
                              ? "#b52134"
                              : "#b8ad14",
                          // ? "#14e610"

                          // : "#f53858",
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
                        onClick={detailsAndModels}
                        style={{ cursor: "pointer" }}
                      />
                      <AiOutlineDelete
                        id={each._id}
                        style={{ margin: "0px 18px" }}
                        onClick={teamDeleteTaskFromIds}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamLeadTaska;
