import React, { useEffect, useState } from "react";
import "./index.css";

import axios from "axios";

import { Modal, useMantineTheme } from "@mantine/core";

const ActualCreateDateModal = ({
  setActualCompletedDate,
  actualCompletedDate,
  actualCompletedDateTaskDetails,
}) => {
  const theme = useMantineTheme();

  const [actualDate, setActualDate] = useState({
    actualComDate: "",
    actualExptDate: "",
  });

  const actualChangeDate = (e) => {
    setActualDate({ ...actualDate, [e.target.name]: e.target.value });
  };

  // console.log(actualCompletedDateTaskDetails);

  const id = actualCompletedDateTaskDetails[0]?._id;
  // console.log(id);

  const actualDateAndExpertDateSubmit = (e) => {
    e.preventDefault();

    const API = axios.create({ baseURL: "http://localhost:5000" });

    API.post(`tasks/actual/date/${id}`, actualDate)
      .then((res) => {
        console.log(res.data);
        setActualCompletedDate(false);
      })
      .catch((e) => {
        console.log(e);
      });

    setActualDate({ actualComDate: "", actualExptDate: "" });
  };

  return (
    <>
      <Modal
        centered
        size="50%"
        opened={actualCompletedDate}
        onClose={() => setActualCompletedDate(false)}
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
        <form onSubmit={actualDateAndExpertDateSubmit}>
          {actualCompletedDateTaskDetails.map((each) => (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>ProjectId : {each.project_id}</p>
              <p>TaskName : {each.task}</p>
              <p>Name : {each.username}</p>
            </div>
          ))}
          <div
            className="modal-input-text  date-input"
            style={{
              margin: "10px 0px",
              height: "30px",
              padding: "0px 5px",
              display: "flex",
            }}
          >
            <label htmlFor="birthday">Actual Create Date : </label>
            <input
              type="date"
              id="birthday"
              name="actualComDate"
              onChange={actualChangeDate}
              // className="modal-input-text  date-input"
            />
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
            <label htmlFor="birthday">Actual Expert Date : </label>
            <input
              type="date"
              id="birthday"
              name="actualExptDate"
              onChange={actualChangeDate}
              // className="modal-input-text  date-input"
            />
          </div>
          <button type="submit" className="actual-sub-btn">
            submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ActualCreateDateModal;
