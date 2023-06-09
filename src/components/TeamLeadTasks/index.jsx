import { useCollapse } from "react-collapsed";
import { BiDetail, BiSearchAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import "./index.css";
import { useEffect, useState } from "react";
import UserModal from "../UserModal";
import UserEditModal from "../UserEditModal";
import { useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import TeamDeleteTaskModal from "../TeamDeleteTaskModal";
import ReactApexChart from "react-apexcharts";

import { AiOutlineDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";

import axios from "axios";
import TimerAllDetailsModal from "../TimerAllDetailsModal/TimerAllDetailsModal";
import ActualCreateDateModal from "../ActualCreateDateModal/ActualCreateDateModal";
import TimerChart from "../TimerChart/TimerChart";

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

  const [inputSearchValue, setInputSearchValue] = useState("");

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

  // actual completed date and actual expt date state variable

  const [actualCompletedDate, setActualCompletedDate] = useState(false);

  const [actualCompletedDateTaskDetails, setActualCompletedDateTaskDetails] =
    useState([]);

  const [searchTaskBasedOnProject, setSearchTaskBasedOnProject] = useState("");

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
        // console.log(res.data);
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

  // new added timer values
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  // timer chat calculation change and duplicates remove form fetching data table

  let timerAllValue = 0;

  let newArray = [];

  let uniqueObject = {};

  // for (let i in timeValuesCalProject) {
  //   const objTitle = timeValuesCalProject[i]["taskValue"];

  //   uniqueObject[objTitle] = timeValuesCalProject[i];
  // }

  timeValuesCalProject?.map((each, i) => {
    // if (each.timer.split("-")[1] === 0) {
    //   console.log("r is zero");
    // }
    //console.log(each.timer);
    if (each.timer?.split("-")[1] === "0") {
      console.log("jjjj");
    } else {
      const objTitle = timeValuesCalProject[i]["taskValue"];

      uniqueObject[objTitle] = timeValuesCalProject[i];
    }
  });

  for (let i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }

  newArray?.forEach((each) => {
    // filter the date in duplivates

    if (each.timer.split("-")[0] === "R") {
      let www = each.timer.split("-")[1];

      timerAllValue = timerAllValue + parseInt(www);
    } else {
      const eeee = parseInt(each.timer);

      timerAllValue = timerAllValue + parseInt(eeee);
    }
  });

  // timer chat calculation change and duplicates remove form fetching data table
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // new added timer values

  // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  // added function to calculate hours to reduce no of lines start container

  // added function to calculate hours to reduce no of lines end container
  // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

  const getTeamTaskCalHour = (
    create,
    up,
    id,
    actualComDate,
    actualExptDate
  ) => {
    setTotalCalHour("");
    setCompletedHour("");
    setTimerStoreEmployeeTask([]);
    basedOnProjectUserGet(id);
    basedOnProjectClickCorreTimerGet(id);
    // console.log(r, p);
    const date1 = new Date(create);
    const date2 = new Date(up);
    // const diffTime = Math.abs(date2 - date1);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // console.log(actualComDate);
    // console.log(actualExptDate);

    const actualStart = new Date(actualComDate);

    const actualEnd = new Date(actualExptDate);
    //console.log(actualStart);

    if (actualComDate) {
      let diff = (actualEnd.getTime() - actualStart.getTime()) / 1000;
      diff /= 60 * 60;
      let timerOfValue = Math.abs(Math.round(diff));

      if (timerOfValue < 9) {
        setTotalCalHour(timerOfValue);
      } else if (timerOfValue > 9 && timerOfValue < 24) {
        let newTotal;
        let firstNewDate = actualStart.toString().slice(0, 15);
        let newFirstValue = `${firstNewDate} 18:30`;
        let firstD = new Date(newFirstValue);

        let firstDiff = (firstD.getTime() - actualStart.getTime()) / 1000;
        firstDiff /= 60 * 60;
        let actualNewFirstValue = Math.abs(Math.round(firstDiff));

        // another second date calculations

        let secondNewDate = actualEnd.toString().slice(0, 15);
        let newSecondValue = `${secondNewDate} 9:30`;
        let secondD = new Date(newSecondValue);

        let secondDiff = (actualEnd.getTime() - secondD.getTime()) / 1000;

        secondDiff /= 60 * 60;

        let actualNewSecondValue = Math.abs(Math.round(secondDiff));

        newTotal = actualNewFirstValue + actualNewSecondValue;
        setTotalCalHour(newTotal);
        // total = newTotal;
      } else {
        // ignore sundays start container

        let currentDate = new Date(actualStart);
        let nonWorkingHours = [0];

        while (currentDate <= actualEnd) {
          if (!nonWorkingHours.includes(currentDate.getDay())) {
            console.log("not sunday");
          } else {
            // currentDate.setDate(currentDate.getDate() + 1)
            console.log("sunday");
            timerOfValue -= 24;
            //sundayCount += 1
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }

        // ignore sundays start container

        let totalHourTwinty;
        let multipleOfElight;
        let divideByTwintyFour = Math.floor(timerOfValue / 24);

        if (divideByTwintyFour < 1) {
          multipleOfElight = 0;
        } else {
          multipleOfElight = divideByTwintyFour * 9;
        }

        let reminderOfTwintyFour = timerOfValue % 24;
        // let totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
        //console.log(totalHourTwinty);

        //
        //

        if (reminderOfTwintyFour <= 9) {
          totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
          setTotalCalHour(totalHourTwinty);
        } else if (reminderOfTwintyFour > 9 && reminderOfTwintyFour < 24) {
          let previousDate1 = new Date(actualEnd);
          previousDate1.setDate(previousDate1.getDate() - 1);

          if (previousDate1.getDay() == 0) {
            previousDate1.setDate(previousDate1.getDate() - 1);
          }

          let preVTime = previousDate1.toString().slice(0, 15);

          let creatV = actualStart.toString().slice(15, 24);

          let oldValue = `${preVTime}${creatV}`;

          let oldValueNewDate = new Date(oldValue);

          let oldSecondValue = `${preVTime} 18:30:00`;

          let oldSecondNewDate = new Date(oldSecondValue);

          let secondDiffss =
            (oldValueNewDate.getTime() - oldSecondNewDate.getTime()) / 1000;

          secondDiffss /= 60 * 60;

          let actualNewSecondValuess = Math.abs(Math.round(secondDiffss));

          let morningTime = actualEnd.toString().slice(0, 15);

          let newSecondValue = `${morningTime} 9:30`;
          let secondD = new Date(newSecondValue);

          //let newValueDate = new Date();

          let secondDiff = (actualEnd.getTime() - secondD.getTime()) / 1000;

          secondDiff /= 60 * 60;

          let actualNewSecondValue = Math.abs(Math.round(secondDiff));
          totalHourTwinty =
            multipleOfElight + (actualNewSecondValue + actualNewSecondValuess);
          //console.log(actualNewSecondValue);
          setTotalCalHour(totalHourTwinty);
        } else {
          totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
          setTotalCalHour(totalHourTwinty);
        }

        //
        //

        //setTotalCalHour(totalHourTwinty);
      }

      // old calculations ------------------------------
      // const diffTime = Math.abs(actualEnd - actualStart);
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // // total = diffDays * 8;
      // console.log("is not emplty if");
      // setTotalCalHour(diffDays * 8);
    } else {
      let diff = (date2.getTime() - date1.getTime()) / 1000;
      diff /= 60 * 60;
      let timerOfValue = Math.abs(Math.round(diff));
      //console.log(timerOfValue);

      if (timerOfValue < 9) {
        setTotalCalHour(timerOfValue);
      } else if (timerOfValue > 9 && timerOfValue < 24) {
        let newTotal;
        let firstNewDate = date1.toString().slice(0, 15);
        let newFirstValue = `${firstNewDate} 18:30`;
        let firstD = new Date(newFirstValue);

        let firstDiff = (firstD.getTime() - date1.getTime()) / 1000;
        firstDiff /= 60 * 60;
        let actualNewFirstValue = Math.abs(Math.round(firstDiff));

        // another second date calculations

        let secondNewDate = date2.toString().slice(0, 15);
        let newSecondValue = `${secondNewDate} 9:30`;
        let secondD = new Date(newSecondValue);

        let secondDiff = (date2.getTime() - secondD.getTime()) / 1000;

        secondDiff /= 60 * 60;

        let actualNewSecondValue = Math.abs(Math.round(secondDiff));

        newTotal = actualNewFirstValue + actualNewSecondValue;
        setTotalCalHour(newTotal);
        // total = newTotal;
      } else {
        //
        // ignore sunday in hour calculations
        //

        let currentDate = new Date(date1);
        let nonWorkingHours = [0];

        while (currentDate <= date2) {
          if (!nonWorkingHours.includes(currentDate.getDay())) {
            console.log("not sunday");
          } else {
            // currentDate.setDate(currentDate.getDate() + 1)
            console.log("sunday");
            timerOfValue -= 24;
            //sundayCount += 1
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }

        //
        // ignore sundays in hour calculations

        let totalHourTwinty;
        let multipleOfElight;
        let divideByTwintyFour = Math.floor(timerOfValue / 24);

        if (divideByTwintyFour < 1) {
          multipleOfElight = 0;
        } else {
          multipleOfElight = divideByTwintyFour * 9;
        }

        let reminderOfTwintyFour = timerOfValue % 24;
        // let totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
        //console.log(totalHourTwinty);
        //

        if (reminderOfTwintyFour <= 9) {
          totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
          setTotalCalHour(totalHourTwinty);
        } else if (reminderOfTwintyFour > 9 && reminderOfTwintyFour < 24) {
          let previousDate1 = new Date(date2);
          previousDate1.setDate(previousDate1.getDate() - 1);

          if (previousDate1.getDay() == 0) {
            previousDate1.setDate(previousDate1.getDate() - 1);
          }

          let preVTime = previousDate1.toString().slice(0, 15);

          let creatV = date1.toString().slice(15, 24);

          let oldValue = `${preVTime}${creatV}`;

          let oldValueNewDate = new Date(oldValue);

          let oldSecondValue = `${preVTime} 18:30:00`;

          let oldSecondNewDate = new Date(oldSecondValue);

          let secondDiffss =
            (oldValueNewDate.getTime() - oldSecondNewDate.getTime()) / 1000;

          secondDiffss /= 60 * 60;

          let actualNewSecondValuess = Math.abs(Math.round(secondDiffss));

          let morningTime = date2.toString().slice(0, 15);

          let newSecondValue = `${morningTime} 9:30`;
          let secondD = new Date(newSecondValue);

          //let newValueDate = new Date();

          let secondDiff = (date2.getTime() - secondD.getTime()) / 1000;

          secondDiff /= 60 * 60;

          let actualNewSecondValue = Math.abs(Math.round(secondDiff));
          totalHourTwinty =
            multipleOfElight + (actualNewSecondValue + actualNewSecondValuess);
          //console.log(actualNewSecondValue);
          setTotalCalHour(totalHourTwinty);
        } else {
          totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
          setTotalCalHour(totalHourTwinty);
        }
        //
        //
        // setTotalCalHour(totalHourTwinty);
      }

      // old calculations===============================================
      // const diffTime = Math.abs(date2 - date1);
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // console.log("is  emplty else");
      // setTotalCalHour(diffDays * 8);
    }

    //setTotalCalHour(diffDays * 8);
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
    // setSearchTaskBasedOnProject("");
    getTeamOfTeaks(n);
    // setClickUserHighletColor(true);
    // setClickUserHighletColorByName(n);
    // setTotalCalHour("");
    // setCompletedHour("");
    setTimerStoreEmployeeTask([]);
  };

  // ftech the timer based on employee task

  const fetchTheTimersBasedOnTask = (id) => {
    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.get(`/time/taskvalue/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        const arrayOfObject = res.data[0];
        const array = Array(arrayOfObject);
        setTimerStoreEmployeeTask(array);
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

  // admin edit click accual date and accual expert data create modal
  const adminClickEditAccDateSet = (e) => {
    const edit = teamLeaderTask.filter(
      (each) => each._id === e.currentTarget.id
    );
    //console.log(edit);
    setActualCompletedDate(true);
    setActualCompletedDateTaskDetails(edit);
  };

  const teamLeaderClickEditAccDateSet = (e) => {
    const edit = teamAllTask.filter((each) => each._id === e.currentTarget.id);
    //console.log(edit);
    setActualCompletedDate(true);
    setActualCompletedDateTaskDetails(edit);
  };

  // console.log(timerStoreEmployeeTask);

  // console.log(`value ${timerAllValue}`);

  const searchInput = (e) => {
    // console.log(e.target.value);
    setInputSearchValue(e.target.value);
  };

  const valuesFilter = teamLeaderTask.filter((each) =>
    each.status
      .split("-")[0]
      .concat(each.status.split("-")[1])
      .toLocaleLowerCase()
      .includes(inputSearchValue.toLocaleLowerCase())
  );

  const employeeTaskSeacrhBasedOnProjectId = (e) => {
    setSearchTaskBasedOnProject(e.target.value);
  };

  const filterEmployeeTask = teamAllTask?.filter((each) =>
    each.project_id.split("-")[2].includes(searchTaskBasedOnProject)
  );

  // searchTaskBasedOnProject

  //console.log(filterEmployeeTask);

  return (
    <div className="TeamLeadTaska">
      <div className="header" {...getToggleProps()}>
        {isExpanded ? "Close Your Projects" : "Show Your Projects"}
      </div>
      {/* <div> */}
      <div {...getCollapseProps()}>
        <div className="employee-serach-container">
          <div>
            <input
              className="change"
              type="text"
              onChange={searchInput}
              placeholder="search based on status"
            />
            <div>
              <BiSearchAlt className="employee-seacrh-icon" />
            </div>
          </div>
        </div>
        <div className="content">
          <table className="content-table ee">
            <thead>
              <tr>
                <th>ProjectId</th>
                <th>ProjectName</th>
                <th>CreateDate</th>
                <th>Update Date</th>
                <th>Expert Date</th>
                <th>ActualComDate</th>
                <th>ActualExptDate</th>
                <th>Status</th>
                <th>Details & Edit</th>
              </tr>
            </thead>
            <tbody>
              {valuesFilter.map((each, index) => (
                <tr
                  key={index}
                  onClick={() =>
                    getTeamTaskCalHour(
                      each.createdate,
                      each.date,
                      // each.status === "completed" ? each.updatedAt : "",
                      each.project_id,
                      each.actualComDate && each.actualComDate,
                      each.actualExptDate && each.actualExptDate
                    )
                  }
                >
                  <td>{each.project_id}</td>
                  <td>{each.task}</td>
                  <td>{each.createdate}</td>
                  {/* <td>{each.updatedAt.slice(0, 10)}</td> */}
                  <td>{each.updatedDate}</td>
                  <td>{each.date}</td>
                  <td>{each.actualComDate}</td>
                  <td>{each.actualExptDate}</td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* {totalCalHour && (
            <>
              <div>
                <p>Total Hours : {totalCalHour}</p>
                <p>Completed Hours : {timerAllValue}</p>
              </div>
              <div>
                <GrView onClick={timerModalDetails} />
              </div>
            </>
          )} */}

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
          {/* actual create date and accual expert date modal start container */}

          <ActualCreateDateModal
            setActualCompletedDate={setActualCompletedDate}
            actualCompletedDate={actualCompletedDate}
            actualCompletedDateTaskDetails={actualCompletedDateTaskDetails}
          />

          {/* actual create date and actual expert date modal end container */}
        </div>
        <div
          style={{
            height: "250px",
            // border: "1px solid black",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          {totalCalHour && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
                boxShadow: "0 0 20px rbga(0, 0, 0, 0.15)",
              }}
            >
              <TimerChart
                totalCalHour={totalCalHour}
                timerAllValue={timerAllValue}
              />

              <div
                className="total-container"
                style={{
                  display: "flex",
                  gap: "2rem",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <div>
                  <p className="para-total-hour">
                    Total Hours :
                    <span className="total-span"> {totalCalHour} </span>
                  </p>
                  <p className="para-total-hour">
                    Completed Hours :
                    <span className="total-span"> {timerAllValue} </span>
                  </p>
                </div>

                <div style={{ color: "#118a2f" }}>
                  <GrView onClick={timerModalDetails} />
                </div>
              </div>
            </div>
          )}
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
                  key={index}
                >
                  <li
                    //key={index}
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
          {timerStoreEmployeeTask?.length !== 0 && (
            <div className="employee-cont">
              {timerStoreEmployeeTask?.map((each, index) => (
                <div key={index}>
                  <p className="para-total-hour">
                    Total Hours :{" "}
                    <span className="total-span fff">
                      {each.totalHour && each.totalHour}
                    </span>
                  </p>
                  {each.timer?.split("-")[0] === "R" ? (
                    <p className="para-total-hour">
                      Running Hour :{" "}
                      <span className="total-span fff">
                        {each.timer.split("-")[1]}
                      </span>
                    </p>
                  ) : (
                    <p className="para-total-hour">
                      Completed Hours :{" "}
                      <span className="total-span fff">
                        {each.timer && each.timer}
                      </span>{" "}
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

        {/* seacrh constainer start */}
        {teamAllTask.length !== 0 && (
          <div
            className="employee-serach-container"
            style={{ marginTop: "20px" }}
          >
            <div>
              <input
                type="text"
                className="change"
                onChange={employeeTaskSeacrhBasedOnProjectId}
                placeholder="Search based on projectId"
              />
              <div>
                <BiSearchAlt className="employee-seacrh-icon" />
              </div>
            </div>
          </div>
        )}

        {/* seacrh container end */}

        <div className="user-task-container">
          {filterEmployeeTask.length !== 0 && (
            <table className="content-table">
              <thead>
                <tr>
                  <th>ProjectId</th>
                  <th>Task</th>
                  <th>Create</th>
                  <th>Update</th>
                  <th>Expert Date</th>
                  <th>ActualComDate</th>
                  <th>ActualComDate</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filterEmployeeTask.map((each, index) => (
                  <tr
                    key={index}
                    onClick={() => fetchTheTimersBasedOnTask(each._id)}
                  >
                    <td>{each.project_id}</td>
                    <td>{each.task}</td>
                    <td>{each.createdate}</td>
                    {/* <td>{each.updatedAt.slice(0, 10)}</td> */}
                    <td>{each.updatedDate}</td>
                    <td>{each.date}</td>
                    <td>{each.actualComDate}</td>
                    <td>{each.actualExptDate}</td>
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
                      {UUU.role !== "admin" && (
                        <FiEdit
                          id={each._id}
                          onClick={teamLeaderClickEditAccDateSet}
                          // style={{ marginLeft: "50px" }}
                        />
                      )}
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
