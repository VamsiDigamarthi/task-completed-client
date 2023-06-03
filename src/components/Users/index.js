import React, { useEffect, useState } from "react";
import "./index.css";
import { BiDetail, BiSearchAlt } from "react-icons/bi";
import UserModal from "../UserModal";
import SideBar from "../SideBar";
import Header from "../Header";
import axios from "axios";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { FiEdit } from "react-icons/fi";
import UserEditModal from "../UserEditModal";

import { RiEdit2Line } from "react-icons/ri";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";

// const fff = [
//   {
//     name: "completed",
//   },
//   {
//     name: "incompletd",
//   },
// ];

const Users = () => {
  const [modal, setModal] = useState(false);
  const [userDataTask, setUserDataTask] = useState([]);

  const [editModal, setEditModal] = useState(false);

  const [editUserTask, setEditUserTask] = useState([]);

  const [update, setUpdate] = useState([]);

  const [inputSearchValue, setInputSearchValue] = useState("");

  //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  //hours cal
  const [completedHour, setCompletedHour] = useState("");

  const [totalCalHour, setTotalCalHour] = useState("");

  const [timerHour, setTimerHour] = useState("");

  const [description, setDescription] = useState("");

  const [userTasKTimer, setUserTaskTimer] = useState([]);

  const [editProfileModal, setEditProfileModal] = useState(false);

  // const [editProfileUserDetails, setEditProfileUserDetails] = useState([]);

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
    //console.log(userName);
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

  // const getTeamTaskCalHour = (
  //   c,
  //   e,
  //   ud,
  //   id,
  //   taskid,
  //   task,
  //   username,
  //   actualCom,
  //   actualExp
  // ) => {
  //   setTotalCalHour("");
  //   setCompletedHour("");
  //   setTimerHour("");

  //   let total;

  //   const date1 = new Date(c).getTime();
  //   const date2 = new Date(e).getTime();
  //   const date3 = new Date(ud).getTime();
  //   const actualDate = new Date(actualCom).getTime();
  //   const actualExpt = new Date(actualExp).getTime();
  //   //console.log(date1);
  //   // console.log(actualCom);
  //   // console.log(actualExp);
  //   if (actualDate && actualExpt) {
  //     const diffTime = Math.abs(actualExpt - actualDate);
  //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //     total = diffDays * 8;
  //   } else {
  //     const diffTime = Math.abs(date2 - date1);
  //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //     total = diffDays * 8;
  //   }

  //   if (date3) {
  //     if (actualDate) {
  //       console.log("djkd");
  //       if (date3 >= actualDate) {
  //         console.log("updated date big");
  //         const diffTime1 = Math.abs(date3 - actualDate);
  //         const diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
  //         setCompletedHour(diffDays1 * 8);
  //         const rr = diffDays1 * 8;
  //         const values = {
  //           projectId: id,
  //           taskValue: taskid,
  //           timer: rr,
  //           totalHour: total,
  //           taskName: task,
  //           userName: username,
  //         };

  //         const API = axios.create({ baseURL: "http://localhost:5000" });

  //         API.post("/time/value", values)
  //           .then((res) => {
  //             console.log(res.data);
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //           });
  //       }
  //     } else {
  //       if (date3 >= date1) {
  //         const diffTime1 = Math.abs(date3 - date1);
  //         const diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
  //         setCompletedHour(diffDays1 * 8);
  //         const rr = diffDays1 * 8;
  //         const values = {
  //           projectId: id,
  //           taskValue: taskid,
  //           timer: rr,
  //           totalHour: total,
  //           taskName: task,
  //           userName: username,
  //         };

  //         const API = axios.create({ baseURL: "http://localhost:5000" });

  //         API.post("/time/value", values)
  //           .then((res) => {
  //             console.log(res.data);
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //           });
  //       }
  //     }
  //   } else {
  //     const datess = new Date();

  //     if (actualCom) {
  //       if (datess >= actualCom) {
  //         const diffTime = Math.abs(datess - actualCom);
  //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //         setTimerHour(diffDays * 8);

  //         const rr = `R-${diffDays * 8}`;
  //         const values = {
  //           projectId: id,
  //           taskValue: taskid,
  //           timer: rr,
  //           totalHour: total,
  //           taskName: task,
  //           userName: username,
  //         };

  //         const API = axios.create({ baseURL: "http://localhost:5000" });

  //         API.post("/time/value", values)
  //           .then((res) => {
  //             console.log(res.data);
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //           });
  //       }
  //     } else {
  //       if (datess >= date1) {
  //         const diffTime = Math.abs(datess - date1);
  //         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //         setTimerHour(diffDays * 8);

  //         const rr = `R-${diffDays * 8}`;
  //         const values = {
  //           projectId: id,
  //           taskValue: taskid,
  //           timer: rr,
  //           totalHour: total,
  //           taskName: task,
  //           userName: username,
  //         };

  //         const API = axios.create({ baseURL: "http://localhost:5000" });

  //         API.post("/time/value", values)
  //           .then((res) => {
  //             console.log(res.data);
  //           })
  //           .catch((e) => {
  //             console.log(e);
  //           });
  //       }
  //     }
  //   }

  //   setTotalCalHour(total);
  //   // console.log(id);
  //   // console.log(taskid);
  //   // console.log(task);
  //   // console.log(username);
  // };

  const searchInput = (e) => {
    // console.log(e.target.value);
    setInputSearchValue(e.target.value);
  };

  //console.log(inputSearchValue);

  const valuesFilter = userDataTask.filter((each) =>
    each.status
      .split("-")[0]
      .concat(each.status.split("-")[1])
      .toLocaleLowerCase()
      .includes(inputSearchValue.toLocaleLowerCase())
  );
  //console.log(valuesFilter);

  useEffect(() => {
    const save = userDataTask?.forEach((each) => {
      setTotalCalHour("");
      setCompletedHour("");
      setTimerHour("");
      // console.log(each);
      // console.log(each.createdate);
      // console.log(each.date);
      let total;
      const date1 = new Date(each.createdate);
      const date2 = new Date(each.date);
      const date3 =
        each.status === "completed" ? new Date(each.updatedDate) : "";

      const actualDate = each.actualComDate ? new Date(each.actualComDate) : "";
      const actualExpt = each.actualExptDate
        ? new Date(each.actualExptDate)
        : "";

      // console.log(date1);
      // console.log(date2);
      // console.log(date3);

      if (actualDate !== "" && actualExpt !== "") {
        // const diffTime = Math.abs(actualExpt - actualDate);
        // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // total = diffDays * 8;
        // console.log(`act ${total}`);
        // new added calculations
        //  changes new dates
        let diff = (actualExpt.getTime() - actualDate.getTime()) / 1000;
        diff /= 60 * 60;
        let timerOfValue = Math.abs(Math.round(diff));

        if (timerOfValue < 9) {
          total = timerOfValue;
        } else if (timerOfValue > 9 && timerOfValue < 24) {
          let newTotal;
          let firstNewDate = actualDate.toString().slice(0, 15);
          let newFirstValue = `${firstNewDate} 18:30`;
          let firstD = new Date(newFirstValue);

          let firstDiff = (firstD.getTime() - actualDate.getTime()) / 1000;
          firstDiff /= 60 * 60;
          let actualNewFirstValue = Math.abs(Math.round(firstDiff));

          // another second date calculations

          let secondNewDate = actualExpt.toString().slice(0, 15);
          let newSecondValue = `${secondNewDate} 9:30`;
          let secondD = new Date(newSecondValue);

          let secondDiff = (actualExpt.getTime() - secondD.getTime()) / 1000;

          secondDiff /= 60 * 60;

          let actualNewSecondValue = Math.abs(Math.round(secondDiff));

          newTotal = actualNewFirstValue + actualNewSecondValue;

          total = newTotal;
        } else {
          let divideByTwintyFour = Math.floor(timerOfValue / 24);
          let multipleOfElight = divideByTwintyFour * 9;
          let reminderOfTwintyFour = timerOfValue % 24;
          let totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
          total = totalHourTwinty;
        }
      } else {
        // const diffTime = Math.abs(date2 - date1);
        // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        // total = diffDays * 8;
        // console.log(total);

        // new added calculations

        let diff = (date2.getTime() - date1.getTime()) / 1000;
        diff /= 60 * 60;
        let timerOfValue = Math.abs(Math.round(diff));
        // console.log(`timerOfValue ${timerOfValue}`);
        if (timerOfValue < 9) {
          total = timerOfValue;
        } else if (timerOfValue >= 9 && timerOfValue < 24) {
          //console.log("24 below and 9 above");
          let newTotal;
          let firstNewDate = date1.toString().slice(0, 15);
          // let firstNewDate = (date1 + "").slice(0, 10);
          let newFirstValue = `${firstNewDate} 18:30:00`;
          let firstD = new Date(newFirstValue);

          // console.log(date1);
          // console.log(firstD);

          let firstDiff = (firstD.getTime() - date1.getTime()) / 1000;
          firstDiff /= 60 * 60;
          let actualNewFirstValue = Math.abs(Math.round(firstDiff));

          // console.log(actualNewFirstValue);

          // another second date calculations

          let secondNewDate = date2.toString().slice(0, 15);
          let newSecondValue = `${secondNewDate} 9:30`;
          let secondD = new Date(newSecondValue);

          let secondDiff = (date2.getTime() - secondD.getTime()) / 1000;

          secondDiff /= 60 * 60;

          let actualNewSecondValue = Math.abs(Math.round(secondDiff));

          newTotal = actualNewFirstValue + actualNewSecondValue;

          // console.log(date2);

          // console.log(secondD);

          // console.log(actualNewSecondValue);

          // console.log(newTotal);

          total = newTotal;
        } else {
          let divideByTwintyFour = Math.floor(timerOfValue / 24);
          let multipleOfElight = divideByTwintyFour * 9;
          let reminderOfTwintyFour = timerOfValue % 24;
          let totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
          //console.log(`24 above ${totalHourTwinty}`);
          total = totalHourTwinty;
        }
      }

      // completed and running calculations
      //
      //
      //
      //
      //
      //

      if (date3) {
        if (actualDate) {
          console.log("djkd");
          // let total;
          if (date3 >= actualDate) {
            console.log("updated date big");
            //
            // const diffTime = Math.abs(actualExpt - actualDate);
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // total = diffDays * 8;
            //
            // const diffTime1 = Math.abs(date3 - actualDate);
            // const diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
            // setCompletedHour(diffDays1 * 8);
            // const rr = diffDays1 * 8;

            // added new calculations

            let rr;
            //  changes new dates
            let diff = (date3.getTime() - actualDate.getTime()) / 1000;
            diff /= 60 * 60;
            let timerOfValue = Math.abs(Math.round(diff));

            if (timerOfValue < 9) {
              rr = timerOfValue;
            } else if (timerOfValue >= 9 && timerOfValue < 24) {
              console.log("24 below and 9 above");
              let newTotal;
              let firstNewDate = actualDate.toString().slice(0, 15);

              let newFirstValue = `${firstNewDate} 18:30:00`;
              let firstD = new Date(newFirstValue);

              // console.log(date1);
              // console.log(firstD);

              let firstDiff = (firstD.getTime() - actualDate.getTime()) / 1000;
              firstDiff /= 60 * 60;
              let actualNewFirstValue = Math.abs(Math.round(firstDiff));

              // console.log(actualNewFirstValue);

              // another second date calculations

              let secondNewDate = date3.toString().slice(0, 15);
              let newSecondValue = `${secondNewDate} 9:30`;
              let secondD = new Date(newSecondValue);

              let secondDiff = (date3.getTime() - secondD.getTime()) / 1000;

              secondDiff /= 60 * 60;

              let actualNewSecondValue = Math.abs(Math.round(secondDiff));

              newTotal = actualNewFirstValue + actualNewSecondValue;

              rr = newTotal;
            } else {
              let divideByTwintyFour = Math.floor(timerOfValue / 24);
              let multipleOfElight = divideByTwintyFour * 9;
              let reminderOfTwintyFour = timerOfValue % 24;
              let totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              rr = totalHourTwinty;
            }

            setCompletedHour(rr);
            const values = {
              projectId: each.project_id,
              taskValue: each._id,
              timer: rr,
              totalHour: total,
              taskName: each.task,
              userName: each.username,
            };

            const API = axios.create({ baseURL: "http://localhost:5000" });

            API.post("/time/value", values)
              .then((res) => {
                //console.log(res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        } else {
          if (date3 >= date1) {
            let rr;
            //  changes new dates
            let diff = (date3.getTime() - date1.getTime()) / 1000;
            diff /= 60 * 60;
            let timerOfValue = Math.abs(Math.round(diff));

            if (timerOfValue < 9) {
              rr = timerOfValue;
            } else if (timerOfValue >= 9 && timerOfValue < 24) {
              console.log("24 below and 9 above");
              let newTotal;
              let firstNewDate = date1.toString().slice(0, 15);

              let newFirstValue = `${firstNewDate} 18:30:00`;
              let firstD = new Date(newFirstValue);

              // console.log(date1);
              // console.log(firstD);

              let firstDiff = (firstD.getTime() - date1.getTime()) / 1000;
              firstDiff /= 60 * 60;
              let actualNewFirstValue = Math.abs(Math.round(firstDiff));

              // console.log(actualNewFirstValue);

              // another second date calculations

              let secondNewDate = date3.toString().slice(0, 15);
              let newSecondValue = `${secondNewDate} 9:30`;
              let secondD = new Date(newSecondValue);

              let secondDiff = (date3.getTime() - secondD.getTime()) / 1000;

              secondDiff /= 60 * 60;

              let actualNewSecondValue = Math.abs(Math.round(secondDiff));

              newTotal = actualNewFirstValue + actualNewSecondValue;

              rr = newTotal;
            } else {
              let divideByTwintyFour = Math.floor(timerOfValue / 24);
              let multipleOfElight = divideByTwintyFour * 9;
              let reminderOfTwintyFour = timerOfValue % 24;
              let totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              rr = totalHourTwinty;
            }

            // const diffTime1 = Math.abs(date3 - date1);
            // const diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
            setCompletedHour(rr);
            // const rr = diffDays1 * 8;
            const values = {
              projectId: each.project_id,
              taskValue: each._id,
              timer: rr,
              totalHour: total,
              taskName: each.task,
              userName: each.username,
            };

            const API = axios.create({ baseURL: "http://localhost:5000" });

            API.post("/time/value", values)
              .then((res) => {
                //console.log(res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      } else {
        const datess = new Date();

        // newlly addes dates in IST

        // var currentDate = new Date();

        // var options = {
        //   timeZone: "Asia/Kolkata", // Set the time zone to IST
        //   // weekday: "long", // Get the full name of the day
        //   year: "numeric", // Get the full numeric representation of the year
        //   month: "numeric", // Get the full name of the month
        //   day: "numeric", // Get the day of the month (numeric)
        //   hour: "numeric", // Get the hour (numeric)
        //   minute: "numeric", // Get the minute (numeric)
        //   second: "numeric", // Get the second (numeric)
        // };

        // var ISTDateTime = currentDate.toLocaleString("en-IN", options);

        // var datess = new Date(ISTDateTime);

        // //

        // console.log(ISTDateTime);

        console.log(datess);
        // //
        // console.log(date1);

        // // let diff = (datess.getTime() - date1.getTime()) / 1000;
        // // diff /= 60 * 60;
        // // let timerOfValue = Math.abs(Math.round(diff));

        // // console.log(timerOfValue);
        // if (datess.getTime() >= date1.getTime()) {
        //   console.log("new date is greater than");
        // }

        if (actualDate) {
          if (datess >= actualDate) {
            // const diffTime = Math.abs(datess - actualDate);
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // setTimerHour(diffDays * 8);

            // new added calculationss==============

            let rr;
            //  changes new dates
            let diff = (datess.getTime() - actualDate.getTime()) / 1000;
            diff /= 60 * 60;
            let timerOfValue = Math.abs(Math.round(diff));

            if (timerOfValue < 9) {
              rr = `R-${timerOfValue}`;
            } else if (timerOfValue >= 9 && timerOfValue < 24) {
              console.log("24 below and 9 above");
              let newTotal;
              let firstNewDate = actualDate.toString().slice(0, 15);
              // let firstNewDate = (date1 + "").slice(0, 10);
              let newFirstValue = `${firstNewDate} 18:30:00`;
              let firstD = new Date(newFirstValue);

              // console.log(date1);
              // console.log(firstD);

              let firstDiff = (firstD.getTime() - actualDate.getTime()) / 1000;
              firstDiff /= 60 * 60;
              let actualNewFirstValue = Math.abs(Math.round(firstDiff));

              // console.log(actualNewFirstValue);

              // another second date calculations

              let secondNewDate = datess.toString().slice(0, 15);
              let newSecondValue = `${secondNewDate} 9:30`;
              let secondD = new Date(newSecondValue);

              let secondDiff = (datess.getTime() - secondD.getTime()) / 1000;

              secondDiff /= 60 * 60;

              let actualNewSecondValue = Math.abs(Math.round(secondDiff));

              newTotal = actualNewFirstValue + actualNewSecondValue;

              rr = `R-${newTotal}`;
            } else {
              let divideByTwintyFour = Math.floor(timerOfValue / 24);
              let multipleOfElight = divideByTwintyFour * 9;
              let reminderOfTwintyFour = timerOfValue % 24;
              let totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              rr = `R-${totalHourTwinty}`;
            }

            // const rr = `R-${diffDays * 8}`;
            setCompletedHour(rr);
            const values = {
              projectId: each.project_id,
              taskValue: each._id,
              timer: rr,
              totalHour: total,
              taskName: each.task,
              userName: each.username,
            };

            const API = axios.create({ baseURL: "http://localhost:5000" });

            API.post("/time/value", values)
              .then((res) => {
                //console.log(res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            const values = {
              taskValue: each._id,
              timer: "R-0",
              totalHour: total,
              taskName: each.task,
              userName: each.username,
            };

            const API = axios.create({ baseURL: "http://localhost:5000" });

            API.post("/time/value", values)
              .then((res) => {
                //console.log(res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        } else {
          if (datess >= date1) {
            // const diffTime = Math.abs(datess - date1);
            // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            // setTimerHour(diffDays * 8);

            // new added hours

            console.log(datess);
            console.log(date1);

            let rr;
            //  changes new dates
            let diff = (datess.getTime() - date1.getTime()) / 1000;
            diff /= 60 * 60;
            let timerOfValue = Math.abs(Math.round(diff));

            console.log(timerOfValue);

            if (timerOfValue < 9) {
              rr = `R-${timerOfValue}`;
            } else if (timerOfValue >= 9 && timerOfValue < 24) {
              console.log("24 below and 9 above");
              let newTotal;
              let firstNewDate = date1.toString().slice(0, 15);
              // let firstNewDate = (date1 + "").slice(0, 10);
              let newFirstValue = `${firstNewDate} 18:30:00`;
              let firstD = new Date(newFirstValue);

              console.log(firstNewDate);
              console.log(firstD);

              let firstDiff = (firstD.getTime() - date1.getTime()) / 1000;
              firstDiff /= 60 * 60;
              let actualNewFirstValue = Math.abs(Math.round(firstDiff));

              console.log(actualNewFirstValue);

              // another second date calculations

              let secondNewDate = datess.toString().slice(0, 15);
              let newSecondValue = `${secondNewDate} 9:30`;
              let secondD = new Date(newSecondValue);

              console.log(secondNewDate);
              console.log(secondD);

              let secondDiff = (datess.getTime() - secondD.getTime()) / 1000;

              secondDiff /= 60 * 60;

              let actualNewSecondValue = Math.abs(Math.round(secondDiff));

              console.log(actualNewSecondValue);

              newTotal = actualNewFirstValue + actualNewSecondValue;

              rr = `R-${newTotal}`;
            } else {
              let divideByTwintyFour = Math.floor(timerOfValue / 24);
              let multipleOfElight = divideByTwintyFour * 9;
              let reminderOfTwintyFour = timerOfValue % 24;
              let totalHourTwinty = multipleOfElight + reminderOfTwintyFour;
              rr = `R-${totalHourTwinty}`;
            }

            setCompletedHour(rr);
            // const rr = `R-${diffDays * 8}`;
            const values = {
              projectId: each.project_id,
              taskValue: each._id,
              timer: rr,
              totalHour: total,
              taskName: each.task,
              userName: each.username,
            };

            const API = axios.create({ baseURL: "http://localhost:5000" });

            API.post("/time/value", values)
              .then((res) => {
                //console.log(res.data);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      }

      // jkdjjjj
    });
  }, [userDataTask]);

  const fetchTheTimersBasedOnTask = (id) => {
    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.get(`/time/taskvalue/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        const arrayOfObject = res.data[0];
        const array = Array(arrayOfObject);
        //
        //console.log(array);
        setUserTaskTimer(array);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const profileEditModal = () => {
    setEditProfileModal(true);
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
          {/* {totalCalHour && (
            <div className="employee-timer-container">
              {totalCalHour && (
                <>
                  <p className="para-total-hour">
                    Total Hours : <span>{totalCalHour}</span>{" "}
                  </p>
                  {completedHour ? (
                    <p className="para-total-hour">
                      Completed Hours : <span>{completedHour}</span>{" "}
                    </p>
                  ) : (
                    <>
                      <p className="para-total-hour">
                        Running Hour : <span>{timerHour}</span>
                      </p>
                    </>
                  )}
                </>
              )}
            </div>
          )} */}

          {/* {userTasKTimer && (
            <div>
              {userTasKTimer.map((each) => )}
            </div>
          )} */}

          {userTasKTimer.length !== 0 && (
            <div className="employee-cont">
              {userTasKTimer.map((each) => (
                <div>
                  <p className="para-total-hour">
                    Total Hours :{" "}
                    <span className="total-span fff">{each.totalHour}</span>
                  </p>
                  {each.timer.split("-")[0] === "R" ? (
                    <p className="para-total-hour">
                      Running Hour :{" "}
                      <span className="total-span fff">
                        {each.timer.split("-")[1]}
                      </span>
                    </p>
                  ) : (
                    <p className="para-total-hour">
                      Completed Hours :{" "}
                      <span className="total-span fff">{each.timer}</span>{" "}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* hours cal container end */}
          <Chart options={options} series={update} type="donut" width="300" />
        </div>
        {/* search container start */}
        <div className="search-edit-profile-container">
          <div>
            <RiEdit2Line
              onClick={profileEditModal}
              className="profile-edit-image"
            />
          </div>
          <div className="employee-serach-container">
            <div>
              <input
                type="text"
                placeholder="search based on status"
                onChange={searchInput}
                className="change"
              />
              <div>
                <BiSearchAlt className="employee-seacrh-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* search container end */}
        {valuesFilter.length !== 0 && (
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
              {valuesFilter.map((each, index) => (
                <tr
                  key={index}
                  // onLoad={onLoadPageValue}
                  // onClick={() =>
                  //   getTeamTaskCalHour(
                  //     each.createdate,
                  //     each.date,
                  //     each.status === "completed" ? each.updatedAt : "",
                  //     each.project_id,
                  //     each._id,
                  //     each.task,
                  //     each.username,
                  //     each.actualComDate ? each.actualComDate : "",
                  //     each.actualExptDate ? each.actualExptDate : ""
                  //   )
                  // }
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
                        // disabled={true}
                        style={{ marginLeft: "50px", cursor: "pointer" }}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

        {/* profile Edit Modal start container */}
        <ProfileEditModal
          editProfileModal={editProfileModal}
          setEditProfileModal={setEditProfileModal}
        />

        {/* profile edit modal end Container */}
      </div>
    </div>
  );
};

export default Users;
