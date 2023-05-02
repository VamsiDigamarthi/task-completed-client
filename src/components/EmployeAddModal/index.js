import React, { useState } from "react";
import "./index.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";

const EmployeAddModal = ({
  taskAddModal,
  setTaskAddModal,
  teamUserList,
  getTeamOfTeaks,
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [taskAdd, setTaskAddr] = useState({
    task: "",
    status: "",
    username: "",
    description: "",
    head: UUU.role,
  });

  const taskAddFun = (e) => {
    setTaskAddr({ ...taskAdd, [e.target.name]: e.target.value });
  };

  const addTaskSubmit = (e) => {
    e.preventDefault();

    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.post("/tasks/addtaks", taskAdd)
      .then((res) => {
        console.log(res.data);

        setTaskAddModal(false);
      })
      .catch((e) => {
        console.log(e);
      });
    setTaskAddr({ task: "", status: "", username: "", description: "" });
    getTeamOfTeaks();
  };
  return (
    <>
      {taskAddModal && (
        <div className="modal">
          <div onClick={() => setTaskAddModal(false)}></div>
          <form className="modal-content" onSubmit={addTaskSubmit}>
            <h2>Hello Modal</h2>
            <div className="all-input-container">
              <div className="radios-buttons-container">
                <input
                  className="modal-input-text"
                  type="text"
                  placeholder="taskname"
                  name="task"
                  onChange={taskAddFun}
                />
                <div className="radios-buttons">
                  <label htmlfor="incomplete">incompleted</label>
                  <input
                    id="incomplete"
                    name="status"
                    onChange={taskAddFun}
                    type="checkbox"
                    value="incompleted"
                  />
                </div>
              </div>
              <select
                name="username"
                className="task-selected"
                onChange={taskAddFun}
              >
                <option disabled selected hidden>
                  Plase select Employee
                </option>
                {teamUserList.map((each) => (
                  <option>{each.name}</option>
                ))}
              </select>
            </div>
            <textarea
              name="description"
              className="text-area"
              rows="6"
              onChange={taskAddFun}
              cols="60"
            ></textarea>
            <div className="task-subit-button-container">
              <button type="submit">Submit</button>
            </div>

            <IoIosCloseCircleOutline
              className="close-modal"
              onClick={() => setTaskAddModal(false)}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default EmployeAddModal;
