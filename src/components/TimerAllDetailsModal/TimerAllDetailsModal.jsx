import React, { useState } from "react";
import "./index.css";

import { Modal, useMantineTheme } from "@mantine/core";

const TimerAllDetailsModal = ({
  timerModal,
  setTimerModal,
  timeValuesCalProject,
}) => {
  const theme = useMantineTheme();

  //console.log(timeValuesCalProject);

  let newArray = [];

  let uniqueObject = {};

  //console.log(uniqueObject);

  // for (let i in timeValuesCalProject) {
  //   const objTitle = timeValuesCalProject[i]["taskValue"];

  //   uniqueObject[objTitle] = timeValuesCalProject[i];
  // }

  timeValuesCalProject?.map((each, i) => {
    // if (each.timer.split("-")[1] === 0) {
    //   console.log("r is zero");
    // }
    //console.log(each.timer);
    if (each.timer?.split("-")[1] === "0") {
      console.log("jjjj");
    } else {
      const objTitle = timeValuesCalProject[i]["taskValue"];

      uniqueObject[objTitle] = timeValuesCalProject[i];
    }
  });

  for (let i in uniqueObject) {
    newArray.push(uniqueObject[i]);
  }

  //console.log(newArray);

  // const jsonObject = timeValuesCalProject?.map(JSON.stringify);

  // const uniqueSet = new Set(jsonObject);

  // const uniqueArray = Array.from(uniqueSet).map(JSON.parse);

  // console.log(uniqueArray);

  return (
    <>
      <Modal
        size="65%"
        centered
        opened={timerModal}
        onClose={() => setTimerModal(false)}
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
        <div>
          <table className="content-table new-added-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>TaskName</th>
                <th>TotalHour</th>
                <th>CompletedHour</th>
                <th>ProjectId</th>
              </tr>
            </thead>
            <tbody>
              {newArray.map((each, index) => (
                <tr key={index}>
                  <td>{each.userName}</td>
                  <td>{each.taskName}</td>
                  <td>{each.totalHour}</td>
                  <td>{each.timer}</td>
                  <td>{each.projectId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default TimerAllDetailsModal;
