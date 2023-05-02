import React, { useState } from "react";
import "./index.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
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
        console.log("edit Success");
        getUserTask();
        setEditModal(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // console.log(editUserTask);

  return (
    <>
      {editModal && (
        <div className="modal">
          <div onClick={() => setEditModal(false)}></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <form onSubmit={editSubmitTask}>
              <div className="edit-input-container">
                <select onChange={usernameChange}>
                  <option disabled selected hidden>
                    Please select your status
                  </option>
                  <option value="completed">completed</option>
                  <option value="incompleted">incompleted</option>
                </select>

                <button type="submit">Submit</button>
              </div>
            </form>
            <IoIosCloseCircleOutline
              className="close-modal"
              onClick={() => setEditModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserEditModal;
