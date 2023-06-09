import React, { useState } from "react";
import "./index.css";
import { Modal, useMantineTheme } from "@mantine/core";

import axios from "axios";
import { useSelector } from "react-redux";

function UserModal({ modal, setModal, datilsTask, taskDescId, getUserTask }) {
  //   const [opened, { open, close }] = useDisclosure(false);

  const UUU = useSelector((state) => state.authReducer.authData);

  const theme = useMantineTheme();

  const [editDesc, setEditDesc] = useState(true);

  //console.log(taskDescId);
  // const [v, setV] = useState(datilsTask);

  let v = datilsTask;

  const [descr, setDescr] = useState({
    description: v,
  });

  const taskAddFun = (e) => {
    setDescr({ ...descr, [e.target.name]: e.target.value });
  };

  const editDescSubmitTask = (e) => {
    e.preventDefault();

    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.put(`tasks/description/edit/${taskDescId}`, descr)
      .then((res) => {
        //console.log("edit Success");
        getUserTask();
        setModal(false);
        setEditDesc(true);
        //console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    setDescr({ description: "" });
  };

  //console.log(descr);

  const closeModal = (e) => {
    setModal(false);
    // setV("");
    setDescr({ description: "" });
    // v = "";
  };

  return (
    <>
      <Modal
        centered
        size="60%"
        opened={modal}
        // onClose={() => setModal(false)}
        onClose={closeModal}
        title="Details"
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
        {editDesc ? (
          <p>{datilsTask}</p>
        ) : (
          <textarea
            className="text-area"
            rows="6"
            onChange={taskAddFun}
            cols="60"
            name="description"
            // value={descr.description}
          >
            {datilsTask}
          </textarea>
        )}

        {/* <textarea>{datilsTask}</textarea> */}

        {UUU.role !== "employee" && (
          <div className="desc-edit-btn">
            <button onClick={() => setEditDesc(!editDesc)} className="edit-btn">
              {editDesc ? " Edit" : "Close"}
            </button>
            <button
              // disabled={true}
              disabled={editDesc}
              onClick={editDescSubmitTask}
              className="edit-btn"
            >
              Submit
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}

export default UserModal;
