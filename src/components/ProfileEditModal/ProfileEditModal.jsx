import React, { useState } from "react";
import "./index.css";
// import { IoIosCloseCircleOutline } from "react-icons/io";
import { Modal, useMantineTheme } from "@mantine/core";
import FileBase64 from "react-file-base64";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";

const ProfileEditModal = ({ editProfileModal, setEditProfileModal }) => {
  const [userEdit, setUserEdit] = useState({
    profilePic: "",
  });

  //   const usernameChange = (e) => {
  //     setUserEdit({ ...userEdit, [e.target.name]: e.target.value });
  //   };

  const UUU = useSelector((state) => state.authReducer.authData);

  const editSubmitTask = (e) => {
    e.preventDefault();
    const id = UUU?._id;

    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.put(`auth/profile/edit/${id}`, userEdit)
      .then((res) => {
        //console.log("edit Success");
        //getUserTask();
        setEditProfileModal(false);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    setUserEdit({ profilePic: "" });
  };

  const theme = useMantineTheme();

  console.log(userEdit);

  return (
    <>
      <Modal
        centered
        opened={editProfileModal}
        onClose={() => setEditProfileModal(false)}
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
        <form onSubmit={editSubmitTask} className="profile-form">
          {/* <div className="form-input-container">
            <AiOutlineUser className="form-icons" />
            <input
              placeholder="Name"
              className="form-input"
              type="text"
              onChange={usernameChange}
              name="name"
              value={userEdit.name}
            />
          </div> */}
          <FileBase64
            type="file"
            multiple={false}
            className="file-card"
            onDone={({ base64 }) =>
              setUserEdit({ ...userEdit, profilePic: base64 })
            }
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default ProfileEditModal;
