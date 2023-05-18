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

  // console.log(editUserTask[0]._id);

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

          <Chart options={options} series={update} type="donut" width="300" />
        </div>
        <table className="content-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Date</th>
              <th>Update Date</th>
              <th>Expert Date</th>
              <th>Status</th>
              <th>Details & Edit</th>
            </tr>
          </thead>
          <tbody>
            {userDataTask.map((each, index) => (
              <tr key={index}>
                <td>{each.task}</td>
                <td>{each.createdAt}</td>
                <td>{each.updatedAt}</td>
                <td>{each.date}</td>
                <td>
                  <div
                    style={{
                      backgroundColor:
                        each.status === "completed"
                          ? "#0a5c0d"
                          : each.status === "incompleted"
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
