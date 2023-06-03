import React, { useState } from "react";
import "./index.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";

import { Modal, useMantineTheme } from "@mantine/core";

const EmployeAddModal = ({
  taskAddModal,
  setTaskAddModal,
  teamUserList,
  getTeamOfTeaks,
  teamLeaderTask,
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [taskAdd, setTaskAddr] = useState({
    task: "",
    status: "",
    username: "",
    description: "",
    date: "",
    head: UUU.role,
    createdate: "",
    project_id: "",
  });

  const taskAddFun = (e) => {
    setTaskAddr({ ...taskAdd, [e.target.name]: e.target.value });
  };

  const addTaskSubmit = (e) => {
    e.preventDefault();

    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.post("/tasks/addtaks", taskAdd)
      .then((res) => {
        //console.log(res.data);

        setTaskAddModal(false);
        getTeamOfTeaks();
      })
      .catch((e) => {
        console.log(e);
      });
    setTaskAddr({
      task: "",
      status: "",
      username: "",
      description: "",
      createdate: "",
      project_id: "",
    });
  };

  const theme = useMantineTheme();

  // console.log(taskAdd);

  // const changeDateFromAddTask = (e) => {
  //   console.log(e.target.value);
  // };

  //console.log(taskAdd);

  return (
    <>
      <Modal
        centered
        opened={taskAddModal}
        onClose={() => setTaskAddModal(false)}
        title="Add Task"
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 2,
        }}
        transitionProps={{
          transition: "fade",
          duration: 300,
          timingFunction: "linear",
        }}
      >
        <form onSubmit={addTaskSubmit}>
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
                  value="In-completed"
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
              {/* {teamUserList.map((each) => (
                <option>{each.name}</option>
              ))} */}
              {/* new added task based on username */}
              {teamUserList.map((each) => (
                <option>{each.username}</option>
              ))}
            </select>
          </div>
          <div
            className="modal-input-text  date-input"
            style={{
              margin: "10px 0px",
              height: "30px",
              padding: "0px 5px",
              display: "flex",
            }}
          >
            <label htmlFor="birthday">Create Date : </label>
            <input
              type="datetime-local"
              id="birthday"
              name="createdate"
              onChange={taskAddFun}
              // className="modal-input-text  date-input"
            />
          </div>
          <div
            className="modal-input-text  date-input"
            style={{ margin: "10px 0px", height: "30px", padding: "0px 5px" }}
          >
            <label htmlFor="birthday">Expert Date : </label>
            <input
              type="datetime-local"
              id="birthday"
              name="date"
              onChange={taskAddFun}
              // className="modal-input-text  date-input"
            />
          </div>
          <div
            className="form-input-container"
            style={{ marginBottom: "10px" }}
          >
            <select
              className="employee-type"
              name="project_id"
              onChange={taskAddFun}
            >
              {teamLeaderTask?.map((each) => (
                <>
                  <option disabled selected hidden>
                    Please select project Id
                  </option>
                  <option value={each.project_id}>{each.project_id}</option>
                </>
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
          <div>
            {taskAdd.task !== "" &&
              taskAdd.status !== "" &&
              taskAdd.username !== "" &&
              taskAdd.description && (
                <button className="edit-btn" type="submit">
                  Submit
                </button>
              )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EmployeAddModal;
