import React, { useState } from "react";
import "./index.css";

import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";

const UserEditModal = ({
  editModal,
  setEditModal,
  editUserTask,
  getUserTask,
}) => {
  const [edit, setEdit] = useState({
    updatedDate: "",
    status: "",
  });

  const usernameChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  // const editChangeValue = { status: edit };

  const editSubmitTask = (e) => {
    e.preventDefault();
    const API = axios.create({ baseURL: "http://localhost:5000" });
    API.put(`/tasks/${editUserTask}`, edit)
      .then((res) => {
        //console.log("edit Success");
        getUserTask();
        setEditModal(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const theme = useMantineTheme();

  console.log(edit);

  return (
    <>
      <Modal
        centered
        opened={editModal}
        onClose={() => setEditModal(false)}
        title="Edit task"
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
        <form onSubmit={editSubmitTask}>
          <div className="edit-input-container">
            <select
              name="status"
              className="edit-selected"
              onChange={usernameChange}
            >
              <option disabled selected hidden>
                Please select your status
              </option>
              <option value="completed">Completed</option>
              <option value="In-completed">In-Completed</option>
              <option value="In-progress">In-Progress</option>
            </select>
            {edit.status === "completed" && (
              <div
                className="modal-input-text  date-input"
                style={{
                  margin: "10px 0px",
                  height: "30px",
                  padding: "0px 5px",
                  display: "flex",
                  width: "96%",
                }}
              >
                <label htmlFor="birthday">Create Date : </label>
                <input
                  type="datetime-local"
                  id="birthday"
                  name="updatedDate"
                  onChange={usernameChange}
                  // className="modal-input-text  date-input"
                />
              </div>
            )}
            {edit && (
              <button disabled={edit === ""} className="edit-btn" type="submit">
                Submit
              </button>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UserEditModal;
