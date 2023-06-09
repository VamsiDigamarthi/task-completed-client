import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineUser, AiOutlineAntDesign } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine, RiTeamLine } from "react-icons/ri";
import FileBase64 from "react-file-base64";
import "./index.css";
import { useSelector } from "react-redux";
import axios from "axios";

const SuperAdminAddedAdminModal = ({
  superAdminModal,
  setSuperAdminModal,
  getAllTeamsByAdmin,
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);

  //   console.log(UUU);
  //console.log(UUU._id);

  //const [profilePic, setProfilePic] = useState("");

  const [user, setUser] = useState({
    head: UUU._id,
    name: "",

    //head: UUU.role,

    username: "",
    password: "",
    role: "",
    designation: "",
    profilePic: "",
  });

  // const setHead = () => {
  //   setUser({ ...user, head: UUU._id });
  // };
  // setHead();

  const usernameChange = (e) => {
    // setUser({ ...user, head: UUU.role });
    setUser({ ...user, head: UUU._id });
    setUser({ ...user, [e.target.name]: e.target.value });

    // if(e.target.files && e.target.files[0]){

    // }
  };

  // const profilePicChange = (e) => {
  //   setProfilePic(e.target.files[0]);
  //   //setUser({ ...user, profilePic: e.target.files[0] });
  // };

  const theme = useMantineTheme();

  const submitForm = async (e) => {
    e.preventDefault();

    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.post("/auth/register", user)
      .then((res) => {
        //console.log(`api data ${res.data}`);
        setSuperAdminModal(false);
        // setAddUserModal(false);
        // getTeamOfEmployee();
        // getAllTeamsByAdmin();
        getAllTeamsByAdmin();
      })
      .catch((e) => {
        console.log(e);
      });

    setUser({
      name: "",
      username: "",
      password: "",
      role: "",
      designation: "",
      head: UUU._id,
      profilePic: "",
    });
  };

  //console.log(user);

  return (
    <>
      <Modal
        centered
        opened={superAdminModal}
        onClose={() => setSuperAdminModal(false)}
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
          <div
            className="form-input-container"
            // style={{
            //   border: user.name === "" ? "1px solid red" : "",
            // }}
          >
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
              type="password"
              onChange={usernameChange}
              name="password"
              value={user.password}
            />
          </div>

          <div className="form-input-container">
            <AiOutlineAntDesign className="form-icons" />
            <input
              placeholder="Designation"
              className="form-input"
              type="text"
              onChange={usernameChange}
              name="designation"
              value={user.designation}
            />
          </div>

          {/* <div className="form-input-container">
            <AiOutlineAntDesign className="form-icons" />
            <input
              placeholder="Designation"
              className="form-input"
              type="file"
              onChange={profilePicChange}
              name="profilePic"
              //value={user.profilePic}
            />
          </div> */}
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setUser({ ...user, profilePic: base64 })}
          />
          {/* <div className="form-input-container">
            <RiTeamLine className="form-icons" />
            <input
              placeholder="role"
              className="form-input"
              type="text"
              onChange={usernameChange}
              name="role"
              value={user.role}
            />
          </div> */}
          <div className="form-input-container">
            <select
              className="employee-type"
              name="role"
              onChange={usernameChange}
            >
              <option disabled selected hidden>
                Please select role of Employee
              </option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {user.name !== "" &&
            user.role !== "" &&
            user.username !== "" &&
            user.password && (
              <button className="signup-btn new-add-signup-btn" type="submit">
                Add Admin
              </button>
            )}
        </form>
      </Modal>
    </>
  );
};

export default SuperAdminAddedAdminModal;
