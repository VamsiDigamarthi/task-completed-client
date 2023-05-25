import React, { useState } from "react";
import "./index.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Modal, useMantineTheme } from "@mantine/core";
import axios from "axios";

const UserEditModal = ({
  editModal,
  setEditModal,
  editUserTask,
  getUserTask,
}) => {
  const [edit, setEdit] = useState("");

  const usernameChange = (e) => {
    setEdit(e.target.value);
  };

  const editChangeValue = { status: edit };

  const editSubmitTask = (e) => {
    e.preventDefault();
    const API = axios.create({ baseURL: "http://localhost:5000" });
    API.put(`/tasks/${editUserTask}`, editChangeValue)
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
            <select className="edit-selected" onChange={usernameChange}>
              <option disabled selected hidden>
                Please select your status
              </option>
              <option value="completed">Completed</option>
              <option value="In-completed">In-Completed</option>
              <option value="In-progress">In-Progress</option>
            </select>
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
