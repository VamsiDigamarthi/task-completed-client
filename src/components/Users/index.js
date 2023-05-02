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

const Users = () => {
  const [modal, setModal] = useState(false);
  const [userDataTask, setUserDataTask] = useState([]);

  const [editModal, setEditModal] = useState(false);

  const [editUserTask, setEditUserTask] = useState([]);

  const [update, setUpdate] = useState([]);

  const [description, setDescription] = useState("");
  const [options, setOptions] = useState({
    labels: ["Completed", "Incompleted"],
    colors: ["#14e610", "#f53858"],
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
    console.log(desc[0].description);
    setDescription(desc[0].description);
    setModal(true);
  };

  const getUserTask = async () => {
    const userName = { name: UUU.name };
    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.post("/tasks/employee", userName)
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
      let a = [0, 100];
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
      <div className="side-bar">
        <SideBar />
      </div>
      <div className="right-u">
        <Header />
        <div className="user-name-container">
          <div>
            <h1
              className="stroke-text"
              style={{ color: "red", fontWeight: "bold" }}
            >
              Hey
            </h1>
            <h1 style={{ color: "#0987e0" }}>{UUU.name}</h1>
          </div>

          <Chart options={options} series={update} type="donut" width="300" />
        </div>
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
            {userDataTask.map((each) => (
              <tr>
                <td>{each.task}</td>
                <td>11/04/2023</td>
                <td>{each.status}</td>
                <td>
                  <BiDetail id={each._id} onClick={detailsAndModel} />
                  <FiEdit
                    id={each._id}
                    onClick={editAndModel}
                    style={{ marginLeft: "50px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <UserModal modal={modal} setModal={setModal} datilsTask={description} />
        {editModal && (
          <UserEditModal
            editModal={editModal}
            setEditModal={setEditModal}
            editUserTask={editUserTask[0]._id}
            getUserTask={getUserTask}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
