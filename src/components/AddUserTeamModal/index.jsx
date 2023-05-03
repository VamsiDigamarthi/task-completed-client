import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import "./index.css";
import { useSelector } from "react-redux";
import axios from "axios";

const AddUserTeamModal = ({
  addUserModal,
  setAddUserModal,
  getTeamOfEmployee,
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [user, setUser] = useState({
    name: "",
    role: "",
    username: "",
    password: "",
    head: UUU.role,
  });

  const usernameChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const theme = useMantineTheme();

  const submitForm = async (e) => {
    e.preventDefault();

    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.post("/auth/register", user)
      .then((res) => {
        console.log(`api data ${res.data}`);
        setAddUserModal(false);
        getTeamOfEmployee();
      })
      .catch((e) => {
        console.log(e);
      });

    setUser({ name: "", username: "", password: "", role: "" });
  };

  // console.log(user);

  return (
    <>
      <Modal
        centered
        opened={addUserModal}
        onClose={() => setAddUserModal(false)}
        title="Register"
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
        <form onSubmit={submitForm} className="signup-form">
          <div className="form-input-container">
            <AiOutlineUser className="form-icons" />
            <input
              placeholder="Name"
              className="form-input"
              type="text"
              onChange={usernameChange}
              name="name"
              value={user.name}
            />
          </div>

          <div className="form-input-container">
            <HiOutlineMail className="form-icons" />
            <input
              placeholder="Email"
              className="form-input"
              type="text"
              onChange={usernameChange}
              name="username"
              value={user.username}
            />
          </div>

          <div className="form-input-container">
            <RiLockPasswordLine className="form-icons" />
            <input
              placeholder="Password"
              className="form-input"
              type="text"
              onChange={usernameChange}
              name="password"
              value={user.password}
            />
          </div>
          <div className="form-input-container">
            <select
              className="employee-type"
              name="role"
              onChange={usernameChange}
            >
              <option disabled selected hidden>
                Please select role of Employee
              </option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <button className="signup-btn" type="submit">
            SignUp
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddUserTeamModal;
