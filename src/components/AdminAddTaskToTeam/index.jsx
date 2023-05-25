import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { Modal, useMantineTheme } from "@mantine/core";

const AdminAddTaskToTeam = ({
  adminAddTask,
  setAdminAddTask,
  adminAllTeams,
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [taskAdd, setTaskAddr] = useState({
    head: UUU._id,
    task: "",
    status: "",
    username: "",
    description: "",
    date: "",
    createdate: "",
    project_id: "",
    //head: UUU.role,
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

        setAdminAddTask(false);
        // getTeamOfTeaks();
      })
      .catch((e) => {
        console.log(e);
      });
    setTaskAddr({
      task: "",
      status: "",
      username: "",
      description: "",
      date: "",
      // new addded
      head: UUU.role,
      createdate: "",
      project_id: "",
      //head: UUU._id,
    });
  };

  const theme = useMantineTheme();

  console.log(taskAdd);

  return (
    <>
      <Modal
        centered
        opened={adminAddTask}
        onClose={() => setAdminAddTask(false)}
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
            <input
              className="modal-input-text project-id"
              type="text"
              placeholder="project-id"
              name="project_id"
              onChange={taskAddFun}
            />
            <div className="radios-buttons-container">
              <input
                className="modal-input-text"
                type="text"
                placeholder="project-name"
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
              {/* {adminAllTeams.map((each) => (
                <option>{each.name}</option>
              ))} */}
              {/* add new */}
              {adminAllTeams.map((each) => (
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
              type="date"
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
              type="date"
              id="birthday"
              name="date"
              onChange={taskAddFun}
              // className="modal-input-text  date-input"
            />
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
              taskAdd.description !== "" &&
              taskAdd.date !== "" && (
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

export default AdminAddTaskToTeam;
